/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { UntrackedFile } from "../src/File/UntrackedFile";
import { Status } from "../src/Status/Status";

describe("Status", () => {

    describe("getFiles", () => {

        it("should return given files", () => {
            // Arrange
            const status = new Status([new UntrackedFile("./foobar.txt")]);

            // Act
            const actual = status.getFiles();

            // Assert
            expect(actual.map(file => file.getFilePath())).toEqual(["./foobar.txt"]);
        });

    });

});
