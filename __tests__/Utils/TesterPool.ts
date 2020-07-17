/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

import { RemoteTester } from "./RemoteTester";
import { RepositoryTester } from "./RepositoryTester";

export class TesterPool {

    protected testers: RepositoryTester[] = [];

    protected remoteTesters: RemoteTester[] = [];

    public async create(){
        const tester = new RepositoryTester();
        await tester.create();

        this.testers.push(tester);

        return tester;
    }

    public async createRemote(){
        const tester = new RemoteTester();
        await tester.create();

        this.remoteTesters.push(tester);

        return tester;
    }

    public async cleanup(){
        for await (const tester of this.testers){
            await tester.cleanup();
        }

        for await (const tester of this.remoteTesters){
            await tester.cleanup();
        }
    }

}
