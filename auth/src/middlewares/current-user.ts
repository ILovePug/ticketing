import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
}

// add currentUser to request
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
	// make sure there is a cookie set
	if (!req.session?.jwt) {
		return next();
	}

	try {
		const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
		req.currentUser = payload;
	} catch (error) {}

	next();
};
