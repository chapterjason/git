/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { BaseBranchInterface } from "../Reference/BaseBranchInterface";
import { ReferenceInterface } from "../Reference/ReferenceInterface";
import { RemoteInterface } from "./RemoteInterface";

export interface RemoteBranchInterface extends BaseBranchInterface, ReferenceInterface {

    /**
     * Return the associated remote
     */
    getRemote(): RemoteInterface;

}
