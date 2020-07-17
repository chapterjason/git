/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

export interface FileInterface {
    /**
     * Returns thre file name
     */
    getFileName(): string;

    /**
     * Returns the relative file path
     */
    getFilePath(): string;
}
