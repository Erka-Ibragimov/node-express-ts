import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { IMiddleWare } from './middleware.interface';

export class AuthMiddleware implements IMiddleWare {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			verify(token, this.secret, (err, payload: any) => {
				if (err) {
					next();
				} else if (payload) {
					req.user = payload.email;
					// req.user = payload.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
