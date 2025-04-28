import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const NEW_FILE_NAME = 'properFilename.md';
const OLD_FILE_NAME = 'wrongFilename.txt';
const FILES_DIR_NAME = 'files';
const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isFileExists = async (path) => {
    try {
        await fs.access(path);
        return true;
    } catch(error) {
        if (error.code === 'ENOENT') {
            return false;
        }
        throw error;
    }
}

const rename = async () => {
    const oldFilePath = join(__dirname, FILES_DIR_NAME, OLD_FILE_NAME);
    const newFilePath = join(__dirname, FILES_DIR_NAME, NEW_FILE_NAME);

    try {
        const [isOldFileExists, isNewFileExists] = await Promise.all([
            isFileExists(oldFilePath),
            isFileExists(newFilePath),
        ]);

        if (!isOldFileExists || isNewFileExists) {
            throw new Error(ERROR_MESSAGE);
        }

        await fs.rename(oldFilePath, newFilePath);
    } catch(error) {
        throw error;
    }
};

await rename();
