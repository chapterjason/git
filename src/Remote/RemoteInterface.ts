/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { TagInterface } from "../Reference/TagInterface";
import { RepositoryInterface } from "../Repository/RepositoryInterface";
import { RemoteBranchInterface } from "./RemoteBranchInterface";

export interface RemoteInterface {

    /**
     * Returns the remote name
     */
    getName(): string;

    /**
     * Return the given remote branch
     *
     * @param name
     */
    getBranch(name: string): Promise<RemoteBranchInterface>;

    /**
     * Returns all remote branches
     */
    getBranches(): Promise<RemoteBranchInterface[]>;

    /**
     * Returns all remote tags
     */
    getTags(): Promise<TagInterface[]>;

    /**
     * Fetch from remote
     */
    fetch(): Promise<void>;

    /**
     * Return the repository
     */
    getRepository(): RepositoryInterface;
}
