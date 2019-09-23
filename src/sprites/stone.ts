import "phaser";
import { Resource } from "src/components/resource"
import { ResourceType } from "src/components/resourceType";
import { CountersRepo } from "src/components/countersRepo";
import { GameScene } from "src/scenes/gameScene";

const valueMinedPerClick = 2;
const stoneTypes = [
    new ResourceType('stone_large', 10),
    new ResourceType('stone_medium', 7),
    new ResourceType('stone_small', 5),
    new ResourceType('stone_small_x', 3),
]

export class Stone extends Resource {

    public scene: GameScene;

    public static generate(scene: Phaser.Scene, totalValue: number): Resource[] {
        return Resource.generateResources(scene, totalValue, stoneTypes, Stone.create);
    }

    public static create(scene: Phaser.Scene, x: number, y: number, type: ResourceType): Resource {
        return new Stone(scene, x, y, type);
    }

    protected onClick() {
        super.collect(valueMinedPerClick, 'stone_small_x', (minedValue: number) => {
            CountersRepo.stone.add(minedValue);
        });
    }

}
