import "phaser";
import { tile } from "src/utils/gameConfigurations";

type Sprite = Phaser.Physics.Arcade.Sprite;

export class GridPosition {

    public row: number;
    public column: number;
    public x: number;
    public y: number;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
        this.x = tile * column - (tile / 2);
        this.y = tile * row - (tile / 2);
    }

    public static byObject(object: any): GridPosition {
        let column = GridPosition.getPosition(object.x);
        let row = GridPosition.getPosition(object.y);

        return new GridPosition(row, column);
    }

    public static filterObjectByPosition(objects: Sprite[], position: GridPosition): Sprite[] {
        return objects.filter((object: Sprite) => {
            let pos = GridPosition.byObject(object);
            return pos.row == position.row && pos.column == position.column
        });
    }

    private static getPosition(coordinate: number): number {
        return Math.ceil(coordinate / tile);
    }

    public toString() {
        return `${this.row}-${this.column}`;
    }

}
