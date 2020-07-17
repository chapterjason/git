/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { randomCharacters } from "./RandomCharacters";

export function randomMode(): string {
    const mode = randomCharacters(1, "12345");
    const permission = randomCharacters(1, "12");

    // https://unix.stackexchange.com/a/450488
    // https://unix.stackexchange.com/a/193468
    // https://github.com/git/git/blob/master/Documentation/technical/index-format.txt#L63

    if ("1" === mode) {
        // regular file, executable or not
        return "100" + ("1" === permission ? "755" : "644");
    } else if ("2" === mode) {
        return "120000"; // symbolic link
    } else if ("3" === mode) {
        return "160000"; // git link
    } else if ("4" === mode) {
        return "000000"; // none
    }

    return "040000"; // directory
}
