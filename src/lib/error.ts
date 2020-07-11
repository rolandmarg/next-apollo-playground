export class AppError extends Error {
  status: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.status = statusCode;
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error') {
    super(500, message);
  }
}

export class BadRequest extends AppError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'Database down') {
    super(503, message);
  }
}
