type errorInputType = {
  status?: number;
  message?: string;
  errors?: string[];
};

export class ApplicationError extends Error {
  errors?: string[];
  status?: number;
  date: string;
  constructor({ message, errors = [], status = 400 }: errorInputType) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApplicationError);
    }
    const date = new Date();
    this.errors = errors;
    this.name = "ApplicationError";
    this.status = status;
    this.date = date.toISOString();
  }
}
