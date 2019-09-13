import "phaser";
import { tile } from "src/utils/gameConfigurations";

type GameObject = Phaser.GameObjects.GameObject;

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

    public static filterObjectByPosition(objects: GameObject[], position: GridPosition): any | null {
        return objects.filter((object: GameObject) => {
            let pos = GridPosition.byObject(object);
            return pos.row == position.row && pos.column == position.column
        })[0] || null;
    }

    private static getPosition(coordinate: number): number {
        return Math.ceil(coordinate / tile);
    }

}
