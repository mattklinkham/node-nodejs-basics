import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const FILE_NAME = 'fileToRead.txt';
const FILES_DIR_NAME = 'files';
const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const filePath = join(__dirname, FILES_DIR_NAME, FILE_NAME);

    try {
        const fileContent = await fs.readFile(filePath, { encoding: 'utf-8' });
        console.log(fileContent);
    } catch(error) {
        throw new Error(ERROR_MESSAGE);
    }
};

await read();
