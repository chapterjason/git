/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { FileStatus } from "../Status/FileStatus";
import { FileInterface } from "./FileInterface";

export interface OrdinaryChangedFileInterface extends FileInterface {
    getIndexStatus(): FileStatus;

    getWorkTreeStatus(): FileStatus;

    getHeadFileMode(): string;

    getIndexFileMode(): string;

    getWorkTreeFileMode(): string;

    getHeadObjectName(): string;

    getIndexObjectName(): string;
}
