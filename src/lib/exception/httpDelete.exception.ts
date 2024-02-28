import { ValidationError } from 'class-validator';
import { QueryFailedError } from 'typeorm';
import ControllerException from './controller.exception';
import HttpStatusCode from '../enum/httpStatusCode.enum';

export default class HttpDeleteException<T> extends ControllerException {
  constructor (error: Error | ValidationError[]) {
    super(error);
  }

  handlerQueryFailedError () {
    if (this.error instanceof QueryFailedError) {
      this.status = HttpStatusCode.BAD_REQUEST;
      this.message = this.error.message;
    }
  }

  handlerException (): void {
    this.handlerQueryFailedError();
  }
}
