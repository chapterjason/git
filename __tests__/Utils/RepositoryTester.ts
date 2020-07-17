/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import * as Git from "../../src";
import { CommitMessage } from "../../src/Commit/CommitMessage";
import { RepositoryInterface } from "../../src/Repository/RepositoryInterface";
import { randomCharacters } from "./RandomCharacters";
import { TempDirectory } from "./TempDirectory";
import { TempFile } from "./TempFile";

export class RepositoryTester {

    protected tempDirectory: TempDirectory;

    protected repository: RepositoryInterface;

    public async create() {
        await this.cleanup();

        this.tempDirectory = new TempDirectory();

        const directory = await this.tempDirectory.getDirectory();

        this.repository = await Git.init(directory);
    }

    public async clone(url: string) {
        await this.cleanup();

        const directory = await this.tempDirectory.getDirectory();

        this.repository = await Git.clone(url, directory);
    }

    public async createFile(filename: string | null = null, content: string | null = null) {
        return TempFile.create(this.tempDirectory, filename, content);
    }

    public async addCommit(commit: CommitMessage | null = null) {
        await this.createFile();
        await this.repository.mustExecute(["add", "-A"]);
        return this.repository.commit(commit || {
            // eslint-disable-next-line no-magic-numbers
            subject: `foo ${randomCharacters(6)}`,
            // eslint-disable-next-line no-magic-numbers
            body: `bar ${randomCharacters(6)}`,
        }, { sign: false });
    }

    public getRepository() {
        return this.repository;
    }

    public getDirectory(): TempDirectory {
        return this.tempDirectory;
    }

    public async cleanup() {
        if (this.tempDirectory) {
            await this.tempDirectory.cleanup();
        }
    }

    public async getDirectories(subDirectory: string = ""): Promise<string[]> {
        return this.tempDirectory.getDirectories(subDirectory);
    }

    public async getDirectoriesAndFiles(subDirectory: string = ""): Promise<string[]> {
        return this.tempDirectory.getDirectoriesAndFiles(subDirectory);
    }

    public async getFiles(subDirectory: string = ""): Promise<string[]> {
        return this.tempDirectory.getFiles(subDirectory);
    }

}
