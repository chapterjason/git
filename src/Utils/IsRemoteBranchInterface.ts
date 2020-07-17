/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { TagInterface } from "../Reference/TagInterface";
import { RemoteBranchInterface } from "../Remote/RemoteBranchInterface";

/**
 * @internal
 *
 * @param object
 */
export function isRemoteBranchInterface(object: unknown): object is RemoteBranchInterface {
    return typeof object === "object"
        && typeof (object as RemoteBranchInterface).getRemote === "function"
        && typeof (object as RemoteBranchInterface).getName === "function"
        && typeof (object as TagInterface).push === "undefined";
}
