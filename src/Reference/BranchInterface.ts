/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { MergeInterface } from "../MergeInterface";
import { RebaseInterface } from "../RebaseInterface";
import { RemoteBranchInterface } from "../Remote/RemoteBranchInterface";
import { RemoteInterface } from "../Remote/RemoteInterface";
import { BaseBranchInterface } from "./BaseBranchInterface";
import { PullOptions } from "./PullOptions";
import { PushOptions } from "./PushOptions";
import { ReferenceInterface } from "./ReferenceInterface";

export interface BranchInterface extends BaseBranchInterface, ReferenceInterface {

    /**
     * Checkout the branch
     */
    checkout(): Promise<void>;

    /**
     * Return true if the branch is the current branch, otherwise false
     */
    isCurrent(): boolean;

    /**
     * Returns the remote if the branch has a remote tracking branch
     */
    getRemote(): Promise<RemoteInterface | null>;

    /**
     * Returns the remote branch if the branch has a remote tracking branch
     */
    getRemoteBranch(): Promise<RemoteBranchInterface | null>;

    /**
     * Pull from default remote
     */
    pull(): Promise<BranchInterface | RebaseInterface>;

    /**
     * Pull from default remote with given pull options
     *
     * @param options
     */
    pull(options: Partial<PullOptions>): Promise<BranchInterface | RebaseInterface>;

    /**
     * Pull from given remote branch with given pull options
     *
     * @param remote
     * @param options
     */
    pull(remote: RemoteBranchInterface, options?: Partial<PullOptions>): Promise<BranchInterface | RebaseInterface>;

    /**
     * Push with the given push options
     *
     * @param options
     */
    push(options?: PushOptions): Promise<BranchInterface>;

    /**
     * Push to given remote
     *
     * @param remote
     */
    push(remote?: RemoteInterface): Promise<BranchInterface>;

    /**
     * Push to given remote with given push options
     *
     * @param remote
     * @param options
     */
    push(remote?: RemoteInterface, options?: PushOptions): Promise<BranchInterface>;

    /**
     * Rename the current branch
     *
     * @param name
     */
    rename(name: string): Promise<BaseBranchInterface>;

    /**
     * Merge another branch into the current
     *
     * @param branch
     */
    merge(branch: BranchInterface): Promise<BaseBranchInterface | MergeInterface>;

    /**
     * Rebase the current branch onto another
     *
     * @param branch
     */
    rebase(branch: BranchInterface): Promise<BaseBranchInterface | RebaseInterface>;
}
