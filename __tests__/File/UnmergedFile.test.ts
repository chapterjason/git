/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { UnmergedFile } from "../../src/File/UnmergedFile";
import { FileStatus } from "../../src/Status/FileStatus";

describe("UnmergedFile", () => {

    const file = new UnmergedFile(
        FileStatus.Renamed,
        FileStatus.Modified,
        "100744",
        "100766",
        "100777",
        "100742",
        "hashOne",
        "hashTwo",
        "hashThree",
        "./foo/bar.txt",
    );

    describe("getFileName", () => {
        it("should return the file name", () => {
            // Act
            const actual = file.getFileName();

            // Assert
            expect(actual).toBe("bar.txt");
        });
    });

    describe("getFilePath", () => {
        it("should return the file path", () => {
            // Act
            const actual = file.getFilePath();

            // Assert
            expect(actual).toBe("./foo/bar.txt");
        });
    });

    describe("getStageOneFileMode", () => {
        it("should return the file mode for stage one", () => {
            // Act
            const actual = file.getStageOneFileMode();

            // Assert
            expect(actual).toBe("100744");
        });
    });

    describe("getStageTwoFileMode", () => {
        it("should return the file mode for stage two", () => {
            // Act
            const actual = file.getStageTwoFileMode();

            // Assert
            expect(actual).toBe("100766");
        });
    });

    describe("getStageThreeFileMode", () => {
        it("should return the file mode for stage three", () => {
            // Act
            const actual = file.getStageThreeFileMode();

            // Assert
            expect(actual).toBe("100777");
        });
    });

    describe("getWorkTreeFileMode", () => {
        it("should return the file mode for work tree", () => {
            // Act
            const actual = file.getWorkTreeFileMode();

            // Assert
            expect(actual).toBe("100742");
        });
    });

    describe("getStageOneObjectName", () => {
        it("should return the object name of stage one", () => {
            // Act
            const actual = file.getStageOneObjectName();

            // Assert
            expect(actual).toBe("hashOne");
        });
    });

    describe("getStageTwoObjectName", () => {
        it("should return the object name of stage two", () => {
            // Act
            const actual = file.getStageTwoObjectName();

            // Assert
            expect(actual).toBe("hashTwo");
        });
    });

    describe("getStageThreeObjectName", () => {
        it("should return the object name of stage three", () => {
            // Act
            const actual = file.getStageThreeObjectName();

            // Assert
            expect(actual).toBe("hashThree");
        });
    });

    describe("getIndexStatus", () => {
        it("should return the index file status", () => {
            // Act
            const actual = file.getIndexStatus();

            // Assert
            expect(actual).toBe(FileStatus.Renamed);
        });
    });

    describe("getWorkTreeStatus", () => {
        it("should return the work tree file status", () => {
            // Act
            const actual = file.getWorkTreeStatus();

            // Assert
            expect(actual).toBe(FileStatus.Modified);
        });
    });

});
