/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { RemoteTester } from "./Utils/RemoteTester";
import { RepositoryTester } from "./Utils/RepositoryTester";
import { TesterPool } from "./Utils/TesterPool";

describe("Branch", () => {

    const pool: TesterPool = new TesterPool();

    afterEach(async () => {
        await pool.cleanup();
    });

    describe("push", () => {

        it("should throw if branch does not have any remote to push to", async () => {
            // Arrange
            const tester = await pool.create();
            await tester.addCommit();
            const repository = tester.getRepository();
            await tester.addCommit({ subject: "foo", body: "bar" });
            const masterBranch = await repository.getCurrentBranch();

            // Act
            const actor = async () => {
                await masterBranch.push();
            };

            // Assert
            await expect(actor()).rejects.toThrow();
        });

    });

    describe("getRemote", () => {

        const remoteTester: RemoteTester = new RemoteTester();

        beforeEach(async () => {
            await remoteTester.create();
        });

        afterEach(async () => {
            await remoteTester.cleanup();
        });

        it("should return the configured remote", async () => {
            // Arrange
            const tester = await pool.create();
            await tester.addCommit();
            const remoteUrl = await remoteTester.getUrl();
            const repository = tester.getRepository();
            const remote = await repository.addRemote("origin", remoteUrl);
            const masterBranch = await repository.getCurrentBranch();

            // Act
            await masterBranch.push(remote);

            // Assert
            expect(masterBranch.getRemote()).not.toBeNull();
            expect(masterBranch.getRemoteBranch()).not.toBeNull();
        });

    });

    describe("delete", () => {

        it("should delete the branch", async () => {
            // Arrange
            const tester = await pool.create();
            await tester.addCommit();
            const repository = tester.getRepository();
            const masterBranch = await repository.getCurrentBranch();
            const fooBranch = await masterBranch.branch("foo");
            await fooBranch.checkout();

            const arrangedBranches = await repository.getBranches();

            expect(arrangedBranches.map(branch => branch.getReference())).toEqual([
                "refs/heads/foo",
                "refs/heads/master",
            ]);

            // Act
            await masterBranch.delete();

            // Assert
            const actualBranches = await repository.getBranches();

            expect(actualBranches.map(branch => branch.getReference())).toEqual([
                "refs/heads/foo",
            ]);
        });

    });

    describe("rename", () => {

        it("should rename the branch", async () => {
            // Arrange
            const tester = await pool.create();
            await tester.addCommit();
            const repository = tester.getRepository();
            const masterBranch = await repository.getCurrentBranch();
            const fooBranch = await masterBranch.branch("foo");
            await fooBranch.checkout();

            const arrangedBranches = await repository.getBranches();

            expect(arrangedBranches.map(branch => branch.getReference())).toEqual([
                "refs/heads/foo",
                "refs/heads/master",
            ]);

            // Act
            await masterBranch.rename("bar");

            // Assert
            const actualBranches = await repository.getBranches();

            expect(actualBranches.map(branch => branch.getReference())).toEqual([
                "refs/heads/bar",
                "refs/heads/foo",
            ]);
        });

    });

    describe("pull", () => {

        const remoteTester: RemoteTester = new RemoteTester();
        const tester2: RepositoryTester = new RepositoryTester();

        beforeEach(async () => {
            await remoteTester.create();
            await tester2.create();

            const repository = tester2.getRepository();

            const remote = await repository.addRemote("origin", await remoteTester.getUrl());
            await tester2.addCommit({ subject: "foo", body: "bar" });

            const masterBranch = await repository.getCurrentBranch();

            await masterBranch.push(remote);
        });

        afterEach(async () => {
            await remoteTester.cleanup();
            await tester2.cleanup();
        });

        it("should pull new changes", async () => {
            jest.setTimeout(10000);

            // Arrange
            const tester = await pool.create();
            await tester.addCommit();
            const url = await remoteTester.getUrl();
            await tester.clone(url);

            const repository = tester.getRepository();
            const masterBranch = await repository.getCurrentBranch();

            // Create new changes on remote
            await tester2.addCommit({ subject: "bar", body: "foo" });
            const tester2Repository = tester2.getRepository();
            const tester2MasterBranch = await tester2Repository.getCurrentBranch();
            await tester2MasterBranch.push();

            // Act
            await masterBranch.pull();

            // Assert
            const commits = await masterBranch.getCommits();
            const messages = await Promise.all(commits.map(commit => commit.getMessage()));
            expect(messages).toEqual([
                {
                    "body": "foo",
                    "subject": "bar",
                },
                {
                    "body": "bar",
                    "subject": "foo",
                },
            ]);
        });

        // pull with rebase and conflicts

    });

});
