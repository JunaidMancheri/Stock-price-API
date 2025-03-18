import { NextFunction, Request, Response } from "express"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function catchAsync(fn: any ) {
    return (req: Request, res: Response,next: NextFunction) => {
        fn(req, res, next).catch(next)
    }
}