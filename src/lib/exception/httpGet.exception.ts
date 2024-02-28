import {
  FindRelationsNotFoundError,
  EntityPropertyNotFoundError,
  TypeORMError,
} from 'typeorm';
import ControllerException from './controller.exception';
import HttpStatusCode from '../enum/httpStatusCode.enum';

export default class HttpGetException<T> extends ControllerException {
  constructor (error: Error) {
    super(error);
  }

  handlerRelationsException (): void {
    if (this.error instanceof FindRelationsNotFoundError) {
      this.message = this.error.message;
      this.status = HttpStatusCode.BAD_REQUEST;
    }
  }

  handlerWhereException (): void {
    if (this.error instanceof EntityPropertyNotFoundError) {
      this.message = this.error.message;
      this.status = HttpStatusCode.BAD_REQUEST;
    }
  }

  handlerTypeOrmException (): void {
    if (this.error instanceof TypeORMError) {
      this.message = this.error.message;
      this.status = HttpStatusCode.BAD_REQUEST;
    }
    this.handlerRelationsException();
    this.handlerWhereException();
  }

  handlerException (): void {
    this.handlerTypeOrmException();
  }
}
