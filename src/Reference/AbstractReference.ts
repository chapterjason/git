/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { CommitInterface } from "../Commit/CommitInterface";
import { RepositoryInterface } from "../Repository/RepositoryInterface";
import { BranchInterface } from "./BranchInterface";
import { ReferenceInterface } from "./ReferenceInterface";
import { TagInterface } from "./TagInterface";

export abstract class AbstractReference implements ReferenceInterface {

    protected repository: RepositoryInterface;

    protected reference: string;

    public constructor(repository: RepositoryInterface, reference: string) {
        this.repository = repository;
        this.reference = reference;
    }

    /**
     * @inheritDoc
     */
    public async branch(name: string): Promise<BranchInterface> {
        await this.repository.mustExecute(["branch", name, this.getReference()]);
        const mod = await import("./Branch");

        return new mod.Branch(this.repository, `refs/heads/${name}`);
    }

    /**
     * @inheritDoc
     */
    public async tag(name: string): Promise<TagInterface> {
        await this.repository.mustExecute(["tag", name, this.getReference()]);
        const mod = await import("./Tag");

        return new mod.Tag(this.repository, `refs/tags/${name}`);
    }

    /**
     * @inheritDoc
     */
    public abstract async delete(): Promise<void>;

    /**
     * @inheritDoc
     */
    public async getCommits(): Promise<CommitInterface[]> {
        const mod = await import("../Commit/Commit");
        const process = await this.repository.mustExecute(["log", "--decorate", "--format=%H", this.getReference()]);
        const output = process.getOutput().trim();
        const hashes = output.split("\n");

        return hashes.map(hash => new mod.Commit(this.repository, hash));
    }

    /**
     * @inheritDoc
     */
    public async getCommit(): Promise<CommitInterface> {
        const mod = await import("../Commit/Commit");
        const process = await this.repository.mustExecute(["rev-parse", this.getReference()]);
        return new mod.Commit(this.repository, process.getOutput().trim());
    }

    /**
     * @inheritDoc
     */
    public getReference(): string {
        /* istanbul ignore next */
        return this.reference;
    }

    /**
     * @inheritDoc
     */
    public getRepository(): RepositoryInterface {
        /* istanbul ignore next */
        return this.repository;
    }

}
