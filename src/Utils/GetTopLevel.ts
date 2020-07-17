/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { Process } from "@mscs/process";

/**
 * @internal
 *
 * @param {string} directory
 */
export async function getTopLevel(directory: string): Promise<string> {
    const process = new Process(["git", "rev-parse", "--show-toplevel"], { directory });
    await process.mustRun();
    return process.getOutput().trim();
}
