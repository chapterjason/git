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
import { OrdinaryChangedFile } from "./OrdinaryChangedFile";
import { RenamedOrCopiedFileInterface } from "./RenamedOrCopiedFileInterface";

export abstract class AbstractRenamedOrCopiedFile extends OrdinaryChangedFile implements RenamedOrCopiedFileInterface {

    protected score: number;

    protected original: string;

    public constructor(indexStatus: FileStatus, workTreeStatus: FileStatus, headFileMode: string, indexFileMode: string, workTreeFileMode: string, headObjectName: string, indexObjectName: string, file: string, score: number, original: string) {
        super(indexStatus, workTreeStatus, headFileMode, indexFileMode, workTreeFileMode, headObjectName, indexObjectName, file);
        this.score = score;
        this.original = original;
    }

    public getScore(): number {
        return this.score;
    }

    public getOriginalFileName(): string {
        return path.basename(this.original);
    }

    public getOriginalFilePath(): string {
        return this.original;
    }

}
