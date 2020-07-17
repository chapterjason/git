/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { AbstractReference } from "../Reference/AbstractReference";
import { RepositoryInterface } from "../Repository/RepositoryInterface";
import { RemoteBranchInterface } from "./RemoteBranchInterface";
import { RemoteInterface } from "./RemoteInterface";

export class RemoteBranch extends AbstractReference implements RemoteBranchInterface {

    protected remote: RemoteInterface;

    public constructor(repository: RepositoryInterface, remote: RemoteInterface, reference: string) {
        super(repository, reference);
        this.remote = remote;
    }

    /**
     * @inheritDoc
     */
    public getRemote(): RemoteInterface {
        /* istanbul ignore next */
        return this.remote;
    }

    /**
     * @inheritDoc
     */
    public getName(): string {
        return this.reference.replace("refs/heads/", "");
    }

    /**
     * @inheritDoc
     */
    public async delete(): Promise<void> {
        await this.repository.mustExecute(["push", this.remote.getName(), "--delete", this.getName()]);
    }

    /**
     * @inheritDoc
     */
    public getReference(): string {
        return this.remote.getName() + "/" + this.getName();
    }

}
