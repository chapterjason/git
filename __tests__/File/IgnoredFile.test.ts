/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { IgnoredFile } from "../../src/File/IgnoredFile";

describe("IgnoredFile", () => {

    describe("getFileName", () => {

        it("should return the file name", () => {
            // Arrange
            const file = new IgnoredFile("./foo/bar.txt");

            // Act
            const actual = file.getFileName();

            // Assert
            expect(actual).toBe("bar.txt");
        });

    });

    describe("getFilePath", () => {

        it("should return the full file path", () => {
            // Arrange
            const file = new IgnoredFile("./foo/bar.txt");

            // Act
            const actual = file.getFilePath();

            // Assert
            expect(actual).toBe("./foo/bar.txt");
        });

    });

});
