import request from 'supertest';
import app from '../src/main'; 

describe('API Tests', () => {
    it('Should return closing price of the AAPL at 2024-04-01', async () => {
        const res = await request(app).get('/api/stock-price?symbol=AAPL&date=2024-04-01');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ closingPrice: expect.any(String) });
    });

    it('Should return symbol not found', async () => {
        const res = await request(app).get('/api/stock-price?symbol=AA&date=2024-04-01');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: "AA's price data is not available", status: 404 });
    });


    it('Should return Query date is required', async () => {
        const res = await request(app).get('/api/stock-price?symbol=AA');
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "query \"date\" is required", status: 400 });
    });

    it('Should return Query symbol is required', async () => {
        const res = await request(app).get('/api/stock-price');
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "query \"symbol\" is required", status: 400 });
    });


    it('Should return query date is not following the format', async () => {
        const res = await request(app).get('/api/stock-price?symbol=AAPL&date=20-2024-01');
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "query \"date\" must be a string with format YYYY-MM-DD", status: 400 });
    });


    it('Should return query date not in valid format', async () => {
        const res = await request(app).get('/api/stock-price?symbol=AAPL&date=2024-2-03');
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "query \"date\" must be a string with format YYYY-MM-DD", status: 400 });
    });

    
    it('Should return query date is out of allowed range', async () => {
        const res = await request(app).get('/api/stock-price?symbol=AAPL&date=2024-02-03');
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "query \"date\" must be between 2024 April and 2025 March", status: 400 });
    });


    it('Should return query date is not  a weekday', async () => {
        const res = await request(app).get('/api/stock-price?symbol=AAPL&date=2025-03-02');
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: "query \"date\" must be a weekday", status: 400 });
    });


});
