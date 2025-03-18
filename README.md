# Stock Price API

Stock-Price-API is a simple Node.js and TypeScript-based API that provides stock price data. It exposes a single endpoint to fetch stock prices.

## Features
- Built with Node.js and TypeScript
- Provides closing prices of stocks on specific dates
- Implements interfaces to decouple repository implementation, allowing future data source changes
- Includes validation, linting, and testing

## Installation & Running the API

After cloning the repository and installing dependencies:

To start the server, run:
```sh
npm run dev    # For development (nodemon)
npm run build  # For production build
npm start      # For production
```

The API will be available at `http://localhost:8000` (default port).

## API Endpoint

### GET /api/stock-price
Fetches the closing stock price for a given date.

**Request:**
```sh
GET /api/stock-price?symbol=AAPL&date=2024-04-01
```

**Query Parameters:**
- `symbol` (required) - The stock symbol (e.g., `AAPL` for Apple, `GOOGL` for Google)
- `date` (required) - The date in the format YYYY-MM-DD (Allowed range: April 1, 2024 - March 31, 2025)

**Response:**
```json
{
  "symbol": "AAPL",
  "price": 150.25,
  "date": "2024-04-01"
}
```

## Stock Data Creation
The stock data used in this API is synthetic and generated programmatically using a script located in the `/scripts` folder. The data is created by factoring in base price, volatility, and market sentiments with assistance from AI tools. The API uses JSON as its data source.

## Technologies Used
- Node.js
- TypeScript
- Express.js

## License
This project is licensed under the MIT License.

