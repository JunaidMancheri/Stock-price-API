import { BadRequest } from "http-errors";

export function validateDate(date: string) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const isValidFormat = dateRegex.test(date);
    if (!isValidFormat) {
        throw new BadRequest('query "date" must be a string with format YYYY-MM-DD');
    }

    const dateObj = new Date(date);
    if (dateObj.toString() === 'Invalid Date') {
        throw new BadRequest('query "date" must be a valid date with the format YYYY-MM-DD')
    }
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    console.log(month, year)

    if (
        year < 2024 ||
        (year == 2024 && month < 3) ||
        (year == 2025 && month > 2) ||
        year > 2025
    ) {
        throw new BadRequest('query "date" must be between 2024 April and 2025 March');
    }

    const day = dateObj.getDay();
    if (day === 0 || day === 6) throw new BadRequest('query "date" must be a weekday')
}