export class Random {
    public static int(min = 0, max = 99999): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static string(options: Array<string>): string {
        return options[Random.int(options.length)];
    }

    public static percent(totalValue: number, percent: number): number {
        return Math.ceil(percent * 0.01 * totalValue);
     } 
}
