/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { Status } from "../src/Status/Status";
import { RemoteTester } from "./Utils/RemoteTester";
import { RepositoryTester } from "./Utils/RepositoryTester";
import { TesterPool } from "./Utils/TesterPool";

describe("Repository", () => {

    const pool: TesterPool = new TesterPool();

    afterEach(async () => {
        await pool.cleanup();
    });

    describe("clean", () => {
        it("should remove all not commited files", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();
            await tester.createFile("foo.txt");

            const arrangedFiles = await tester.getFiles();
            expect(arrangedFiles).toEqual(["foo.txt"]);

            // Act
            await repository.clean({
                force: true,
                noStandardIgnoreRules: true,
                recurseInUntrackedDirectories: true,
            });

            // Assert
            const files = await tester.getFiles();
            expect(files).toEqual([]);
        });
    });

    describe("commit", () => {
        it("should create given commit", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();
            await tester.createFile("foo.txt", "bar\nfoo");
            await repository.mustExecute(["add", "-A"]);

            // Act
            await repository.commit({ subject: "foo", body: "bar" }, { sign: false });

            // Assert
            const branch = await repository.getCurrentBranch();
            const commit = await branch.getCommit();
            expect(await commit.getMessage()).toEqual({ subject: "foo", body: "bar" });
        });
    });

    describe("getBranch", () => {

        it("should return a branch instance by given name", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();
            await tester.addCommit({ subject: "foo", body: "bar" });

            const master = await repository.getCurrentBranch();
            await master.branch("foo");

            // Act
            const actual = await repository.getBranch("foo");

            // Assert
            expect(actual.getReference()).toBe("refs/heads/foo");
        });

        it("should throw error if the branch does not exist", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();
            await tester.addCommit({ subject: "foo", body: "bar" });

            const master = await repository.getCurrentBranch();
            await master.branch("foo");

            // Act
            const actor = async () => {
                await repository.getBranch("bar");
            };

            // Assert
            await expect(actor()).rejects.toThrow();
        });
    });

    describe("addRemote", () => {

        it("should add the remote", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();

            // Act
            await repository.addRemote("foo", "bar");

            // Assert
            const remote = await repository.getRemote("foo");
            expect(remote.getName()).toBe("foo");
        });

    });

    describe("getRemote", () => {

        it("should return an remote instance of given name", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();
            await repository.addRemote("foo", "bar");

            // Act
            const actual = await repository.getRemote("foo");

            // Assert
            expect(actual.getName()).toBe("foo");
        });

        it("should throw if given remote does not exist", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();
            await repository.addRemote("foo", "bar");

            // Act
            const actor = async () => {
                await repository.getRemote("bar");
            };

            // Assert
            await expect(actor()).rejects.toThrow();
        });

    });

    describe("getRemotes", () => {

        it("should return all remotes", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();
            await repository.addRemote("foo", "bar");
            await repository.addRemote("bar", "foo");

            // Act
            const actual = await repository.getRemotes();

            // Assert
            const remoteNames = actual.map(item => item.getName());
            expect(remoteNames).toContain("bar");
            expect(remoteNames).toContain("foo");
        });

    });

    describe("fetch", () => {

        let serverOneTester: RemoteTester;
        let serverTwoTester: RemoteTester;
        let arrangeTester: RepositoryTester;

        beforeEach(async () => {
            jest.setTimeout(10000);

            serverOneTester = await pool.createRemote();
            serverTwoTester = await pool.createRemote();
            arrangeTester = await pool.create();

            // arrange
            const remoteOneUrl = await serverOneTester.getUrl();
            const remoteTwoUrl = await serverTwoTester.getUrl();

            const arrangeRepository = arrangeTester.getRepository();

            const remoteTwoOne = await arrangeRepository.addRemote("origin", remoteOneUrl);
            const remoteTwoTwo = await arrangeRepository.addRemote("upstream", remoteTwoUrl);

            // Create commit on second client for both servers
            await arrangeTester.addCommit({ subject: "foo", body: "lorem" });
            const masterTwoTwo = await arrangeRepository.getCurrentBranch();
            await masterTwoTwo.push(remoteTwoOne);
            await masterTwoTwo.push(remoteTwoTwo);

            // Create another commit on second client for second remote only
            await arrangeTester.addCommit({ subject: "bar", body: "ipsum" });
            await masterTwoTwo.push(remoteTwoTwo);
        });

        it("should fetch from all remotes", async () => {
            // Arrange
            const tester = await pool.create();
            const remoteOneUrl = await serverOneTester.getUrl();
            const remoteTwoUrl = await serverTwoTester.getUrl();

            const repository = tester.getRepository();
            const remoteOneOne = await repository.addRemote("origin", remoteOneUrl);
            const remoteOneTwo = await repository.addRemote("upstream", remoteTwoUrl);

            // Act
            await repository.fetch();

            // Assert
            const masterOne = await remoteOneOne.getBranch("master");
            const masterTwo = await remoteOneTwo.getBranch("master");
            const commitsOne = await masterOne.getCommits();
            const commitsTwo = await masterTwo.getCommits();

            expect(await Promise.all(commitsOne.map(item => item.getMessage()))).toEqual([{
                subject: "foo",
                body: "lorem",
            }]);
            expect(await Promise.all(commitsTwo.map(item => item.getMessage()))).toEqual([{
                subject: "bar",
                body: "ipsum",
            }, {
                subject: "foo",
                body: "lorem",
            }]);
        });

    });

    describe("getBranches", () => {

        it("should return all branches", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();
            await tester.addCommit({ subject: "foo", body: "bar" });

            const master = await repository.getCurrentBranch();
            await master.branch("foo");
            await master.branch("bar");

            // Act
            const actual = await repository.getBranches();

            // Assert
            expect(actual.map(item => item.getReference())).toEqual([
                "refs/heads/bar",
                "refs/heads/foo",
                "refs/heads/master",
            ]);
        });

    });

    describe("getCurrentBranch", () => {

        it("should return the current branch", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();
            await tester.addCommit({ subject: "foo", body: "bar" });

            // Act
            const actual = await repository.getCurrentBranch();

            // Assert
            expect(actual.getReference()).toBe("refs/heads/master");
        });

        it("should return the current branch after change", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();
            await tester.addCommit({ subject: "foo", body: "bar" });

            const master = await repository.getCurrentBranch();
            const foo = await master.branch("foo");
            await foo.checkout();

            // Act
            const actual = await repository.getCurrentBranch();

            // Assert
            expect(actual.getReference()).toBe("refs/heads/foo");
        });

        it("should throw if current checkout is not a branch", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();
            await tester.addCommit({ subject: "foo", body: "bar" });

            const master = await repository.getCurrentBranch();
            const commit = await master.getCommit();
            await tester.addCommit({ subject: "foo", body: "bar" });
            await commit.checkout();

            // Act
            const actor = async () => {
                await repository.getCurrentBranch();
            };

            // Assert
            await expect(actor()).rejects.toThrow();
        });

    });

    describe("getTags", () => {

        it("should return all tags", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();
            await tester.addCommit({ subject: "foo", body: "bar" });

            const master = await repository.getCurrentBranch();
            await master.tag("v0.1.0");
            await master.tag("v1.0.0");

            // Act
            const actual = await repository.getTags();

            // Assert
            expect(actual.map(item => item.getReference())).toEqual([
                "refs/tags/v0.1.0",
                "refs/tags/v1.0.0",
            ]);
        });

    });

    describe("getStatus", () => {

        it("should return the current status", async () => {
            // Arrange
            const tester = await pool.create();
            const repository = tester.getRepository();

            // Act
            const actual = await repository.getStatus();

            // Assert
            expect(actual).toBeInstanceOf(Status);
        });

    });

});
