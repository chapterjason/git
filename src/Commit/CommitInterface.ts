/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { BranchInterface } from "../Reference/BranchInterface";
import { TagInterface } from "../Reference/TagInterface";
import { RepositoryInterface } from "../Repository/RepositoryInterface";
import { CommitMessage } from "./CommitMessage";

export interface CommitInterface {

    /**
     * The commit hash
     */
    getHash(): string;

    /**
     * Create a new tag
     *
     * @param name
     */
    tag(name: string): Promise<TagInterface>;

    /**
     * Create a new branch
     *
     * @param name
     */
    branch(name: string): Promise<BranchInterface>;

    /**
     * Returns the commit message
     */
    getMessage(): Promise<CommitMessage>;

    /**
     * Checkout the commit
     */
    checkout(): Promise<void>;

    /**
     * Return the repository
     */
    getRepository(): RepositoryInterface;
}
