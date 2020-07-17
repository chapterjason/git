/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import * as path from "path";
import { FileStatus } from "../Status/FileStatus";
import { UnmergedFileInterface } from "./UnmergedFileInterface";

export class UnmergedFile implements UnmergedFileInterface {

    protected indexStatus: FileStatus;

    protected workTreeFileStatus: FileStatus;

    protected stageOneFileMode: string;

    protected stageTwoFileMode: string;

    protected stageThreeFileMode: string;

    protected workTreeFileMode: string;

    protected stageOneObjectName: string;

    protected stageTwoObjectName: string;

    protected stageThreeObjectName: string;

    protected file: string;

    public constructor(indexStatus: FileStatus, workTreeStatus: FileStatus, stageOneFileMode: string, stageTwoFileMode: string, stageThreeFileMode: string, workTreeFileMode: string, stageOneObjectName: string, stageTwoObjectName: string, stageThreeObjectName: string, file: string) {
        this.indexStatus = indexStatus;
        this.workTreeFileStatus = workTreeStatus;
        this.stageOneFileMode = stageOneFileMode;
        this.stageTwoFileMode = stageTwoFileMode;
        this.stageThreeFileMode = stageThreeFileMode;
        this.workTreeFileMode = workTreeFileMode;
        this.stageOneObjectName = stageOneObjectName;
        this.stageTwoObjectName = stageTwoObjectName;
        this.stageThreeObjectName = stageThreeObjectName;
        this.file = file;
    }

    public getFileName(): string {
        return path.basename(this.file);
    }

    public getFilePath(): string {
        return this.file;
    }

    public getStageOneFileMode(): string {
        return this.stageOneFileMode;
    }

    public getStageTwoFileMode(): string {
        return this.stageTwoFileMode;
    }

    public getStageThreeFileMode(): string {
        return this.stageThreeFileMode;
    }

    public getWorkTreeFileMode(): string {
        return this.workTreeFileMode;
    }

    public getStageOneObjectName(): string {
        return this.stageOneObjectName;
    }

    public getStageTwoObjectName(): string {
        return this.stageTwoObjectName;
    }

    public getStageThreeObjectName(): string {
        return this.stageThreeObjectName;
    }

    public getIndexStatus(): FileStatus {
        return this.indexStatus;
    }

    public getWorkTreeStatus(): FileStatus {
        return this.workTreeFileStatus;
    }

}
