/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { Process, ProcessOptions } from "@mscs/process";
import * as os from "os";
import { Commit } from "../Commit/Commit";
import { CommitInterface } from "../Commit/CommitInterface";
import { CommitMessage } from "../Commit/CommitMessage";
import { CommitOptions } from "../Commit/CommitOptions";
import { ArgumentException } from "../Exception/ArgumentException";
import { Branch } from "../Reference/Branch";
import { BranchInterface } from "../Reference/BranchInterface";
import { Tag } from "../Reference/Tag";
import { TagInterface } from "../Reference/TagInterface";
import { Remote } from "../Remote/Remote";
import { RemoteBranch } from "../Remote/RemoteBranch";
import { RemoteBranchInterface } from "../Remote/RemoteBranchInterface";
import { RemoteInterface } from "../Remote/RemoteInterface";
import { Status } from "../Status/Status";
import { StatusInterface } from "../Status/StatusInterface";
import { StatusOutputParser } from "../Status/StatusOutputParser";
import { StatusOutputParserInterface } from "../Status/StatusOutputParserInterface";
import { getFlagsFromOptions } from "../Utils/GetFlagsFromOptions";
import { CleanOptions } from "./CleanOptions";
import { RepositoryInterface } from "./RepositoryInterface";

export class Repository implements RepositoryInterface {

    protected directory: string;

    protected statusOutputParser: StatusOutputParserInterface | null = null;

    public constructor(directory: string) {
        this.directory = directory;
    }

    /**
     * @inheritDoc
     */
    public async getBranch(name: string): Promise<BranchInterface> {
        const branches = await this.getBranches();

        for (const branch of branches) {
            if (name === branch.getName()) {
                return branch;
            }
        }

        throw new ArgumentException(`Missing branch "${name}" in repository "${this.directory}".`);
    }

    /**
     * @inheritDoc
     */
    public async hasBranch(name: string): Promise<boolean> {
        const branches = await this.getBranches();

        for (const branch of branches) {
            if (name === branch.getName()) {
                return true;
            }
        }

        return false;
    }

    /**
     * @inheritDoc
     */
    public async getRemote(name: string): Promise<RemoteInterface> {
        const remotes = await this.getRemotes();

        for (const remote of remotes) {
            if (name === remote.getName()) {
                return remote;
            }
        }

        throw new ArgumentException(`Missing remote "${name}" in repository "${this.directory}".`);
    }

    /**
     * @inheritDoc
     */
    public async addRemote(name: string, remote: string): Promise<Remote> {
        await this.mustExecute(["remote", "add", name, remote]);

        return new Remote(this, name);
    }

    /**
     * @inheritDoc
     */
    public async clean(options: Partial<CleanOptions> = {}): Promise<Process> {
        const flags = getFlagsFromOptions(options, {
            "recurseInUntrackedDirectories": "-d",
            "force": "-f",
            "noStandardIgnoreRules": "-x",
        });

        return this.mustExecute(["clean", ...flags]);
    }

    /**
     * @inheritDoc
     */
    public async commit(message: CommitMessage, options: Partial<CommitOptions> = {}): Promise<CommitInterface> {
        const lines = [message.subject];

        if (message.body) {
            lines.push("");
            lines.push(message.body);
        }

        const flags = getFlagsFromOptions(options, {
            "amend": "--amend",
            "edit": ["--edit", "--no-edit"],
            "sign": ["--gpg-sign", "--no-gpg-sign"],
        });

        await this.mustExecute(["commit", ...flags, "--message", lines.join(os.EOL)]);
        const process = await this.mustExecute(["rev-parse", "HEAD"]);
        return new Commit(this, process.getOutput().trim());
    }

    /**
     * @inheritDoc
     */
    public async execute(command: string[], options: Partial<Omit<ProcessOptions, "directory">> = {}): Promise<Process> {
        const process = new Process(["git", ...command], { ...options, directory: this.directory });
        await process.run();

        return process;
    }

    /**
     * @inheritDoc
     */
    public async mustExecute(command: string[], options: Partial<Omit<ProcessOptions, "directory">> = {}): Promise<Process> {
        const process = new Process(["git", ...command], { ...options, directory: this.directory });
        return process.mustRun();
    }

    /**
     * @inheritDoc
     */
    public async fetch(): Promise<void> {
        await this.mustExecute(["fetch", "--all"]);
    }

    /**
     * @inheritDoc
     */
    public getDirectory(): string {
        return this.directory;
    }

    /**
     * @inheritDoc
     */
    public async getBranches(): Promise<BranchInterface[]> {
        const expression = /^(\*| )([^:]+):([^:]+)?:([^:]+)?$/m;
        const process = await this.mustExecute(["branch", "--list", "--format=%(HEAD)%(refname):%(upstream:remoteref):%(upstream)"]);
        const output = process.getOutput();
        const lines = output.split("\n").filter(line => line.length);
        const branches: BranchInterface[] = lines
            .filter(line => -1 === line.indexOf("HEAD detached at"))
            .map(line => {
                const match = expression.exec(line.trimRight());

                if (null === match) {
                    throw new Error(`Could not parse branch data. "${line}"`);
                }

                const [current, reference, remoteReference, upstream] = match.slice(1);
                const remote: RemoteInterface | null = remoteReference && upstream ? new Remote(this, upstream.slice(0, -remoteReference.replace("refs/heads", "").length).replace("refs/remotes/", "")) : null;
                const remoteBranch: RemoteBranchInterface | null = remote ? new RemoteBranch(this, remote, remoteReference) : null;
                return new Branch(this, reference, "*" === current, remote, remoteBranch);
            });

        return branches;
    }

    /**
     * @inheritDoc
     */
    public async getCurrentBranch(): Promise<BranchInterface> {
        const branches = await this.getBranches();
        const currentBranch = branches.find(branch => branch.isCurrent());

        if (!currentBranch) {
            throw new Error("Currently there is no branch checked out.");
        }

        return currentBranch;
    }

    /**
     * @inheritDoc
     */
    public async getRemotes(): Promise<RemoteInterface[]> {
        const process = await this.mustExecute(["remote"]);
        const output = process.getOutput().trim();
        const remoteNames = output.split("\n");

        return remoteNames.map(remoteName => new Remote(this, remoteName));
    }

    /**
     * @inheritDoc
     */
    public async getStatus(): Promise<StatusInterface> {
        const process = await this.mustExecute(["status", "--porcelain=2"]);
        const output = process.getOutput().trim();
        const parser = this.getStatusOutputParser();
        const files = parser.parse(output);

        return new Status(files);
    }

    /**
     * @inheritDoc
     */
    public async getTags(): Promise<TagInterface[]> {
        const process = await this.mustExecute(["tag", "--list", "--format=%(refname)"]);
        const output = process.getOutput().trim();
        const references = output.split("\n");

        return references.map(reference => new Tag(this, reference));
    }

    protected getStatusOutputParser(): StatusOutputParserInterface {
        if (null === this.statusOutputParser) {
            this.statusOutputParser = new StatusOutputParser();
        }

        return this.statusOutputParser;
    }

}
