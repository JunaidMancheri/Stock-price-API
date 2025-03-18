/**
 * Script to generate complete stock data for 30 major stocks
 * from April 1, 2024 to March 31, 2025
 * 
 * Run this script to generate a CSV file that can be imported into Google Sheets
 */

const fs = require('fs');

const stockSymbols = [
  { symbol: "AAPL", name: "Apple Inc.", basePrice: 172.28 },
  { symbol: "MSFT", name: "Microsoft Corporation", basePrice: 413.64 },
  { symbol: "GOOGL", name: "Alphabet Inc.", basePrice: 150.87 },
  { symbol: "AMZN", name: "Amazon.com Inc.", basePrice: 178.34 },
  { symbol: "NVDA", name: "NVIDIA Corporation", basePrice: 875.28 },
  { symbol: "META", name: "Meta Platforms Inc.", basePrice: 475.91 },
  { symbol: "TSLA", name: "Tesla Inc.", basePrice: 173.80 },
  { symbol: "BRK.B", name: "Berkshire Hathaway Inc.", basePrice: 405.45 },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", basePrice: 190.68 },
  { symbol: "V", name: "Visa Inc.", basePrice: 270.36 },
  { symbol: "JNJ", name: "Johnson & Johnson", basePrice: 152.12 },
  { symbol: "WMT", name: "Walmart Inc.", basePrice: 60.24 },
  { symbol: "PG", name: "Procter & Gamble Co.", basePrice: 156.78 },
  { symbol: "MA", name: "Mastercard Inc.", basePrice: 450.32 },
  { symbol: "UNH", name: "UnitedHealth Group Inc.", basePrice: 520.45 },
  { symbol: "HD", name: "Home Depot Inc.", basePrice: 345.67 },
  { symbol: "DIS", name: "Walt Disney Co.", basePrice: 114.23 },
  { symbol: "BAC", name: "Bank of America Corp.", basePrice: 37.89 },
  { symbol: "XOM", name: "Exxon Mobil Corporation", basePrice: 116.45 },
  { symbol: "PFE", name: "Pfizer Inc.", basePrice: 27.33 },
  { symbol: "CSCO", name: "Cisco Systems Inc.", basePrice: 48.91 },
  { symbol: "INTC", name: "Intel Corporation", basePrice: 42.45 },
  { symbol: "VZ", name: "Verizon Communications Inc.", basePrice: 40.78 },
  { symbol: "KO", name: "Coca-Cola Company", basePrice: 61.23 },
  { symbol: "MRK", name: "Merck & Co. Inc.", basePrice: 125.67 },
  { symbol: "PEP", name: "PepsiCo Inc.", basePrice: 169.45 },
  { symbol: "ADBE", name: "Adobe Inc.", basePrice: 485.32 },
  { symbol: "CMCSA", name: "Comcast Corporation", basePrice: 40.56 },
  { symbol: "NFLX", name: "Netflix Inc.", basePrice: 605.89 },
  { symbol: "TATASTEEL.NS", name: "Tata Steel Limited", basePrice: 145.67 }
];

function getDates(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    // Skip weekends (Saturday and Sunday)
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      dates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

const tradingDates = getDates('2024-04-01', '2025-03-31');

//YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


function getRandomPriceMovement(volatility = 0.02) {
  return (Math.random() - 0.5) * volatility * 2;
}


let csvData = 'Symbol,Date,Price\n';
let jsonData = {};

stockSymbols.forEach(stock => {
  let currentPrice = stock.basePrice;
  jsonData[stock.symbol] = {}

  tradingDates.forEach(date => {
    const movement = getRandomPriceMovement();
    currentPrice = currentPrice * (1 + movement);


    const month = date.getMonth();
    if (month === 11) {
      currentPrice *= 1.005;
    } else if (month === 0) {
      currentPrice *= 0.998;
    } else if (month === 3) {
      currentPrice *= 1.002;
    }

    currentPrice = Math.max(currentPrice, stock.basePrice * 0.6);

    const formattedPrice = currentPrice.toFixed(2);

    csvData += `${stock.symbol},${formatDate(date)},${formattedPrice}\n`;
    jsonData[stock.symbol][formatDate(date)] = formattedPrice
  })
});


fs.writeFileSync('stockPrices.json', JSON.stringify(jsonData, null, 4), 'utf-8');

console.log('Stock data generated successfully. Import stock_data.csv into Google Sheets.');