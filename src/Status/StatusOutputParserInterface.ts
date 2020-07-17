/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

// Um die Ausgabe von https://git-scm.com/docs/git-status#_porcelain_format_version_2 zu parsen.
import { FileInterface } from "../File/FileInterface";

export interface StatusOutputParserInterface {

    /**
     * Parses the git status output with porcelain 2 and returns all the different file types
     *
     * @param {string} status
     */
    parse(status: string): FileInterface[];
}
