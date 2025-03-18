import { SymbolData } from "./Prices.interface"

export default interface PricesRepository {
    getSymbol(symbol: string): SymbolData | null
    getClosingPrice(symbol: string, date: string) : string | null
}