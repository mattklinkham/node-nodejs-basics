import { createReadStream, createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const FILES_DIR_NAME = 'files';
const READ_FILE_NAME = 'fileToRead.txt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const filePath = join(__dirname, FILES_DIR_NAME, READ_FILE_NAME);
    const rs = createReadStream(filePath);

    rs.pipe(process.stdout);
    rs.on('end', () => {
        process.stdout.write('\n');
    });
};

await read();
