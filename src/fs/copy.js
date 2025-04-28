import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const SRC_FOLDER_NAME = 'files';
const DEST_FOLDER_NAME = 'files_copy';
const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const sourcePath = join(__dirname, SRC_FOLDER_NAME);
    const destinationPath = join(__dirname, DEST_FOLDER_NAME);

    try {
        await fs.cp(sourcePath, destinationPath, { recursive: true, force: false, errorOnExist: true });
    } catch(error) {
        throw new Error(ERROR_MESSAGE);
    }
};

await copy();
