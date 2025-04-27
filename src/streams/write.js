import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const FILES_DIR_NAME = 'files';
const WRITE_FILE_NAME = 'fileToWrite.txt';
const START_MESSAGE =
    'To finish the input and save it to the file, type "CLOSE" and press Enter.\n' +
    'Alternatively, you can press Ctrl+C to terminate the process.\n';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
    const filePathToWrite = join(__dirname, FILES_DIR_NAME, WRITE_FILE_NAME);

    const ws = fs.createWriteStream(filePathToWrite);

    process.stdin.pipe(ws);

    process.stdout.write(START_MESSAGE);

    process.stdin.on('data', (chunk) => {
        const chunkStringified = chunk.toString().trim();

        if (chunkStringified === 'CLOSE') {
            console.log('Closing the stream...');
            process.stdin.emit('end');
        }
    });

    process.stdin.on('end', () => {
        console.log('File has been written successfully!');
        ws.end();
    });

    process.on('SIGINT', () => {
        console.log('Process interrupted. File write was aborted.');
        ws.end();
        process.exit(0);
    });

    ws.on('error', (error) => {
        console.error('Write stream error:', error);
    });
};

await write();
