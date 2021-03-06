import "phaser";

const VALUE = 'value';

export class Counter extends Phaser.GameObjects.TileSprite {

    public add(amount:number): void {
        let currentAmout = this.data.get(VALUE);
        this.data.set(VALUE, currentAmout + amount);
    }

    public remove(amount:number): void {
        let currentAmout = this.data.get(VALUE);
        this.data.set(VALUE, currentAmout - amount);
    }

    public get(): number {
        return this.data.get(VALUE);
    }

}