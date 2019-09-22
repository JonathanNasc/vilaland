import "phaser";
import { Resource } from "src/components/resource"
import { ResourceType } from "src/components/resourceType";

const stoneTypes = [
    new ResourceType('stone_large', 10),
    new ResourceType('stone_medium', 7),
    new ResourceType('stone_small', 5),
    new ResourceType('stone_small_x', 5),
]

export class Stone extends Resource {

    public static generate(scene: Phaser.Scene, totalValue: number): Resource[] {
        return Resource.generateResources(scene, totalValue, stoneTypes, Stone.create);
    }

    public static create(scene: Phaser.Scene, x: number, y: number, type: ResourceType): Resource {
        return new Stone(scene, x, y, type);
    }

    protected onClick() {

    }

}
