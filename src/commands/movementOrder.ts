import "phaser"

export class MovementOrder {

    static orders: any[] = [];

    public static pushOrder(x: number, y: number) {
        this.orders.push({x: x, y: y});
    }

}