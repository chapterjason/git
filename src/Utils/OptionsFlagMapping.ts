/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

/**
 * The flag mapping
 */
export type OptionsFlagMapping<T> = {
    [K in keyof T]: string | [string, string];
};