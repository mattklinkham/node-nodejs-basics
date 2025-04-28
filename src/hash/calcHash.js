import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const FILES_DIR_NAME = 'files';
const FILE_NAME = 'fileToCalculateHashFor.txt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
    const filePath = join(__dirname, FILES_DIR_NAME, FILE_NAME);
    const hash = createHash('sha256');
    const rs = createReadStream(filePath);

    rs.on('error', (error) => {
        console.error('Read stream error:', error.message);
    });

    rs.on('data', (chunk) => {
        hash.update(chunk);
    });

    rs.on('end', () => {
        const hex = hash.digest('hex');
        console.log(hex);
    });
};

await calculateHash();
