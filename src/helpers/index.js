import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export const getModulePaths = (importMetaUrl) => {
    const __filename = fileURLToPath(importMetaUrl);
    const __dirname = dirname(__filename);

    return {
        __filename,
        __dirname
    };
};

export const isFileExists = (path) => fs.access(path)
    .then(() => true)
    .catch((error) => {
        if (error.code === 'ENOENT') {
            return false;
        }

        throw error;
    }
);
