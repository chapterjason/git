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
 * @param option
 */
export function normalizeOption(option: boolean | string | [boolean, string]): [boolean, null] | [null, string] | [boolean, string] {
    const value = [];

    if (typeof option === "boolean") {
        value.push(option);
        value.push(null);
    } else if (typeof option === "string") {
        value.push(null);
        value.push(option);
    } else if (Array.isArray(option)) {
        value.push(...option);
    }

    return value as [boolean, null] | [null, string] | [boolean, string];
}
