/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { RemoteInterface } from "../Remote/RemoteInterface";
import { AbstractReference } from "./AbstractReference";
import { TagInterface } from "./TagInterface";

export class Tag extends AbstractReference implements TagInterface {

    /**
     * @inheritDoc
     */
    public async checkout(): Promise<void> {
        await this.repository.mustExecute(["checkout", this.getName()]);
    }

    /**
     * @inheritDoc
     */
    public getName(): string {
        return this.reference.replace("refs/tags/", "");
    }

    /**
     * @inheritDoc
     */
    public async push(remote: RemoteInterface): Promise<TagInterface> {
        await this.repository.mustExecute(["push", remote.getName(), this.getName()]);

        return this;
    }

    /**
     * @inheritDoc
     */
    public async delete(): Promise<void> {
        await this.repository.mustExecute(["tag", "-d", this.getName()]);
    }

}
