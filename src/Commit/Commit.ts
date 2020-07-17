/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { Branch } from "../Reference/Branch";
import { BranchInterface } from "../Reference/BranchInterface";
import { Tag } from "../Reference/Tag";
import { TagInterface } from "../Reference/TagInterface";
import { RepositoryInterface } from "../Repository/RepositoryInterface";
import { CommitInterface } from "./CommitInterface";
import { CommitMessage } from "./CommitMessage";

export class Commit implements CommitInterface {

    protected repository: RepositoryInterface;

    protected hash: string;

    public constructor(repository: RepositoryInterface, hash: string) {
        this.repository = repository;
        this.hash = hash;
    }

    /**
     * @inheritDoc
     */
    public async getMessage(): Promise<CommitMessage> {
        const messageExpression = /(?:^Subject:(.*))(?:Body:(.*))/sm;
        const process = await this.repository.mustExecute(["log", "--format=Subject:%sBody:%b", "-n", "1", this.hash]);
        const output = process.getOutput();
        const match = messageExpression.exec(output.trim());

        if (!match) {
            throw new Error("Could not match commit message.");
        }

        const [subject, body] = match.slice(1);

        return { subject, body };
    }

    /**
     * @inheritDoc
     */
    public getHash(): string {
        return this.hash;
    }

    /**
     * @inheritDoc
     */
    public async branch(name: string): Promise<BranchInterface> {
        await this.repository.mustExecute(["branch", name, this.hash]);

        return new Branch(this.repository, `refs/heads/${name}`);
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
    public async tag(name: string): Promise<TagInterface> {
        await this.repository.mustExecute(["tag", name, this.hash]);

        return new Tag(this.repository, `refs/tags/${name}`);
    }

    /**
     * @inheritDoc
     */
    public async checkout(): Promise<void> {
        await this.repository.mustExecute(["checkout", this.hash]);
    }

}
