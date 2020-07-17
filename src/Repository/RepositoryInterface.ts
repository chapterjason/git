/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { Process, ProcessOptions } from "@mscs/process";
import { CommitInterface } from "../Commit/CommitInterface";
import { CommitMessage } from "../Commit/CommitMessage";
import { CommitOptions } from "../Commit/CommitOptions";
import { BranchInterface } from "../Reference/BranchInterface";
import { TagInterface } from "../Reference/TagInterface";
import { Remote } from "../Remote/Remote";
import { RemoteInterface } from "../Remote/RemoteInterface";
import { StatusInterface } from "../Status/StatusInterface";
import { CleanOptions } from "./CleanOptions";

export interface RepositoryInterface {

    /**
     * Return all remotes
     */
    getRemotes(): Promise<RemoteInterface[]>;

    /**
     * Return the branch by given name
     *
     * @throws {ArgumentException}
     * @param {string} name
     */
    getBranch(name: string): Promise<BranchInterface>;

    /**
     * Returns true if the given branch exists, false otherwise.
     *
     * @param {string} name
     */
    hasBranch(name: string): Promise<boolean>;

    /**
     * Returns all branches
     */
    getBranches(): Promise<BranchInterface[]>;

    /**
     * Returns the current branch
     */
    getCurrentBranch(): Promise<BranchInterface>;

    /**
     * Returns all tags
     */
    getTags(): Promise<TagInterface[]>;

    /**
     * Return the current status
     */
    getStatus(): Promise<StatusInterface>;

    /**
     * Fetch from all remotes
     */
    fetch(): Promise<void>;

    /**
     * Create a commit
     *
     * @param {CommitMessage} message
     * @param {Partial<CommitOptions>} options
     */
    commit(message: CommitMessage, options?: Partial<CommitOptions>): Promise<CommitInterface>;

    /**
     * Cleanup the current repository
     *
     * @param {Partial<CleanOptions>} options
     */
    clean(options?: Partial<CleanOptions>): Promise<Process>;

    /**
     * Executes a git command that have to be executed successfully.
     * @param command
     * @param options
     */
    mustExecute(command: string[], options?: Partial<Omit<ProcessOptions, "directory">>): Promise<Process>;

    /**
     * Executes a git command and return the process.
     *
     * @param command
     * @param options
     */
    execute(command: string[], options?: Partial<Omit<ProcessOptions, "directory">>): Promise<Process>;

    /**
     * Returns a remote by the given name.
     *
     * @throws {ArgumentException}
     * @param name
     */
    getRemote(name: string): Promise<RemoteInterface>;

    /**
     * Add a new remote
     *
     * @param name
     * @param remote
     */
    addRemote(name: string, remote: string): Promise<Remote>;

    /**
     * Returns the repository directory
     */
    getDirectory(): string;
}
