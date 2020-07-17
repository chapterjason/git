/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import * as crypto from "crypto";

export function randomCharacters(amount: number, characters: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz") {
    const value: string[] = [];
    let random: Buffer | null = null;

    // make sure that we do not fail because we ran out of entropy
    try {
        random = crypto.randomBytes(amount);
    } catch (e) {
        random = crypto.pseudoRandomBytes(amount);
    }

    for (let i = 0; i < amount; i++) {
        value.push(characters[random[i] % characters.length]);
    }

    return value.join("");
}
