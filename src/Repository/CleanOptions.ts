/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

export interface CleanOptions {
    /**
     * @see https://git-scm.com/docs/git-clean#Documentation/git-clean.txt--d
     */
    recurseInUntrackedDirectories: boolean;

    /**
     * @see https://git-scm.com/docs/git-clean#Documentation/git-clean.txt--f
     */
    force: boolean;

    /**
     * @see https://git-scm.com/docs/git-clean#Documentation/git-clean.txt--x
     */
    noStandardIgnoreRules: boolean;
}
