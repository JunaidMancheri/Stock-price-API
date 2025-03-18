import { NextFunction, Request, Response } from "express"

export default function catchAsync(fn: any ) {
    return (req: Request, res: Response,next: NextFunction) => {
        fn(req, res, next).catch((err: any)=> {
            console.log(err);next(err)
        })
    }
}