import "phaser";
import { tile } from "src/utils/gameConfigurations";

type TileSprite = Phaser.GameObjects.TileSprite;

export class GridPosition {

    public row: number;
    public column: number;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    public static byObject(object: TileSprite): GridPosition {
        let column = GridPosition.getPosition(object.x);
        let row = GridPosition.getPosition(object.y);

        return new GridPosition(row, column);
    }

    public static filterObjectByPosition(objects: TileSprite[], position: GridPosition): TileSprite | null {
        return objects.filter((object: TileSprite) => GridPosition.byObject(object) == position)[0];
    }

    private static getPosition(coordinate: number): number {
        return Math.ceil(coordinate / tile);
    }

}
