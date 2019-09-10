import "phaser"
import { tile } from "src/utils/gameConfigurations";

/**
 * The AvailableArea is a square that represents the area inside the
 * InteractiveArea that is available to build a new street or building
 */
export class AvailableArea extends Phaser.GameObjects.TileSprite {

    private static x: number;
    private static y: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, tile - 10, tile - 10, 'tileset', 'snow');
        AvailableArea.setPosition(x, y);
        scene.add.existing(this);
        this.setDepth(25);
        this.setAlpha(0.07);
    }

    static setPosition(x: number, y: number) {
        AvailableArea.x = x;
        AvailableArea.y = y;
    }

    update() {
        if (this.x == AvailableArea.x && this.y == AvailableArea.y) {
            return;
        }

        this.setAlpha(0);
        this.x = AvailableArea.x;
        this.y = AvailableArea.y;
        this.scene.add.tween({
            targets: [this],
            ease: 'Sine.easeInOut',
            duration: 1000,
            delay: 0,
            alpha: {
              getStart: () => 0,
              getEnd: () => 0.08
            }
          });
    }

}