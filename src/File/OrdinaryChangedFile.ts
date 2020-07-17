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
import { OrdinaryChangedFileInterface } from "./OrdinaryChangedFileInterface";

export class OrdinaryChangedFile implements OrdinaryChangedFileInterface {

    protected indexStatus: FileStatus;

    protected workTreeStatus: FileStatus;

    protected headFileMode: string;

    protected indexFileMode: string;

    protected workTreeFileMode: string;

    protected headObjectName: string;

    protected indexObjectName: string;

    protected file: string;

    public constructor(indexStatus: FileStatus, workTreeStatus: FileStatus, headFileMode: string, indexFileMode: string, workTreeFileMode: string, headObjectName: string, indexObjectName: string, file: string) {
        this.indexStatus = indexStatus;
        this.workTreeStatus = workTreeStatus;
        this.headFileMode = headFileMode;
        this.indexFileMode = indexFileMode;
        this.workTreeFileMode = workTreeFileMode;
        this.headObjectName = headObjectName;
        this.indexObjectName = indexObjectName;
        this.file = file;
    }

    public getFileName(): string {
        return path.basename(this.file);
    }

    public getFilePath(): string {
        return this.file;
    }

    public getHeadFileMode(): string {
        return this.headFileMode;
    }

    public getHeadObjectName(): string {
        return this.headObjectName;
    }

    public getIndexFileMode(): string {
        return this.indexFileMode;
    }

    public getIndexObjectName(): string {
        return this.indexObjectName;
    }

    public getIndexStatus(): FileStatus {
        return this.indexStatus;
    }

    public getWorkTreeFileMode(): string {
        return this.workTreeFileMode;
    }

    public getWorkTreeStatus(): FileStatus {
        return this.workTreeStatus;
    }

}
