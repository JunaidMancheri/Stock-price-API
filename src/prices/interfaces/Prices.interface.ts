export interface Prices {
   [symbol: string]: SymbolData
}

export interface SymbolData {
 [date: string]: string;
}