import { ValidationError } from 'class-validator';
import { EntityPropertyNotFoundError } from 'typeorm';
import AlreadyExistsException from './alreadyExistEntity.exception';
import AuthorizationException from './authorization.exception';
import HttpStatusCode from '../enum/httpStatusCode.enum';
import { Response } from 'express';

export default abstract class ControllerException extends Error {
  protected error: Error | ValidationError[];
  protected status: HttpStatusCode;
  protected json: Record<string, any>;

  constructor (error: Error | ValidationError[], message?: string) {
    super(error instanceof Error ? error.message : message);
    this.error = error;
    this.status = HttpStatusCode.INTERNAL_SERVER_ERROR;
    this.getException();
  }

  abstract handlerException(): void;

  private handlerUnauthorizedException (): void {
    if (this.error instanceof AuthorizationException) {
      this.status = HttpStatusCode.UNAUTHORIZED;
    }
  }

  private validationException (): void {
    if (
      this.error instanceof Array &&
      this.error.every(item => item instanceof ValidationError)
    ) {
      this.status = HttpStatusCode.BAD_REQUEST;
      this.json = this.error.map(validationError => ({
        property: validationError.property,
        errors: Object.values(validationError.constraints || ''),
      }));
    }
  }

  private handlerMissingValue (): void {
    if (this.error instanceof EntityPropertyNotFoundError) {
      this.message = this.error.message;
      this.status = HttpStatusCode.BAD_REQUEST;
    }
  }

  private handlerSyntaxError (): void {
    if (this.error instanceof SyntaxError) {
      this.status = HttpStatusCode.BAD_REQUEST;
      this.message = this.error.message;
    }
  }

  private validateAuthorityAccess (): void {
    if (this.error instanceof AuthorizationException) {
      this.status = HttpStatusCode.FORBIDDEN;
      this.message = this.error.message;
    }
  }

  private validateAlreadyExist (): void {
    if (this.error instanceof AlreadyExistsException) {
      this.status = HttpStatusCode.BAD_REQUEST;
      this.message = this.error.message;
    }
  }

  private getException (): void {
    this.handlerUnauthorizedException();
    this.handlerSyntaxError();
    this.validationException();
    this.handlerMissingValue();
    this.handlerException();
    this.validateAuthorityAccess();
    this.validateAlreadyExist();
  }

  toHttpResponse (res: Response) {
    res.status(this.status);
    res.send(this.json || this.message);
  }
}
