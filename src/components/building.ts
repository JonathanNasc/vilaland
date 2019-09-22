import "phaser"
import { GridPosition } from "src/components/gridPosition";
import { zBuildings } from "src/utils/depth";
import { ObjectsManager } from "./objectsManager";

export class Building extends Phaser.Physics.Arcade.Sprite {

    public gridPosition: GridPosition;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, 'tileset', key);
        scene.add.existing(this);
        this.setDepth(zBuildings);
        this.gridPosition = GridPosition.byObject(this);
        ObjectsManager.setId(this);
    }

}
