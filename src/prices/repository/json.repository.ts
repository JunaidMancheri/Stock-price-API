import PricesRepository from "../interfaces/PricesRepository.interfaces";

export class PricesJsonRepo implements PricesRepository {
    getSymbol(symbol: string): string | null {
        throw new Error("Method not implemented.");
    }
    getClosingPrice(symbol: string, date: string): string | null {
        throw new Error("Method not implemented.");
    }
    
}