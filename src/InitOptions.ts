/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

export interface InitOptions {
    /**
     * Initializes the repository in bare mode
     *
     * @see https://git-scm.com/docs/git-init#Documentation/git-init.txt---bare
     */
    bare: boolean;
}
