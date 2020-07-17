/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { FileInterface } from "../File/FileInterface";
import { UnmergedFile } from "../File/UnmergedFile";
import { UnmergedFileInterface } from "../File/UnmergedFileInterface";
import { StatusInterface } from "./StatusInterface";

export class Status implements StatusInterface {

    protected files: FileInterface[];

    public constructor(files: FileInterface[]) {
        this.files = files;
    }

    /**
     * @inheritDoc
     */
    public getFiles(): FileInterface[] {
        return this.files;
    }

    /**
     * @inheritDoc
     */
    public hasUnmergedFiles(): boolean {
        return this.getUnmergedFiles().length > 0;
    }

    /**
     * @inheritDoc
     */
    public getUnmergedFiles(): UnmergedFileInterface[] {
        const unmergedFiles = [];

        for (const file of this.files) {
            if (file instanceof UnmergedFile) {
                unmergedFiles.push(file);
            }
        }

        return unmergedFiles;
    }

}
