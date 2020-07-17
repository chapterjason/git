/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { Process } from "@mscs/process";
import { existsSync } from "fs";
import * as path from "path";

/**
 * @internal
 *
 * @param directory
 */
export async function isRepository(directory: string): Promise<boolean> {
    if (!existsSync(directory)) {
        return false;
    }

    const process = new Process(["git", "rev-parse", "--show-toplevel"], { directory });
    await process.run();

    if (!process.isSuccessful()) {
        return false;
    }

    const topLevelGitDirectory = process.getOutput().trim();

    return path.normalize(topLevelGitDirectory) === path.normalize(directory);
}
