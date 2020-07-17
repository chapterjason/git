/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { UnmergedFileInterface } from "./File/UnmergedFileInterface";
import { BranchInterface } from "./Reference/BranchInterface";

export interface MergeInterface {

    /**
     * Continues the merge process, returns the merge instance on conflicts otherwise the branch the merge started from.
     *
     *  @see https://git-scm.com/docs/git-merge#Documentation/git-merge.txt---continue
     */
    continue(): Promise<BranchInterface | MergeInterface>;

    /**
     * Returns all conflicting files.
     */
    getConflicts(): Promise<UnmergedFileInterface[]>;

    /**
     * Abort the current rebase process.
     *
     * @see https://git-scm.com/docs/git-merge#Documentation/git-merge.txt---abort
     */
    abort(): Promise<BranchInterface>;
}
