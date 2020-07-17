/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { FileInterface } from "../File/FileInterface";
import { UnmergedFileInterface } from "../File/UnmergedFileInterface";

export interface StatusInterface {

    /**
     * Returns all files that have changes.
     */
    getFiles(): FileInterface[];

    /**
     * Return all unmerged files.
     */
    getUnmergedFiles(): UnmergedFileInterface[];

    /**
     * Returns true if there are any unmerged files, otherwise true.
     */
    hasUnmergedFiles(): boolean;

}
