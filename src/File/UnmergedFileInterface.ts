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

export interface UnmergedFileInterface extends FileInterface {

    getIndexStatus(): FileStatus;

    getWorkTreeStatus(): FileStatus;

    getStageOneFileMode(): string;

    getStageTwoFileMode(): string;

    getStageThreeFileMode(): string;

    getWorkTreeFileMode(): string;

    getStageOneObjectName(): string;

    getStageTwoObjectName(): string;

    getStageThreeObjectName(): string;
}
