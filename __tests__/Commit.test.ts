/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import * as os from "os";
import { Commit } from "../src/Commit/Commit";
import { Branch } from "../src/Reference/Branch";
import { Tag } from "../src/Reference/Tag";
import { TesterPool } from "./Utils/TesterPool";

describe("Commit", () => {

    const pool: TesterPool = new TesterPool();

    afterEach(async () => {
        await pool.cleanup();
    });

    describe("getHash", () => {
        it("should return the hash given in constructor", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();
            const commit = new Commit(repository, "foobar");

            // Act
            const actual = commit.getHash();

            // Assert
            expect(actual).toBe("foobar");
        });
    });

    describe("getMessage", () => {

        it("should return the commit message", async () => {
            // Arrange
            const tester = await pool.create();
            const commit = await tester.addCommit({
                subject: "foo",
                body: `bar${os.EOL}lorem`,
            });

            // Act
            const actual = await commit.getMessage();

            // Assert
            expect(actual).toEqual({
                subject: "foo",
                body: "bar\nlorem",
            });
        });

    });

    describe("branch", () => {

        it("should create a branch and returns it", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();
            const commit = await tester.addCommit();

            // Act
            const actual = await commit.branch("foo");

            // Assert
            expect(actual).toBeInstanceOf(Branch);
            const actualCommit = await actual.getCommit();
            expect(actualCommit.getHash()).toBe(commit.getHash());

            const branches = await repository.getBranches();
            expect(branches.map(branch => branch.getReference())).toEqual([
                "refs/heads/foo",
                "refs/heads/master",
            ]);
        });

    });

    describe("tag", () => {

        it("should create a tag and returns it", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();
            const commit = await tester.addCommit();

            // Act
            const actual = await commit.tag("foo");

            // Assert
            expect(actual).toBeInstanceOf(Tag);
            const actualCommit = await actual.getCommit();
            expect(actualCommit.getHash()).toBe(commit.getHash());

            const tags = await repository.getTags();
            expect(tags.map(tag => tag.getReference())).toEqual([
                "refs/tags/foo",
            ]);
        });

    });

});
