import "phaser";
import { Resource } from "src/components/resource"
import { ResourceType } from "src/components/resourceType";

const bronzeTypes = [
    new ResourceType('gold', 3),
]

export class Gold extends Resource {

    public static generate(scene: Phaser.Scene, totalValue: number): Resource[] {
        return Resource.generateResources(scene, totalValue, bronzeTypes, Gold.create);
    }

    public static create(scene: Phaser.Scene, x: number, y: number, type: ResourceType): Resource {
        return new Gold(scene, x, y, type);
    }

}
