/**
 * Error Controller
 * Handles error page rendering and error responses
 */

// Display generic error page
const getErrorPage = (req, res) => {
    const errorCode = req.query.code || 500;
    const errorMessage = req.query.message || 'An unexpected error occurred';
    
    res.status(parseInt(errorCode)).json({
        success: false,
        error: {
            code: parseInt(errorCode),
            message: errorMessage,
            timestamp: new Date().toISOString()
        }
    });
};

// Handle 404 - Page Not Found
const handle404 = (req, res) => {
    res.status(404).json({
        success: false,
        error: {
            code: 404,
            message: 'Page not found - The requested resource does not exist',
            path: req.originalUrl,
            timestamp: new Date().toISOString()
        }
    });
};

// Handle 500 - Internal Server Error
const handle500 = (err, req, res, next) => {
    console.error('Server Error:', err.stack);
    
    const statusCode = err.statusCode || 500;
    const message = process.env.NODE_ENV === 'production' 
        ? 'Internal Server Error' 
        : err.message;
    
    res.status(statusCode).json({
        success: false,
        error: {
            code: statusCode,
            message: message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
            timestamp: new Date().toISOString()
        }
    });
};

module.exports = {
    getErrorPage,
    handle404,
    handle500
};
