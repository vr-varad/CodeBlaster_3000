class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class UnSupportedLanguageError extends CustomError {
    constructor(language) {
        super(`Language ${language} is not supported`, 400);
    }
}


class UserCreationError extends CustomError {
    constructor(username) {
        super(`Error creating user ${username}`, 500);
    }
}

class UserDeletionError extends CustomError {
    constructor(username) {
        super(`Error deleting user ${username}`, 500);
    }
}

class UserNotFoundError extends CustomError {
    constructor(username) {
        super(`User ${username} not found`, 404);
    }
}

class ExecutionError extends CustomError {
    constructor(message) {
        super(message, 500);
    }
}


class CompilationError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}

class TimeoutError extends CustomError {
    constructor() {
        super('Execution timed out', 408);
    }
}

class InternalServerError extends CustomError {
    constructor(message) {
        super(message, 500);
    }
}

class BadRequestError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}

class ForbiddenError extends CustomError {
    constructor(message) {
        super(message, 403);
    }
}


export {
    UnSupportedLanguageError,
    UserCreationError,
    UserDeletionError,
    UserNotFoundError,
    ExecutionError,
    CompilationError,
    TimeoutError,
    InternalServerError,
    BadRequestError,
    ForbiddenError
}