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
