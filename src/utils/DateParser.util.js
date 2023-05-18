export class DatePaser {

    static currentDateInISOFormat() {
        const options = { timeZone: 'America/Bogota' };
        const date = new Date().toLocaleString('en-US', options);
        return date;
    }
    static toDateInISOFormat(date) {
        const options = { timeZone: 'America/Bogota' };
        return new Date(date).toLocaleString('en-US', options);
    }
}