import { promises as fs } from "fs";
import * as path from "path";

afterAll(async () => {
    await fs.rmdir(path.join(__dirname, "Temp"), { recursive: true });
});
