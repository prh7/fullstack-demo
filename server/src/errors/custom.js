class CustomError extends Error {
    statusCode = null;

    constructor (message, data = {}) {
        super(message);
   
        Object.setPrototypeOf(this, new.target.prototype);
        
        this.message = message;
        this.data = data;
    }

    serializeErrors() {
        throw new Error('This method should be implemented');
    }
}

export default CustomError;
