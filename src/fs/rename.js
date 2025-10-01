import * as fs from 'fs/promises';
import { join } from 'node:path';
import { getModulePaths, isFileExists } from '../helpers/index.js';
import { FileSystemError } from '../helpers/error.js';

const SOURCE_DIR_NAME = 'files';
const WRONG_FILE_NAME = 'wrongFilename.txt';
const NEW_FILE_NAME = 'properFilename.md';

const {__dirname, __filename} = getModulePaths(import.meta.url);

const sourceDir = join(__dirname, SOURCE_DIR_NAME);
const wrongFilePath = join(sourceDir, WRONG_FILE_NAME);
const newFilePath = join(sourceDir, NEW_FILE_NAME);

const rename = async () => {
    try {
        const [newFileExists, wrongFileExists] = await Promise.all([
            isFileExists(newFilePath),
            isFileExists(wrongFilePath)
        ]);

        if (!wrongFileExists) {
            throw new FileSystemError(wrongFilePath, new Error('File does not exist'));
        }
        if (newFileExists) {
            throw new FileSystemError(newFilePath, new Error('File already exists'));
        }

        await fs.rename(wrongFilePath, newFilePath);

        console.log(`File ${WRONG_FILE_NAME} was renamed to ${NEW_FILE_NAME}`);
    } catch (error) {
        throw new FileSystemError(__filename, error);
    }
};

await rename();
