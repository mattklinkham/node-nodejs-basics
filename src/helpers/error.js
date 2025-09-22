export const FS_ERROR_MESSAGE = 'FS operation failed'

export class FileSystemError extends Error {
    constructor(path, cause) {
        super(`${FS_ERROR_MESSAGE}: ${path}`, {cause});
        this.name = 'FileSystemError';
        this.path = path;
    }
};
