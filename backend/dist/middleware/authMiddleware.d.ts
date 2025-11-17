import { Request, Response, NextFunction } from 'express';
interface UserPayload {
    id: string;
    mobile: string;
}
interface AuthRequest extends Request {
    user?: UserPayload;
}
export declare const protect: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=authMiddleware.d.ts.map