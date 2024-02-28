import { ValidationError } from 'class-validator';
import ControllerException from './controller.exception';

export default class HttpPostException<T> extends ControllerException {
  constructor (error: Error | ValidationError[]) {
    super(error);
  }

  handlerException (): void {}
}
