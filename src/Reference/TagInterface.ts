/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { RemoteInterface } from "../Remote/RemoteInterface";
import { ReferenceInterface } from "./ReferenceInterface";

export interface TagInterface extends ReferenceInterface {

    /**
     * Checkout the tag
     */
    checkout(): Promise<void>;

    /**
     * Return the tag name
     */
    getName(): string;

    /**
     * Push to given remote
     *
     * @param remote
     */
    push(remote: RemoteInterface): Promise<TagInterface>;

}
