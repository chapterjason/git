/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { randomCharacters } from "./RandomCharacters";

export function randomHash() {
    // eslint-disable-next-line no-magic-numbers
    return randomCharacters(40, "0123456789abcdef");
}
