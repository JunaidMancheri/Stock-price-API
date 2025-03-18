import { Request, Response } from "express";
import { PricesRepo } from "./repository";
import { BadRequest} from 'http-errors';

function validateDate(date: string) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const isValidFormat = dateRegex.test(date);
    if (!isValidFormat) throw new BadRequest('query "date" must be a string with format YYYY-MM-DD');
    
    const dateObj = new Date(date);
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    if ((year < 2024 && month < 4)|| (year > 2025 && month >3)) {
        throw new BadRequest('query "date" must be between 2024 April and 2025 March ');
    }
    
    const day = dateObj.getDay();
    if (day === 0 || day === 6) throw new BadRequest('query "date" must be a weekday')
}

export async function getClosingPrice(req: Request, res: Response) {
    const symbol = req.query['symbol'];
    const date = req.query['date'];

    if (!symbol) throw new BadRequest('query "symbol" is required');
    if (!date) throw new BadRequest('query "date" is required');

    if (typeof symbol !== 'string') throw new BadRequest('query "symbol" must be a string');
    if (typeof date !== 'string') throw new BadRequest('query "date" must be a string with format YYYY-MM-DD')
     
    validateDate(date);

    const closingPrice = PricesRepo.getClosingPrice(symbol, date);
    res.json({closingPrice}) ;
}