/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import * as path from "path";
import { IgnoredFileInterface } from "./IgnoredFileInterface";

export class IgnoredFile implements IgnoredFileInterface {

    protected file: string;

    public constructor(file: string) {
        this.file = file;
    }

    public getFileName(): string {
        return path.basename(this.file);
    }

    public getFilePath(): string {
        return this.file;
    }

}
