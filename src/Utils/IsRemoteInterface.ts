/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { RemoteInterface } from "../Remote/RemoteInterface";

/**
 * @internal
 *
 * @param object
 */
export function isRemoteInterface(object: unknown): object is RemoteInterface {
    return typeof object === "object"
        && typeof (object as RemoteInterface).getName === "function"
        && typeof (object as RemoteInterface).getBranch === "function"
        && typeof (object as RemoteInterface).fetch === "function"
        && typeof (object as RemoteInterface).getBranches === "function"
        && typeof (object as RemoteInterface).getRepository === "function"
        && typeof (object as RemoteInterface).getTags === "function";
}
