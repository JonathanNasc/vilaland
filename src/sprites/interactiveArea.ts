import "phaser"
import { tile } from "src/utils/gameConfigurations";

/**
 * The InteractiveArea is a square around the player's character,
 * it represents the area the player can interact. Each movement action
 * change this area from the last location to the new one.
 */
export class InteractiveArea extends Phaser.GameObjects.TileSprite {

    private static x: number;
    private static y: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, tile*3, tile*3, 'tileset', 'snow');
        InteractiveArea.setPosition(x, y);
        scene.add.existing(this);
        this.setDepth(25);
        this.setAlpha(0.07);
    }

    static setPosition(x: number, y: number) {
        InteractiveArea.x = x;
        InteractiveArea.y = y;
    }

    update() {
        if (this.x == InteractiveArea.x && this.y == InteractiveArea.y) {
            return;
        }

        this.setAlpha(0);
        this.x = InteractiveArea.x;
        this.y = InteractiveArea.y;
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