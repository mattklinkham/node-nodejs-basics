import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const FILES_DIR_NAME = 'files';
const COMPRESSED_FILE_NAME = 'archive.gz';
const OUTPUT_FILE_NAME = 'fileToCompress.txt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
    const sourcePath = join(__dirname, FILES_DIR_NAME, COMPRESSED_FILE_NAME);
    const destinationPath = join(__dirname, FILES_DIR_NAME, OUTPUT_FILE_NAME);

    const readableStream = createReadStream(sourcePath);
    const writableStream = createWriteStream(destinationPath);
    const gunzipStream = createGunzip();

    try {
        await pipeline(readableStream, gunzipStream, writableStream);
        console.log('Decompression completed successfully!');
    } catch (error) {
        console.error('Decompression failed:', error.message);
    }
};

await decompress();
