import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

const transform = async () => {
    const readable = process.stdin;
    const writable = process.stdout;

    const transform = new Transform({
        transform(chunk, _, callback) {
            const stringifyChunk = chunk.toString().trim();
            const reversedChunk = stringifyChunk.split('').reverse().join('') + '\n';

            callback(null, reversedChunk);
        },
    });

    try {
        await pipeline(readable, transform, writable);
    } catch (error) {
        console.error('Erorr:', error);
    }
};

await transform();
