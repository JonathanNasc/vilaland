import "phaser"
import { tile } from "src/utils/gameConfigurations";
import { zAvailableArea } from "src/utils/depth";
import { GameScene } from "src/scenes/gameScene";

/**
 * The AvailableArea is a square that represents the area inside the
 * InteractiveArea that is available to build a new street or building
 */
export class AvailableArea extends Phaser.GameObjects.TileSprite {

    public scene: GameScene;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, tile - 10, tile - 10, 'tileset', 'snow');
        scene.add.existing(this);
        this.setDepth(zAvailableArea);
        this.setAlpha(0.01);
        this.setInteractive({cursor: 'pointer'});
        this.on('pointerover', () => this.setAlpha(0.12));
        this.on('pointerout', () => this.setAlpha(0.01));
        this.on('pointerdown', this.onClick);
    }

    private onClick() {
        this.setAlpha(0.09);
        this.scene.optionsToBuild.open();
    }

}
