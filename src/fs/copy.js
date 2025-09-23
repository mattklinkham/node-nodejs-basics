import * as fs from 'fs/promises';
import { join } from 'node:path';
import { getModulePaths } from '../helpers/index.js';
import { FileSystemError } from '../helpers/error.js';

const SOURCE_DIR_NAME = 'files';
const TARGET_DIR_NAME = 'files_copy';

const {__dirname} = getModulePaths(import.meta.url);
const sourceDir = join(__dirname, SOURCE_DIR_NAME);
const destDir = join(__dirname, TARGET_DIR_NAME);

const copy = async () => {
    try {
        await fs.cp(sourceDir, destDir, { force: false, errorOnExist: true, recursive: true });
    } catch (error) {
        throw new FileSystemError(sourceDir, error);
    }
};

await copy();
