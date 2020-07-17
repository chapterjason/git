/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

/**
 * @internal
 *
 * @param mapping
 */
export function normalizeMapping(mapping: string | [string, string]): [string, null] | [string, string] {
    const value = [];

    if (typeof mapping === "string") {
        value.push(mapping);
        value.push(null);
    } else if (Array.isArray(mapping)) {
        value.push(...mapping);
    }

    return value as [string, null] | [string, string];
}
