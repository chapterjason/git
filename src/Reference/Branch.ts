/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { GitStatusException } from "../Exception/GitStatusException";
import { Merge } from "../Merge";
import { MergeInterface } from "../MergeInterface";
import { Rebase } from "../Rebase";
import { RebaseInterface } from "../RebaseInterface";
import { RemoteBranchInterface } from "../Remote/RemoteBranchInterface";
import { RemoteInterface } from "../Remote/RemoteInterface";
import { RepositoryInterface } from "../Repository/RepositoryInterface";
import { getFlagsFromOptions } from "../Utils/GetFlagsFromOptions";
import { isRemoteBranchInterface } from "../Utils/IsRemoteBranchInterface";
import { isRemoteInterface } from "../Utils/IsRemoteInterface";
import { AbstractReference } from "./AbstractReference";
import { BranchInterface } from "./BranchInterface";
import { PullOptions } from "./PullOptions";
import { PushOptions } from "./PushOptions";

export class Branch extends AbstractReference implements BranchInterface {

    protected remoteReference: RemoteBranchInterface | null;

    protected remote: RemoteInterface | null;

    protected current: boolean;

    public constructor(repository: RepositoryInterface, reference: string, current: boolean = false, remote: RemoteInterface | null = null, remoteReference: RemoteBranchInterface | null = null) {
        super(repository, reference);
        this.current = current;
        this.remote = remote;
        this.remoteReference = remoteReference;
    }

    /**
     * @inheritDoc
     */
    public async push(options?: PushOptions): Promise<BranchInterface>;

    /**
     * @inheritDoc
     */
    public async push(remote?: RemoteInterface): Promise<BranchInterface>;

    /**
     * @inheritDoc
     */
    public async push(remote?: RemoteInterface | PushOptions, options?: PushOptions): Promise<BranchInterface> {
        const remoteToUse = (isRemoteInterface(remote) && remote) || this.remote;

        if (!remoteToUse) {
            throw new Error("Branch has no tracking branch. Please set explicit remote target.");
        }

        const opts: PushOptions = { force: false, ...(!isRemoteInterface(remote) && typeof remote === "object" ? remote : options) };
        const flags = getFlagsFromOptions(opts, { force: "--force" });

        await this.repository.mustExecute(["push", ...flags, ...(this.remote ? [] : ["--set-upstream"]), remoteToUse.getName(), this.reference]);

        return this;
    }

    /**
     * @inheritDoc
     */
    public isCurrent(): boolean {
        return this.current;
    }

    /**
     * @inheritDoc
     */
    public async getRemote(): Promise<RemoteInterface | null> {
        return this.remote;
    }

    /**
     * @inheritDoc
     */
    public async getRemoteBranch(): Promise<RemoteBranchInterface | null> {
        return this.remoteReference;
    }

    /**
     * @inheritDoc
     */
    public async checkout(): Promise<void> {
        await this.repository.mustExecute(["checkout", this.getName()]);
    }

    /**
     * @inheritDoc
     */
    public getName(): string {
        return this.reference.replace("refs/heads/", "");
    }

    /**
     * @inheritDoc
     */
    public async merge(branch: BranchInterface): Promise<BranchInterface | MergeInterface> {
        await this.checkout();
        const result = await this.repository.execute(["merge", "--no-edit", branch.getReference()], { environment: { GIT_EDITOR: ":" } });

        if (0 !== result.getExitCode()) {
            return new Merge(this.repository, this);
        }

        return this;
    }

    /**
     * @inheritDoc
     */
    public async pull(): Promise<BranchInterface | RebaseInterface>;

    /**
     * @inheritDoc
     */
    public async pull(options: Partial<PullOptions>): Promise<BranchInterface | RebaseInterface>;

    /**
     * @inheritDoc
     */
    public async pull(remote: RemoteBranchInterface, options?: Partial<PullOptions>): Promise<BranchInterface | RebaseInterface>;

    /**
     * @inheritDoc
     */
    public async pull(first?: Partial<PullOptions> | RemoteBranchInterface, second?: Partial<PullOptions>): Promise<BranchInterface | RebaseInterface> {
        const status = await this.repository.getStatus();
        const files = status.getFiles();

        if (files.length > 0) {
            throw new GitStatusException(status);
        }

        const remoteBranch: RemoteBranchInterface | null = isRemoteBranchInterface(first) ? first : this.remoteReference;

        if (!remoteBranch) {
            throw new Error("Branch has no tracking branch. Please set explicit remote source.");
        }

        let options: Partial<PullOptions> = {};
        if (isRemoteBranchInterface(first) && typeof second !== "undefined") {
            options = { ...options, ...second };
        } else if (typeof first !== "undefined") {
            options = { ...options, ...first };
        }

        const flags = getFlagsFromOptions(options, {
            "rebase": "--rebase",
        });

        const branchBefore = await this.repository.getCurrentBranch();

        await this.checkout();

        await this.repository.mustExecute(["pull", ...flags, remoteBranch.getRemote().getName(), remoteBranch.getName()]);

        await branchBefore.checkout();

        return this;
    }

    /**
     * @inheritDoc
     */
    public async rebase(branch: BranchInterface): Promise<BranchInterface | RebaseInterface> {
        await this.checkout();
        const result = await this.repository.execute(["rebase", branch.getReference()], { environment: { GIT_EDITOR: ":" } });

        if (0 !== result.getExitCode()) {
            return new Rebase(this.repository, this);
        }

        return this;
    }

    /**
     * @inheritDoc
     */
    public async rename(name: string): Promise<BranchInterface> {
        await this.repository.mustExecute(["branch", "-m", this.getName(), name]);
        this.reference = "refs/heads/" + name;

        return this;
    }

    /**
     * @inheritDoc
     */
    public async delete(): Promise<void> {
        await this.repository.mustExecute(["branch", "-d", this.getName()]);
    }

}
