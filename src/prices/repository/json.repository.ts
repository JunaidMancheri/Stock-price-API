import { SymbolData, Prices } from "../interfaces/Prices.interface";
import PricesRepository from "../interfaces/PricesRepository.interfaces";
import data from './stockPrices.json';

const prices = data as Prices;


export class PricesJsonRepo implements PricesRepository {
    getSymbol(symbol: string): SymbolData | null {
        return prices[symbol]
    }
    getClosingPrice(symbol: string, date: string): string | null {
        return prices[symbol][date];
    }
}