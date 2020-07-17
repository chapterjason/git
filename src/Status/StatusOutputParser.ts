/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { CopiedFile } from "../File/CopiedFile";
import { FileInterface } from "../File/FileInterface";
import { IgnoredFile } from "../File/IgnoredFile";
import { OrdinaryChangedFile } from "../File/OrdinaryChangedFile";
import { RenamedFile } from "../File/RenamedFile";
import { UnmergedFile } from "../File/UnmergedFile";
import { UntrackedFile } from "../File/UntrackedFile";
import { FileStatus } from "./FileStatus";
import { StatusExpression } from "./StatusExpression";
import { StatusOutputParserInterface } from "./StatusOutputParserInterface";

export class StatusOutputParser implements StatusOutputParserInterface {

    /**
     * @inheritDoc
     */
    public parse(status: string): FileInterface[] {
        const lines = status.split("\n");
        const files: FileInterface[] = [];

        for (const line of lines) {
            if (line.startsWith("1")) {
                files.push(this.parseOrdinaryFile(line));
            } else if (line.startsWith("2")) {
                files.push(this.parseRenamedOrCopiedFile(line));
            } else if (line.startsWith("u")) {
                files.push(this.parseUnmergedFile(line));
            } else if (line.startsWith("?")) {
                files.push(this.parseUntrackedFile(line));
            } else if (line.startsWith("!")) {
                files.push(this.parseIgnoredFile(line));
            }
        }

        return files;
    }

    protected parseOrdinaryFile(line: string) {
        const match = StatusExpression.ordinary.exec(line);

        if (!match) {
            throw new Error("Could not parse ordinary status line.");
        }

        const [
            indexStatus,
            workTreeStatus,
            ,
            headFileMode,
            indexFileMode,
            workTreeFileMode,
            headObjectName,
            indexObjectName,
            filePath,
        ] = match.slice(1);

        return new OrdinaryChangedFile(
            this.parseStatus(indexStatus),
            this.parseStatus(workTreeStatus),
            headFileMode,
            indexFileMode,
            workTreeFileMode,
            headObjectName,
            indexObjectName,
            filePath,
        );
    }

    protected parseStatus(character: string): FileStatus {
        if ("." === character) {
            return FileStatus.Unmodified;
        } else if ("M" === character) {
            return FileStatus.Modified;
        } else if ("A" === character) {
            return FileStatus.Added;
        } else if ("D" === character) {
            return FileStatus.Deleted;
        } else if ("R" === character) {
            return FileStatus.Renamed;
        } else if ("C" === character) {
            return FileStatus.Copied;
        } else if ("U" === character) {
            return FileStatus.Updated;
        }

        throw new Error(`Invalid status character "${character}".`);
    }

    protected parseRenamedOrCopiedFile(line: string) {
        const match = StatusExpression.renamedOrCopied.exec(line);

        if (!match) {
            throw new Error("Could not parse renamed or copied status line.");
        }

        const [
            indexStatus,
            workTreeStatus,
            ,
            headFileMode,
            indexFileMode,
            workTreeFileMode,
            headObjectName,
            indexObjectName,
            copiedOrRenamed,
            score,
            filePath,
            original,
        ] = match.slice(1);

        if ("R" === copiedOrRenamed) {
            return new RenamedFile(
                this.parseStatus(indexStatus),
                this.parseStatus(workTreeStatus),
                headFileMode,
                indexFileMode,
                workTreeFileMode,
                headObjectName,
                indexObjectName,
                filePath,
                parseInt(score, 10),
                original,
            );
        } else if ("C" === copiedOrRenamed) {
            return new CopiedFile(
                this.parseStatus(indexStatus),
                this.parseStatus(workTreeStatus),
                headFileMode,
                indexFileMode,
                workTreeFileMode,
                headObjectName,
                indexObjectName,
                filePath,
                parseInt(score, 10),
                original,
            );
        }

        throw new Error(`Invalid copy status "${copiedOrRenamed}".`);
    }

    protected parseUnmergedFile(line: string) {
        const match = StatusExpression.unmerged.exec(line);

        if (!match) {
            throw new Error("Could not parse unmerged status line.");
        }

        const [
            indexStatus,
            workTreeStatus,
            ,
            stageOneFileMode,
            stageTwoFileMode,
            stageThreeFileMode,
            workTreeFileMode,
            stageOneObjectName,
            stageTwoObjectName,
            stageThreeObjectName,
            filePath,
        ] = match.slice(1);

        return new UnmergedFile(
            this.parseStatus(indexStatus),
            this.parseStatus(workTreeStatus),
            stageOneFileMode,
            stageTwoFileMode,
            stageThreeFileMode,
            workTreeFileMode,
            stageOneObjectName,
            stageTwoObjectName,
            stageThreeObjectName,
            filePath,
        );
    }

    protected parseUntrackedFile(line: string) {
        const match = StatusExpression.untracked.exec(line);

        if (!match) {
            throw new Error("Could not parse untracked status line.");
        }

        const [filePath] = match.slice(1);

        return new UntrackedFile(filePath);

    }

    protected parseIgnoredFile(line: string) {
        const match = StatusExpression.ignored.exec(line);

        if (!match) {
            throw new Error("Could not parse ignored status line.");
        }

        const [filePath] = match.slice(1);

        return new IgnoredFile(filePath);
    }

}
