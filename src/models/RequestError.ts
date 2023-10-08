type ErrorObject = {
  message: string;
  fieldPath?: string;
};

type RequestErrorConstructorProps = {
  httpStatus: number;
  code: string;
  subcode: string;
  errors: ErrorObject[];
};

export class RequestError extends Error {
  httpStatus: RequestErrorConstructorProps["httpStatus"];

  // Defines module
  code: RequestErrorConstructorProps["code"];

  // Defines error type
  subcode: RequestErrorConstructorProps["subcode"];

  errors: RequestErrorConstructorProps["errors"];

  constructor({ httpStatus, code, subcode, errors }: RequestErrorConstructorProps) {
    super("Internal server error");

    this.httpStatus = httpStatus;
    this.code = code;
    this.subcode = subcode;
    this.errors = errors;

    Object.setPrototypeOf(this, RequestError.prototype);
  }
}
