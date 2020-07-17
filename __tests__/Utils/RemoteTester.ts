/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import * as Git from "../../src";
import { RepositoryInterface } from "../../src/Repository/RepositoryInterface";
import { TempDirectory } from "./TempDirectory";

export class RemoteTester {

    protected tempDirectory: TempDirectory;

    protected repository: RepositoryInterface;

    public async create() {
        await this.cleanup();

        this.tempDirectory = new TempDirectory();
        const directory = await this.tempDirectory.getDirectory();
        this.repository = await Git.init(directory, { bare: true });
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

    public async getUrl() {
        return this.tempDirectory.getDirectory();
    }

}
