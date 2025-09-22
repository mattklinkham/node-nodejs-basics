import * as fs from 'node:fs/promises';
import { join } from 'node:path';
import { getModulePaths } from '../helpers/index.js';
import { FileSystemError } from '../helpers/error.js';

const FILE_DIRECTORY = 'files';
const FILE_NAME = 'fresh.txt';
const CONTENT = 'I am fresh and young';

const {__dirname} = getModulePaths(import.meta.url);
const filePath = join(__dirname, FILE_DIRECTORY, FILE_NAME);

const create = async () => {
    try {
        await fs.writeFile(filePath, CONTENT, { flag: 'wx' })
    } catch (error) {
        throw new FileSystemError(filePath, error);
    }
};

await create();
