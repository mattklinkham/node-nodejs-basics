import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const FILE_NAME = 'fileToRemove.txt';
const FILES_DIR_NAME = 'files';
const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
    const filePath = join(__dirname, FILES_DIR_NAME, FILE_NAME);

    try {
        await fs.rm(filePath);
    } catch(error) {
        throw new Error(ERROR_MESSAGE);
    }
};

await remove();
