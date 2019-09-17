import "phaser"
import { tile } from "src/utils/gameConfigurations";
import { Building } from "src/components/building";
import { GridPosition } from "src/components/gridPosition";
import { AvailableArea } from "./availableArea";
import { GameScene } from "src/scenes/gameScene";

/**
 * The InteractiveArea is a square around the player's character,
 * it represents the area the player can interact. Each movement action
 * change this area from the last location to the new one.
 */
export class InteractiveArea extends Phaser.GameObjects.TileSprite {

    private static x: number;
    private static y: number;
    private static availableAreas: AvailableArea[] = [];
    private static interactiveBuildings: Building[] = [];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, tile*3, tile*3, 'tileset', 'snow');
        InteractiveArea.setPosition(x, y);
        scene.add.existing(this);
        this.setDepth(25);
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
        this.reset(gameScene);
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

    private reset(gameScene: GameScene) {
        InteractiveArea.clean();
        let interactiveTilePositions = this.getInteractivePositions(GridPosition.byObject(this));
        for (let interactiveTilePosition of interactiveTilePositions) {
            let building: Building = GridPosition.filterObjectByPosition(gameScene.buildings, interactiveTilePosition);
            if (building) {
                console.log(building.setInteractive({cursor: 'pointer'}));
                InteractiveArea.interactiveBuildings.push(building);
            } else {
                let availableAreate = new AvailableArea(gameScene, interactiveTilePosition.x, interactiveTilePosition.y);
                InteractiveArea.availableAreas.push(availableAreate);
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

    private static clean() {
        for (let availableArea of InteractiveArea.availableAreas) {
            availableArea.destroy();
        }

        for (let interactiveBuilding of InteractiveArea.interactiveBuildings) {
            interactiveBuilding.removeInteractive();
        }
    }

}
