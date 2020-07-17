/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { normalizeMapping } from "./NormalizeMapping";
import { normalizeOption } from "./NormalizeOption";
import { OptionsFlagMapping } from "./OptionsFlagMapping";

/**
 * Generates an array of flags from given options and mapping.
 *
 * @example
 * ```typescript
 * const options = { foo: true, bar: false };
 * const flags = getFlagsFromOptions(options, {
 *     "foo": "--foo",
 *     "bar": "--bar",
 *     "lorem": "--lorem",
 * });
 * console.log(flags);
 * // Output: ["--foo"];
 * ```
 *
 * @example
 * ```typescript
 * const options = { amend: true, edit: false };
 * const flags = getFlagsFromOptions(options, {
 *     "amend": "--amend",
 *     "edit": ["--edit", "--no-edit"],
 *     "sign": ["--gpg-sign", "--no-gpg-sign"]
 * });
 * console.log(flags);
 * // Output: ["--amend", "--no-edit"];
 * ```
 *
 * @example
 * ```typescript
 * const options = { edit: [false, "value"] };
 * const flags = getFlagsFromOptions(options, {
 *     "amend": "--amend",
 *     "edit": ["--edit", "--no-edit"],
 *     "sign": ["--gpg-sign", "--no-gpg-sign"]
 * });
 * console.log(flags);
 * // Output: ["--no-edit", "value"];
 * ```
 *
 * @param {T} options
 * @param {OptionsFlagMapping<T>} mapping
 */
export function getFlagsFromOptions<T extends object, K extends keyof T>(options: T, mapping: OptionsFlagMapping<T>): string[] {
    const optionKeys: K[] = Object.keys(options) as K[];

    const flags = optionKeys
        .map((option: K) => {
            const flags = [];
            const optionValue = normalizeOption(options[option] as any);
            const mappingValue = normalizeMapping(mapping[option] as any);

            const [trueOrFalse, value] = optionValue;
            const [trueFlag, falseFlag] = mappingValue;

            if (trueOrFalse || (null === trueOrFalse && null !== value)) {
                flags.push(trueFlag);

                if (null !== value) {
                    flags.push(value);
                }
            } else if (null !== falseFlag) {
                flags.push(falseFlag);

                if (null !== value) {
                    flags.push(value);
                }
            }

            return flags;
        });

    return flags.reduce((previous, next) => {
        return [...previous, ...next];
    }, []);
}
