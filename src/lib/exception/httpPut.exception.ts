import { ValidationError } from 'class-validator';
import { UpdateValuesMissingError } from 'typeorm';
import ControllerException from './controller.exception';
import HttpStatusCode from '../enum/httpStatusCode.enum';

export default class HttpPutException<T> extends ControllerException {
  constructor (error: Error | ValidationError[]) {
    super(error);
  }

  handlerUpdateValuesMissingError () {
    if (this.error instanceof UpdateValuesMissingError) {
      this.status = HttpStatusCode.BAD_REQUEST;
      this.message = 'Missing Values';
    }
  }

  handlerException (): void {
    this.handlerUpdateValuesMissingError();
  }
}
