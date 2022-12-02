export class SQLFunctions {
    public static id_AutoIncrement(products:Array<any>):number{
        return (products[products.length - 1].id + 1);
    }
    public static padTo2Digits(num: number): string {
        return num.toString().padStart(2, '0');
    }
    public static formatDate(date: Date) {
        return `${[
            this.padTo2Digits(date.getDate()),
            this.padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('/')} ${[date.getHours(), date.getMinutes(), date.getSeconds()].join(":")}`;
    }
}