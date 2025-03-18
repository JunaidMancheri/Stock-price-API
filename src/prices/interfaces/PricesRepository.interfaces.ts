import { SymbolData } from "./Prices.interface"

export default interface PricesRepository {
    getSymbol(symbol: string): Promise<SymbolData | null>
    getClosingPrice(symbol: string, date: string) : Promise<string | null>
}