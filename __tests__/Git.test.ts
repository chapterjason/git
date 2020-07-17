/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { clone, init, open } from "../src";
import { Repository } from "../src/Repository/Repository";
import { RemoteTester } from "./Utils/RemoteTester";
import { TempDirectory } from "./Utils/TempDirectory";

describe("Git", () => {

    const tempDirectory: TempDirectory = new TempDirectory();

    beforeEach(async () => {
        await tempDirectory.create();
    });

    afterEach(async () => {
        await tempDirectory.cleanup();
    });

    describe("init", () => {
        it("should initialize git", async () => {
            // Arrange
            const directory = await tempDirectory.getDirectory();

            // Act
            await init(directory);

            // Assert
            expect(await tempDirectory.getDirectories()).toEqual([".git"]);
        });

        it("should initialize git bare", async () => {
            // Arrange
            const directory = await tempDirectory.getDirectory();

            // Act
            await init(directory, { bare: true });

            // Assert
            const directories = await tempDirectory.getDirectories();
            expect(directories).toContain("refs");
            expect(directories).toContain("hooks");
            expect(directories).toContain("info");
            expect(directories).toContain("objects");
        });

        it("should throw if git is already initialized", async () => {
            // Arrange
            const directory = await tempDirectory.getDirectory();
            await init(directory);

            // Act
            const actor = async () => {
                await init(directory);
            };

            // Assert
            await expect(actor()).rejects.toThrow();
        });
    });

    describe("open", () => {
        it("should return a repository instance", async () => {
            // Arrange
            const directory = await tempDirectory.getDirectory();
            await init(directory);

            // Act
            const actual = await open(directory);

            // Assert
            expect(actual).toBeInstanceOf(Repository);
        });

        it("should throw if git is not initialized in directory", async () => {
            // Arrange
            const directory = await tempDirectory.getDirectory();

            // Act
            const actor = async () => {
                await open(directory);
            };

            // Assert
            await expect(actor()).rejects.toThrow();
        });
    });

    describe("clone", () => {

        const remote: RemoteTester = new RemoteTester();

        beforeEach(async () => {
            await remote.create();
        });

        afterEach(async () => {
            await remote.cleanup();
        });

        it("should clone a remote repository", async () => {
            // Arrange
            const url = await remote.getUrl();
            const directory = await tempDirectory.getDirectory();

            // Act
            await clone(url, directory);

            // Assert
            expect(await tempDirectory.getDirectories()).toEqual([".git"]);
        });

        it("should throw if git is already initialized", async () => {
            // Arrange
            const url = await remote.getUrl();
            const directory = await tempDirectory.getDirectory();

            await clone(url, directory);

            // Act
            const actor = async () => {
                await clone(url, directory);
            };

            // Assert
            await expect(actor()).rejects.toThrow();
        });

    });

});
