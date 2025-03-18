import {validateDate} from '../../src/prices/validateDate.utils'
import { BadRequest } from 'http-errors';

describe('validateDate', () => {
    it('should throw an error if the date format is incorrect', () => {
        expect(() => validateDate('2024-04-31')).not.toThrow();
        expect(() => validateDate('2024/04/30')).toThrow(BadRequest);
        expect(() => validateDate('04-30-2024')).toThrow(BadRequest);
        expect(() => validateDate('20240430')).toThrow(BadRequest);
    });

    it('should throw an error if the date is invalid', () => {
        expect(() => validateDate('2024-02-30')).toThrow(BadRequest);
        expect(() => validateDate('abcd-ef-gh')).toThrow(BadRequest);
    });

    it('should throw an error if the date is out of range (before April 2024 or after March 2025)', () => {
        expect(() => validateDate('2024-03-31')).toThrow(BadRequest);
        expect(() => validateDate('2025-04-01')).toThrow(BadRequest);
    });

    it('should throw an error if the date is a weekend (Saturday or Sunday)', () => {
        expect(() => validateDate('2024-04-06')).toThrow(BadRequest);
        expect(() => validateDate('2024-04-07')).toThrow(BadRequest);
    });

    it('should not throw an error for valid weekdays within the allowed range', () => {
        expect(() => validateDate('2024-04-10')).not.toThrow();
        expect(() => validateDate('2025-03-28')).not.toThrow();
    });
});
