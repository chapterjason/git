/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { Tag } from "../Reference/Tag";
import { TagInterface } from "../Reference/TagInterface";
import { RepositoryInterface } from "../Repository/RepositoryInterface";
import { RemoteBranch } from "./RemoteBranch";
import { RemoteBranchInterface } from "./RemoteBranchInterface";
import { RemoteInterface } from "./RemoteInterface";

export class Remote implements RemoteInterface {

    protected repository: RepositoryInterface;

    protected name: string;

    public constructor(repository: RepositoryInterface, name: string) {
        this.repository = repository;
        this.name = name;
    }

    /**
     * @inheritDoc
     */
    public async getBranch(name: string): Promise<RemoteBranchInterface> {
        const branches = await this.getBranches();

        for (const branch of branches) {
            if (name === branch.getName()) {
                return branch;
            }
        }

        throw new Error(`Branch "${name}" not found on remote "${this.name}".`);
    }

    /**
     * @inheritDoc
     */
    public getName(): string {
        /* istanbul ignore next */
        return this.name;
    }

    /**
     * @inheritDoc
     */
    public async fetch(): Promise<void> {
        await this.repository.mustExecute(["fetch", this.name]);
    }

    /**
     * @inheritDoc
     */
    public async getBranches(): Promise<RemoteBranchInterface[]> {
        const process = await this.repository.mustExecute(["ls-remote", "--heads", this.name]);
        const output = process.getOutput();
        const lines = output.split("\n");
        const references = lines.map(line => {
            const index = line.indexOf("refs/heads/");
            if (-1 === index) {
                return "";
            }

            return line.slice(index).trim();
        }).filter(reference => reference.length);

        return references.map(reference => new RemoteBranch(this.repository, this, reference));
    }

    /**
     * @inheritDoc
     */
    public getRepository(): RepositoryInterface {
        /* istanbul ignore next */
        return this.repository;
    }

    /**
     * @inheritDoc
     */
    public async getTags(): Promise<TagInterface[]> {
        const process = await this.repository.mustExecute(["ls-remote", "--tags", this.name]);
        const output = process.getOutput();
        const lines = output.split("\n");
        const references = lines.map(line => {
            const index = line.indexOf("refs/tags/");
            if (-1 === index) {
                return "";
            }

            return line.slice(index).trim();
        }).filter(reference => reference.length);

        return references.map(reference => new Tag(this.repository, reference));
    }

}
