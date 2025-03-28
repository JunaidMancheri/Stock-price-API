import { Router } from "express";
import { pricesRouter } from "./prices.routes";

const router = Router();

router.use('/stock-price', pricesRouter);

export {router as routes};