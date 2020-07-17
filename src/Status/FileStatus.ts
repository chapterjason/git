/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

export enum FileStatus {
    // . = Unmodified
    Unmodified,
    // M = Modified
    Modified,
    // A = Added
    Added,
    // D = Deleted
    Deleted,
    // R = renamed
    Renamed,
    // C = Copied
    Copied,
    // U = Updated but unmerged
    Updated,
}
