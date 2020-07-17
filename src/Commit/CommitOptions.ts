/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

export interface CommitOptions {
    /**
     * @see https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---amend
     */
    amend: boolean;

    /**
     * @see https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---edit
     * @see https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---no-edit
     */
    edit: boolean;

    /**
     * True to use signing, false otherwise, string if you want to use a specific sign key for the commit.
     *
     * @see https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---gpg-signltkeyidgt
     */
    sign: string | false;

}
