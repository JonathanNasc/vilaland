import { GameScene } from "src/scenes/gameScene";
import { InteractiveArea } from "src/sprites/interactiveArea";

export class CreateBuildingCommand {

    public x: number;
    public y: number;

    public create(scene: GameScene, builder: CallableFunction) {
        builder(scene, this.x, this.y);
        InteractiveArea.reset(scene);
    }

}
