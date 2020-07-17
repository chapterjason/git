/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { FileStatus } from "../../src/Status/FileStatus";
import { AbstractRenamedOrCopiedFileMock } from "./Mock/AbstractRenamedOrCopiedFileMock";

describe("OrdinaryChangedFile", () => {

    const file = new AbstractRenamedOrCopiedFileMock(
        FileStatus.Deleted,
        FileStatus.Updated,
        "100766",
        "100777",
        "100742",
        "hashOne",
        "hashTwo",
        "./bar/foo.md",
        44,
        "./bar/bar.md",
    );

    describe("getOriginalFileName", () => {
        it("should return the file name", () => {
            // Act
            const actual = file.getOriginalFileName();

            // Assert
            expect(actual).toBe("bar.md");
        });
    });

    describe("getOriginalFilePath", () => {
        it("should return the file path", () => {
            // Act
            const actual = file.getOriginalFilePath();

            // Assert
            expect(actual).toBe("./bar/bar.md");
        });
    });

    describe("getScore", () => {
        it("should return the score", () => {
            // Act
            const actual = file.getScore();

            // Assert
            expect(actual).toBe(44);
        });
    });

    describe("getFileName", () => {
        it("should return the file name", () => {
            // Act
            const actual = file.getFileName();

            // Assert
            expect(actual).toBe("foo.md");
        });
    });

    describe("getFilePath", () => {
        it("should return the file path", () => {
            // Act
            const actual = file.getFilePath();

            // Assert
            expect(actual).toBe("./bar/foo.md");
        });
    });

    describe("getHeadFileMode", () => {
        it("should return the head file mode", () => {
            // Act
            const actual = file.getHeadFileMode();

            // Assert
            expect(actual).toBe("100766");
        });
    });

    describe("getHeadObjectName", () => {
        it("should return the head object name", () => {
            // Act
            const actual = file.getHeadFileMode();

            // Assert
            expect(actual).toBe("100766");
        });
    });

    describe("getIndexFileMode", () => {
        it("should return the index file mode", () => {
            // Act
            const actual = file.getIndexFileMode();

            // Assert
            expect(actual).toBe("100777");
        });
    });

    describe("getIndexObjectName", () => {
        it("should return the index object name", () => {
            // Act
            const actual = file.getIndexObjectName();

            // Assert
            expect(actual).toBe("hashTwo");
        });
    });

    describe("getIndexStatus", () => {
        it("should return the index status", () => {
            // Act
            const actual = file.getIndexStatus();

            // Assert
            expect(actual).toBe(FileStatus.Deleted);
        });
    });

    describe("getWorkTreeFileMode", () => {
        it("should return the work tree file mode", () => {
            // Act
            const actual = file.getWorkTreeFileMode();

            // Assert
            expect(actual).toBe("100742");
        });
    });

    describe("getWorkTreeStatus", () => {
        it("should return the work tree status", () => {
            // Act
            const actual = file.getWorkTreeStatus();

            // Assert
            expect(actual).toBe(FileStatus.Updated);
        });
    });

});
