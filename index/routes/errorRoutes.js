const express = require('express');
const router = express.Router();

/**
 * @route   GET /error
 * @desc    Displays generic error page when user hits an invalid path or server error occurs
 * @access  Public
 */
router.get('/error', (req, res) => {
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
});

/**
 * Middleware to handle 404 - Not Found errors
 * This should be placed after all other routes
 */
router.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: {
            code: 404,
            message: 'Page not found - The requested resource does not exist',
            path: req.originalUrl,
            timestamp: new Date().toISOString()
        }
    });
});

/**
 * Global error handler middleware
 * Catches all server errors and displays generic error page
 */
router.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        success: false,
        error: {
            code: statusCode,
            message: message,
            timestamp: new Date().toISOString()
        }
    });
});

module.exports = router;
