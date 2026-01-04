class DateResult {
    day: number;
    month: number;
    year: number;

    constructor(date) {
        this.day = parseInt(date[2], 10),
        this.month = parseInt(date[1], 10),
        this.year = parseInt(date[0], 10)
    }
}

export default DateResult;