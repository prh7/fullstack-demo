import CustomError from './custom';

class InternalServerError extends CustomError {
    statusCode = 500;

    constructor (message, data) {
        super(message, data);
    }

    serializeErrors() {
        return {
            message: this.message,
            data: this.data
        };
    }
}

export default InternalServerError;
