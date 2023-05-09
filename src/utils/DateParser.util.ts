export class DatePaser {

    public static currentDateInISOFormat() {
        const options: Intl.DateTimeFormatOptions = { timeZone: 'America/Bogota' };
        const date = new Date().toLocaleString('en-US', options);
        return date;
    }
    public static toDateInISOFormat(date: Date) {
        const options: Intl.DateTimeFormatOptions = { timeZone: 'America/Bogota' };
        return new Date(date).toLocaleString('en-US', options);
    }
}