
# @mscs/git

This is a library to interact programmatically with git in typescript for node.

## Installation

```shell script
$ yarn add @mscs/git
```

## Usage

Short example:

```typescript
import { open, RepositoryInterface, BranchInterface } from "@mscs/git";

async function runtime() {
    const repository: RepositoryInterface = open("/path/to/repo");
    const branches: BranchInterface[] = await repository.getBranches();

    for (const branch of branches){
        console.log(branch.getName());
    }
}

runtime().catch(error => {
    console.log(error);
    process.exit(1);
});
```
