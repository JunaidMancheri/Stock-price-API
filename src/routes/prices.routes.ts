import { getClosingPrice } from "../prices/controller";
import catchAsync from "../utils/catchAsync";
import { Router } from "express";

const router = Router();

router.get('/', catchAsync(getClosingPrice));

export {router as pricesRouter};