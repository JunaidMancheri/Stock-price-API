export default interface PricesRepository {
    getSymbol(symbol: string): string | null
    getClosingPrice(symbol: string, date: string) : string | null
}