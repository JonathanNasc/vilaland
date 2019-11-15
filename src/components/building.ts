import "phaser"
import { GridPosition } from "src/components/gridPosition";
import { zBuildings } from "src/utils/depth";
import { ObjectsManager } from "./objectsManager";
import { GameScene } from "src/scenes/gameScene";

export class Building extends Phaser.Physics.Arcade.Sprite {

    public gridPosition: GridPosition;
    public scene: GameScene;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, 'tileset', key);
        this.scene.add.existing(this);
        this.scene.buildings.push(this);
        this.setDepth(zBuildings);
        this.gridPosition = GridPosition.byObject(this);
        ObjectsManager.setId(this);
    }

    public startCreationAnim(x: number, y: number) {
        this.scene.tweens.add({
            targets: this,
            props: {x:x, y:y},
            duration: 50,
        });
    }

}
