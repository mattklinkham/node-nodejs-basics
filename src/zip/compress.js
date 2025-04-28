import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const FILES_DIR_NAME = 'files';
const INPUT_FILE_NAME = 'fileToCompress.txt';
const OUTPUT_FILE_NAME = 'archive.gz';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
    const sourcePath = join(__dirname, FILES_DIR_NAME, INPUT_FILE_NAME);
    const destinationPath = join(__dirname, FILES_DIR_NAME, OUTPUT_FILE_NAME);

    const readableStream = createReadStream(sourcePath);
    const writableStream = createWriteStream(destinationPath);
    const gzipStream = createGzip();

    try {
        await pipeline(readableStream, gzipStream, writableStream);
        console.log('Compression completed successfully!');
    } catch (error) {
        console.error('Compression failed:', error.message);
    }
};

await compress();
