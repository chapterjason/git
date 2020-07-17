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

export interface RebaseInterface {

    /**
     * Continues the rebase process, returns the rebase instance on conflicts otherwise the branch the rebase started from.
     *
     *  @see https://git-scm.com/docs/git-rebase#Documentation/git-rebase.txt---continue
     */
    continue(): Promise<BranchInterface | RebaseInterface>;

    /**
     * Returns all conflicting files.
     */
    getConflicts(): Promise<UnmergedFileInterface[]>;

    /**
     * Abort the current rebase process.
     *
     * @see https://git-scm.com/docs/git-rebase#Documentation/git-rebase.txt---abort
     */
    abort(): Promise<BranchInterface>;
}
