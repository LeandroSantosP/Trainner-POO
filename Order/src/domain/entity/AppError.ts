export class AppError extends Error {
    constructor(message: string, readonly statusCode: number = 400) {
        super(message);
    }
}
