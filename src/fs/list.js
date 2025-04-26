import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const FILES_DIR_NAME = 'files';
const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
    const folderPath = join(__dirname, FILES_DIR_NAME);

    try {
        const files = await fs.readdir(folderPath, { withFileTypes: true });
        const fileNames = files
            .filter((dirent) => dirent.isFile())
            .map((dirent) => dirent.name);

        console.log(fileNames);
    } catch(error) {
        throw new Error(ERROR_MESSAGE);
    }
};

await list();
