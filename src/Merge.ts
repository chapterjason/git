/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { UnmergedFileInterface } from "./File/UnmergedFileInterface";
import { MergeInterface } from "./MergeInterface";
import { BranchInterface } from "./Reference/BranchInterface";
import { RepositoryInterface } from "./Repository/RepositoryInterface";

export class Merge implements MergeInterface {

    protected repository: RepositoryInterface;

    protected branch: BranchInterface;

    public constructor(repository: RepositoryInterface, branch: BranchInterface) {
        this.repository = repository;
        this.branch = branch;
    }

    /**
     * @inheritDoc
     */
    public async abort(): Promise<BranchInterface> {
        await this.repository.mustExecute(["merge", "--abort"]);

        return this.branch;
    }

    /**
     * @inheritDoc
     */
    public async continue(): Promise<BranchInterface | MergeInterface> {
        const result = await this.repository.execute(["merge", "--continue"], { environment: { GIT_EDITOR: ":" } });

        if (0 === result.getExitCode()) {
            return this.branch;
        }

        return this;
    }

    /**
     * @inheritDoc
     */
    public async getConflicts(): Promise<UnmergedFileInterface[]> {
        const status = await this.repository.getStatus();

        return status.getUnmergedFiles();
    }

}
