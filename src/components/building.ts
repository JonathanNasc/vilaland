import "phaser"
import { GridPosition } from "src/components/gridPosition";

export class Building extends Phaser.Physics.Arcade.Sprite {

    public gridPosition: GridPosition;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, 'tileset', key);
        scene.add.existing(this);
        this.setDepth(100);
        this.gridPosition = GridPosition.byObject(this);
    }

}
