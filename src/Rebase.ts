/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { UnmergedFileInterface } from "./File/UnmergedFileInterface";
import { RebaseInterface } from "./RebaseInterface";
import { BranchInterface } from "./Reference/BranchInterface";
import { RepositoryInterface } from "./Repository/RepositoryInterface";

export class Rebase implements RebaseInterface {

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
        await this.repository.mustExecute(["rebase", "--abort"]);

        return this.branch;
    }

    /**
     * @inheritDoc
     */
    public async continue(): Promise<BranchInterface | RebaseInterface> {
        const result = await this.repository.execute(["rebase", "--continue"], { environment: { GIT_EDITOR: ":" } });

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
