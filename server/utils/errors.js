class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errors = {
    NotFoundError: (message = 'Not Found') => new AppError(message, 404),
    ValidationError: (message = 'Validation Error') => new AppError(message, 400),
    DatabaseError: (message = 'Database Error') => new AppError(message, 500),
};

module.exports = { errors, AppError };