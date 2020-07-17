/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { promises as fs } from "fs";
import * as path from "path";
import { randomCharacters } from "./RandomCharacters";

export class TempDirectory {

    private prefix: string;

    private postfix: string;

    private directory: string | null = null;

    public constructor(prefix: string = "tmp", postfix: string = "") {
        this.prefix = prefix;
        this.postfix = postfix;
    }

    public async getDirectory(): Promise<string> {
        if (null === this.directory) {
            await this.create();
        }

        if (null === this.directory) {
            throw new Error("Failed to create temp directory.");
        }

        return this.directory;
    }

    public async createFile(file: string, content: string = "") {
        const baseDirectory = await this.getDirectory();
        const directory = path.join(baseDirectory, path.dirname(file));

        await fs.mkdir(directory, { recursive: true });
        await fs.writeFile(path.join(baseDirectory, file), content);
    }

    public async getDirectories(subDirectory: string = ""): Promise<string[]> {
        const directory = await this.getDirectory();
        const items = await this.getItems(subDirectory);
        const files: string[] = [];

        for await (const item of items) {
            const stat = await fs.stat(item);

            if (stat.isDirectory()) {
                files.push(path.relative(directory, item));
            }
        }

        return files;
    }

    public async getFiles(subDirectory: string = ""): Promise<string[]> {
        const directory = await this.getDirectory();
        const items = await this.getItems(subDirectory);
        const files: string[] = [];

        for await (const item of items) {
            const stat = await fs.stat(item);

            if (stat.isFile()) {
                files.push(path.relative(directory, item));
            }
        }

        return files;
    }

    public async create() {
        if (null !== this.directory) {
            await this.cleanup();
        }

        const base = path.join(__dirname, "../Temp");

        const name = [
            this.prefix,
            "-",
            process.pid,
            "-",
            // eslint-disable-next-line no-magic-numbers
            randomCharacters(12),
            this.postfix.length > 0 ? "-" + this.postfix : "",
        ].join("");

        this.directory = path.join(base, name);

        await fs.mkdir(this.directory, { recursive: true });
    }

    public async cleanup() {
        if (null === this.directory) {
            return;
        }

        await fs.rmdir(this.directory, { recursive: true });

        this.directory = null;
    }

    public async getDirectoriesAndFiles(subDirectory: string = ""): Promise<string[]> {
        const directory = await this.getDirectory();
        const items = await this.getItems(subDirectory);

        return items.map(item => path.relative(directory, item));
    }

    private async getItems(subDirectory: string = ""): Promise<string[]> {
        const directory = await this.getDirectory();
        const items = await fs.readdir(path.join(directory, subDirectory));

        return items.map(item => path.join(directory, subDirectory, item));
    }

}
