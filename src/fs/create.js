import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const FILE_NAME = 'fresh.txt';
const FILES_DIR_NAME = 'files';
const FILE_CONTENT = 'I am fresh and young';
const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    const filePath = join(__dirname, FILES_DIR_NAME, FILE_NAME);

    try {
        await fs.writeFile(filePath, FILE_CONTENT, { flag: 'wx' });
    } catch(error) {
        throw new Error(ERROR_MESSAGE);
    }
};

await create();
