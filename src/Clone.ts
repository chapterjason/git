/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { Process } from "@mscs/process";
import { existsSync, promises as fs } from "fs";
import { ArgumentException } from "./Exception/ArgumentException";
import { open } from "./Open";
import { RepositoryInterface } from "./Repository/RepositoryInterface";
import { isRepository } from "./Utils/IsRepository";

/**
 * Clone a repository from a url into an directory.
 * The directory will be created if not exist
 *
 * @see https://git-scm.com/docs/git-clone
 */
export async function clone(url: string, directory: string): Promise<RepositoryInterface> {
    if (await isRepository(directory)) {
        throw new ArgumentException(`A git repository is already in initialized in directory "${directory}".`);
    }

    if (!existsSync(directory)) {
        await fs.mkdir(directory, { recursive: true });
    }

    const process = new Process(["git", "clone", url, directory], { directory });
    await process.mustRun();

    return open(directory);
}
