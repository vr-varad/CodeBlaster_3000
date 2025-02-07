
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    return next(res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    }));
};

export { errorHandler }