/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { promises as fs } from "fs";
import * as os from "os";
import * as path from "path";
import { randomCharacters } from "./RandomCharacters";
import { TempDirectory } from "./TempDirectory";

export class TempFile {

    protected directory: TempDirectory;

    protected filename: string;

    public constructor(directory: TempDirectory, filename: string) {
        this.directory = directory;
        this.filename = filename;
    }

    public static async create(directory: TempDirectory, filename: string | null = null, content: string | null = null) {
        // eslint-disable-next-line no-magic-numbers
        filename = filename || `foo-${randomCharacters(6)}.txt`;
        // eslint-disable-next-line no-magic-numbers
        content = content || `bar-${randomCharacters(8)}${os.EOL}foo${randomCharacters(4)}`;

        await directory.createFile(filename, content);

        return new TempFile(directory, filename);
    }

    public async setContent(content: string) {
        const base = await this.directory.getDirectory();

        await fs.writeFile(path.join(base, this.filename), content);
    }

    public async getContent(): Promise<string> {
        const base = await this.directory.getDirectory();
        const buffer = await fs.readFile(path.join(base, this.filename));

        return buffer.toString();
    }

}
