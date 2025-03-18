import { Request, Response } from "express";
import { PricesRepo } from "./repository";
import { BadRequest, NotFound } from 'http-errors';
import { validateDate } from "./validateDate.utils";

export async function getClosingPrice(req: Request, res: Response) {
    const symbol = req.query['symbol'];
    const date = req.query['date'];

    if (!symbol) throw new BadRequest('query "symbol" is required');
    if (!date) throw new BadRequest('query "date" is required');

    if (typeof symbol !== 'string') throw new BadRequest('query "symbol" must be a string');
    if (typeof date !== 'string') throw new BadRequest('query "date" must be a string with format YYYY-MM-DD')

    validateDate(date);

    const symbolUpperCase = symbol.toUpperCase();
    
    const stock = await PricesRepo.getSymbol(symbolUpperCase);
    if (!stock) {
        throw new NotFound(`${symbol}'s price data is not available`)
    }

    const closingPrice = await PricesRepo.getClosingPrice(symbolUpperCase, date);
    res.json({ closingPrice });
}