export class DatePaser {

    public static curentDateInISOFormat(){
        const options : Intl.DateTimeFormatOptions = { timeZone: 'America/Bogota'};
        const date = new Date().toLocaleString('en-US', options);
        return date;
    }
}