import { Worker } from 'worker_threads';
import { cpus } from 'os'; // Модуль для получения информации о CPU
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
    const createWorkers = () => {
        return new Promise((resolve, reject) => {
            const numCores = cpus().length;
            const results = [];
            let completed = 0;

            const handleResult = (index, result) => {
                results[index] = result;
                completed += 1;
                if (completed === numCores) {
                    resolve(results);
                }
            };

            for (let i = 0; i < numCores; i++) {
                const worker = new Worker(join(__dirname, 'worker.js'));

                const numberToSend = 10 + i;

                worker.postMessage(numberToSend);

                worker.on('message', (result) => {
                    handleResult(i, result);
                    worker.terminate();
                });

                worker.on('error', (error) => {
                    handleResult(i, { status: 'error', data: null });
                    worker.terminate();
                });
            }
        });
    };

    createWorkers()
        .then((results) => {
            console.log('Results:', results);
        })
        .catch((err) => {
            console.error('Error:', err);
        });
};

await performCalculations();
