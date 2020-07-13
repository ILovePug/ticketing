// use abstract class instead of interface so that `instanceof` check can work for javascript
// currently after interface is compiled into ES5, interface wont be generated therefore wont work
export abstract class CustomError extends Error {
	abstract statusCode: number;

	constructor(message: string) {
		super(message);
		// required for extending a built-in class
		Object.setPrototypeOf(this, CustomError.prototype);
    }
    
	abstract serializeErrors(): {
		message: string;
		field?: string;
	}[];
}
