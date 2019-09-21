import "phaser"
import { tile } from "src/utils/gameConfigurations";
import { Building } from "src/components/building";
import { GridPosition } from "src/components/gridPosition";
import { AvailableArea } from "./availableArea";
import { GameScene } from "src/scenes/gameScene";
import { zInteractiveArea } from "src/utils/depth";

type Sprite = Phaser.Physics.Arcade.Sprite;

/**
 * The InteractiveArea is a square around the player's character,
 * it represents the area the player can interact. Each movement action
 * change this area from the last location to the new one.
 */
export class InteractiveArea extends Phaser.GameObjects.TileSprite {

    private static x: number;
    private static y: number;
    private static availableAreas: AvailableArea[] = [];
    private static interactiveObjects: Sprite[] = [];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, tile*3, tile*3, 'tileset', 'snow');
        InteractiveArea.setPosition(x, y);
        scene.add.existing(this);
        this.setDepth(zInteractiveArea);
        this.setAlpha(0.07);
    }

    public static setPosition(x: number, y: number) {
        InteractiveArea.x = x;
        InteractiveArea.y = y;
    }

    public update(gameScene: GameScene) {
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
        this.reset(gameScene);
    }

    private reset(gameScene: GameScene) {
        InteractiveArea.clean();
        let interactiveTilePositions = this.getInteractivePositions(GridPosition.byObject(this));
        for (let position of interactiveTilePositions) {
            let resources: Sprite[] = GridPosition.filterObjectByPosition(gameScene.resources, position);
            let building: Sprite[] = GridPosition.filterObjectByPosition(gameScene.buildings, position);
            let objects: Sprite[] = resources.concat(building);
            InteractiveArea.setObjectsAsInteractive(objects);

            if (objects.length == 0) {
                InteractiveArea.availableAreas.push(new AvailableArea(gameScene, position.x, position.y));
            }
        }
    }

    private getInteractivePositions(interactiveAreaPosition: GridPosition): GridPosition[] {
        return [
            new GridPosition(interactiveAreaPosition.row -1, interactiveAreaPosition.column -1),
            new GridPosition(interactiveAreaPosition.row -1, interactiveAreaPosition.column + 1),
            new GridPosition(interactiveAreaPosition.row, interactiveAreaPosition.column - 1),
            new GridPosition(interactiveAreaPosition.row, interactiveAreaPosition.column + 1),
            new GridPosition(interactiveAreaPosition.row + 1, interactiveAreaPosition.column - 1),
            new GridPosition(interactiveAreaPosition.row + 1, interactiveAreaPosition.column + 1),
        ]
    }

    private static setObjectsAsInteractive(objects: Sprite[]) {
        for (let object of objects) {
            object.setInteractive({cursor: 'pointer'});
            InteractiveArea.interactiveObjects.push(object);
        }
    }

    private static clean() {
        for (let availableArea of InteractiveArea.availableAreas) {
            availableArea.destroy();
        }

        for (let object of InteractiveArea.interactiveObjects) {
            object.removeInteractive();
        }
    }

}
