import { CustomError } from './custom-error'
export class NotFoundError extends CustomError{
    statusCode = 404;
    constructor(){
        super('not found error');

        // required for extending a built-in class
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

	serializeErrors() {
		return [
			{
				message: "not found"
			}
		]
	}
}