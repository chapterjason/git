/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { ArgumentException } from "./Exception/ArgumentException";
import { Repository } from "./Repository/Repository";
import { RepositoryInterface } from "./Repository/RepositoryInterface";
import { getTopLevel } from "./Utils/GetTopLevel";
import { isBareRepository } from "./Utils/IsBareRepository";
import { isRepository } from "./Utils/IsRepository";

/**
 * Opens an existing git repository.
 */
export async function open(directory: string): Promise<RepositoryInterface> {
    if (await isRepository(directory)) {
        const rootDirectory = await getTopLevel(directory);
        return new Repository(rootDirectory);
    }

    if (await isBareRepository(directory)) {
        return new Repository(directory);
    }

    throw new ArgumentException(`The directory "${directory}" is not a git repository.`);
}
