import { CustomError } from '../errors';
import { logger } from '../loggers';

const errorHandlerMiddleware = (error, request, response, next) => {
    
    if (error instanceof SyntaxError && 'body' in error) {
        logger.error(JSON.stringify(error));
        
        return response.status(400).send({ 
            success: false, 
            message: `Invalid request body ${request.originalUrl}` 
        });
    }

    if (error instanceof CustomError) {
        return response.status(error.statusCode).send({ success: false, ...error.serializeErrors() });
    }
    
    return response.status(500).send({ 
        success: false, 
        message: 'Something went wrong in the server'
    });
}

export default errorHandlerMiddleware;
