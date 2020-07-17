/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { Process } from "@mscs/process";
import { ArgumentException } from "./Exception/ArgumentException";
import { InitOptions } from "./InitOptions";
import { open } from "./Open";
import { RepositoryInterface } from "./Repository/RepositoryInterface";
import { getFlagsFromOptions } from "./Utils/GetFlagsFromOptions";
import { isRepository } from "./Utils/IsRepository";

/**
 * Initializes a new git repository in an existing directory.
 *
 * @see https://git-scm.com/docs/git-init
 */
export async function init(directory: string, options: Partial<InitOptions> = {}): Promise<RepositoryInterface> {
    if (await isRepository(directory)) {
        throw new ArgumentException(`A git repository is already in initialized in directory "${directory}".`);
    }

    const flags = getFlagsFromOptions(options, { "bare": "--bare" });
    const process = new Process(["git", "init", ...flags], { directory });
    await process.mustRun();

    return open(directory);
}
