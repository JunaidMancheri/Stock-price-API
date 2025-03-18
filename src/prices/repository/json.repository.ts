import { SymbolData, Prices } from "../interfaces/Prices.interface";
import PricesRepository from "../interfaces/PricesRepository.interfaces";
import data from './stockPrices.json';

const prices = data as Prices;


export class PricesJsonRepo implements PricesRepository {
    async getSymbol(symbol: string): Promise<SymbolData | null> {
        return prices[symbol]
    }
    async getClosingPrice(symbol: string, date: string): Promise<string | null> {
        return prices[symbol]?.[date];
    }
}