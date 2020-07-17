/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { CopiedFile } from "../src/File/CopiedFile";
import { IgnoredFile } from "../src/File/IgnoredFile";
import { OrdinaryChangedFile } from "../src/File/OrdinaryChangedFile";
import { RenamedFile } from "../src/File/RenamedFile";
import { UnmergedFile } from "../src/File/UnmergedFile";
import { UntrackedFile } from "../src/File/UntrackedFile";
import { FileStatus } from "../src/Status/FileStatus";
import { StatusOutputParser } from "../src/Status/StatusOutputParser";
import { randomHash } from "./Utils/RandomHash";
import { randomMode } from "./Utils/RandomMode";

describe("StatusOutputParser", () => {

    const parser = new StatusOutputParser();

    describe("parse", () => {
        it("should return empty array if the input is empty", () => {
            // Act
            const actual = parser.parse("");

            // Assert
            expect(actual).toEqual([]);
        });
    });

    describe("parseOrdinaryFile", () => {
        it("should be called and parse an ordinary file status line", () => {
            // Arrange
            const headHash = randomHash();
            const indexHash = randomHash();
            const headFileMode = randomMode();
            const indexFileMode = randomMode();
            const workTreeFileMode = randomMode();

            // Act
            const actual = parser.parse(`1 A. N... ${headFileMode} ${indexFileMode} ${workTreeFileMode} ${headHash} ${indexHash} test foo/bar.txt`);

            // Assert
            expect(actual.length).toBe(1);
            const [file] = actual;
            expect(file).toBeInstanceOf(OrdinaryChangedFile);
            if (file instanceof OrdinaryChangedFile) {
                expect(file.getFileName()).toBe("bar.txt");
                expect(file.getFilePath()).toBe("test foo/bar.txt");
                expect(file.getHeadFileMode()).toBe(headFileMode);
                expect(file.getIndexFileMode()).toBe(indexFileMode);
                expect(file.getWorkTreeFileMode()).toBe(workTreeFileMode);
                expect(file.getHeadObjectName()).toBe(headHash);
                expect(file.getIndexObjectName()).toBe(indexHash);
                expect(file.getIndexStatus()).toBe(FileStatus.Added);
                expect(file.getWorkTreeStatus()).toBe(FileStatus.Unmodified);
            }
        });

        it("should throw error if the line does not match an ordinary file change", () => {
            // Act
            const actor = () => {
                parser.parse("1 A. N... foo bar");
            };

            // Assert
            expect(actor).toThrow();
        });
    });

    describe("parseStatus", () => {

    });

    describe("parseRenamedOrCopiedFile", () => {
        it("should be called and parse an renamed file status line", () => {
            // Arrange
            const headHash = randomHash();
            const indexHash = randomHash();
            const headFileMode = randomMode();
            const indexFileMode = randomMode();
            const workTreeFileMode = randomMode();

            // Act
            const actual = parser.parse(`2 R. N... ${headFileMode} ${indexFileMode} ${workTreeFileMode} ${headHash} ${indexHash} R20 foo bar/foo.md\tfoo bar/bar.md`);

            // Assert
            expect(actual.length).toBe(1);
            const [file] = actual;
            expect(file).toBeInstanceOf(RenamedFile);
            if (file instanceof RenamedFile) {
                expect(file.getFileName()).toBe("foo.md");
                expect(file.getFilePath()).toBe("foo bar/foo.md");
                expect(file.getOriginalFileName()).toBe("bar.md");
                expect(file.getOriginalFilePath()).toBe("foo bar/bar.md");
                expect(file.getScore()).toBe(20);
                expect(file.getHeadFileMode()).toBe(headFileMode);
                expect(file.getIndexFileMode()).toBe(indexFileMode);
                expect(file.getWorkTreeFileMode()).toBe(workTreeFileMode);
                expect(file.getHeadObjectName()).toBe(headHash);
                expect(file.getIndexObjectName()).toBe(indexHash);
                expect(file.getIndexStatus()).toBe(FileStatus.Renamed);
                expect(file.getWorkTreeStatus()).toBe(FileStatus.Unmodified);
            }
        });

        it("should be called and parse an copied file status line", () => {
            // Arrange
            const headHash = randomHash();
            const indexHash = randomHash();
            const headFileMode = randomMode();
            const indexFileMode = randomMode();
            const workTreeFileMode = randomMode();

            // Act
            const actual = parser.parse(`2 C. N... ${headFileMode} ${indexFileMode} ${workTreeFileMode} ${headHash} ${indexHash} C20 foo bar/foo.md\tfoo bar/bar.md`);

            // Assert
            expect(actual.length).toBe(1);
            const [file] = actual;
            expect(file).toBeInstanceOf(CopiedFile);
            if (file instanceof CopiedFile) {
                expect(file.getFileName()).toBe("foo.md");
                expect(file.getFilePath()).toBe("foo bar/foo.md");
                expect(file.getOriginalFileName()).toBe("bar.md");
                expect(file.getOriginalFilePath()).toBe("foo bar/bar.md");
                expect(file.getScore()).toBe(20);
                expect(file.getHeadFileMode()).toBe(headFileMode);
                expect(file.getIndexFileMode()).toBe(indexFileMode);
                expect(file.getWorkTreeFileMode()).toBe(workTreeFileMode);
                expect(file.getHeadObjectName()).toBe(headHash);
                expect(file.getIndexObjectName()).toBe(indexHash);
                expect(file.getIndexStatus()).toBe(FileStatus.Copied);
                expect(file.getWorkTreeStatus()).toBe(FileStatus.Unmodified);
            }
        });

        it("should throw error if the line does not match an copied file", () => {
            // Act
            const actor = () => {
                parser.parse("2 C. N... foo");
            };

            // Assert
            expect(actor).toThrow();
        });

        it("should throw error if the line does not match an renamed file", () => {
            // Act
            const actor = () => {
                parser.parse("2 R. N... foo");
            };

            // Assert
            expect(actor).toThrow();
        });

        it("should throw error if the line does not match an renamed or copied line", () => {
            // Arrange
            const headHash = randomHash();
            const indexHash = randomHash();
            const headFileMode = randomMode();
            const indexFileMode = randomMode();
            const workTreeFileMode = randomMode();

            // Act
            const actor = () => {
                parser.parse(`2 C. N... ${headFileMode} ${indexFileMode} ${workTreeFileMode} ${headHash} ${indexHash} A20 foo bar/foo.md\tfoo bar/bar.md`);
            };

            // Assert
            expect(actor).toThrow();
        });
    });

    describe("parseUnmergedFile", () => {
        it("should be called and parse an unmerge file status line", () => {
            const stageOne = randomHash();
            const stageTwo = randomHash();
            const stageThree = randomHash();
            const stageOneFileMode = randomMode();
            const stageTwoFileMode = randomMode();
            const stageThreeFileMode = randomMode();
            const workTreeFileMode = randomMode();

            // Act
            const actual = parser.parse(`u UU N... ${stageOneFileMode} ${stageTwoFileMode} ${stageThreeFileMode} ${workTreeFileMode} ${stageOne} ${stageTwo} ${stageThree} foo bar/bar.md`);

            // Assert
            expect(actual.length).toBe(1);
            const [file] = actual;
            expect(file).toBeInstanceOf(UnmergedFile);
            if (file instanceof UnmergedFile) {
                expect(file.getFileName()).toBe("bar.md");
                expect(file.getFilePath()).toBe("foo bar/bar.md");
                expect(file.getStageOneFileMode()).toBe(stageOneFileMode);
                expect(file.getStageTwoFileMode()).toBe(stageTwoFileMode);
                expect(file.getStageThreeFileMode()).toBe(stageThreeFileMode);
                expect(file.getWorkTreeFileMode()).toBe(workTreeFileMode);
                expect(file.getStageOneObjectName()).toBe(stageOne);
                expect(file.getStageTwoObjectName()).toBe(stageTwo);
                expect(file.getStageThreeObjectName()).toBe(stageThree);
                expect(file.getIndexStatus()).toBe(FileStatus.Updated);
                expect(file.getWorkTreeStatus()).toBe(FileStatus.Updated);
            }
        });

        it("should throw error if the line does not match an unmerged file", () => {
            // Act
            const actor = () => {
                parser.parse("u UU N... foo");
            };

            // Assert
            expect(actor).toThrow();
        });
    });

    describe("parseUntrackedFile", () => {
        it("should be called and parse an untracked file status line", () => {
            // Act
            const actual = parser.parse("? foo bar/bar.md");

            // Assert
            expect(actual.length).toBe(1);
            const [file] = actual;
            expect(file).toBeInstanceOf(UntrackedFile);
            if (file instanceof UntrackedFile) {
                expect(file.getFileName()).toBe("bar.md");
                expect(file.getFilePath()).toBe("foo bar/bar.md");
            }
        });

        it("should throw error if the line does not match an untracked file", () => {
            // Act
            const actor = () => {
                parser.parse("?");
            };

            // Assert
            expect(actor).toThrow();
        });
    });

    describe("parseIgnoredFile", () => {
        it("should be called and parse an ignored file status line", () => {
            // Act
            const actual = parser.parse("! foo bar/bar.md");

            // Assert
            expect(actual.length).toBe(1);
            const [file] = actual;
            expect(file).toBeInstanceOf(IgnoredFile);
            if (file instanceof IgnoredFile) {
                expect(file.getFileName()).toBe("bar.md");
                expect(file.getFilePath()).toBe("foo bar/bar.md");
            }
        });

        it("should throw error if the line does not match an ignored file", () => {
            // Act
            const actor = () => {
                parser.parse("!");
            };

            // Assert
            expect(actor).toThrow();
        });
    });

});
