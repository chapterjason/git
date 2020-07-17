/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

export interface PullOptions {
    /**
     * Pull with rebase
     *
     * @see https://git-scm.com/docs/git-pull#Documentation/git-pull.txt--r
     */
    rebase: boolean;
}
