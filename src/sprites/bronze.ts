import "phaser";
import { Resource } from "src/components/resource"
import { ResourceType } from "src/components/resourceType";

const bronzeTypes = [
    new ResourceType('bronze_stone_s', 2),
    new ResourceType('bronze_stone_m', 4),
    new ResourceType('bronze_stone_l', 6),
    new ResourceType('bronze_stone_lx', 8),
]

export class Bronze extends Resource {

    public static generate(scene: Phaser.Scene, totalValue: number): Resource[] {
        return Resource.generateResources(scene, totalValue, bronzeTypes, Bronze.create);
    }

    public static create(scene: Phaser.Scene, x: number, y: number, type: ResourceType): Resource {
        return new Bronze(scene, x, y, type);
    }

}
