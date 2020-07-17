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
import { TagInterface } from "./TagInterface";

export interface ReferenceInterface {

    /**
     * Return all commits
     */
    getCommits(): Promise<CommitInterface[]>;

    /**
     * Return the latest commit
     */
    getCommit(): Promise<CommitInterface>;

    /**
     * Delete the reference
     */
    delete(): Promise<void>;

    /**
     * Create a new tag at the reference
     *
     * @param name
     */
    tag(name: string): Promise<TagInterface>;

    /**
     * Create a new branch at the reference
     *
     * @param name
     */
    branch(name: string): Promise<BranchInterface>;

    /**
     * Return the full git reference
     */
    getReference(): string;

    /**
     * Return the repository
     */
    getRepository(): RepositoryInterface;
}
