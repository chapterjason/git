/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { existsSync } from "fs";
import * as path from "path";

/**
 * @internal
 *
 * @param directory
 */
export async function isBareRepository(directory: string): Promise<boolean> {
    if (!existsSync(directory)) {
        return false;
    }

    return existsSync(path.join(directory, "refs")) &&
        existsSync(path.join(directory, "objects")) &&
        existsSync(path.join(directory, "info")) &&
        existsSync(path.join(directory, "hooks")) &&
        existsSync(path.join(directory, "description")) &&
        existsSync(path.join(directory, "config")) &&
        existsSync(path.join(directory, "HEAD"));
}
