/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { StatusInterface } from "../Status/StatusInterface";
import { GitException } from "./GitException";

export class GitStatusException extends GitException {

    public readonly status: StatusInterface;

    public constructor(status: StatusInterface) {
        super("You have uncommitted local changes, please commit them before continue.");
        this.status = status;
    }

}
