import { Router } from "express";
import { pricesRouter } from "./prices";

const router = Router();

router.use('/stock-price', pricesRouter);

export {router as routes};