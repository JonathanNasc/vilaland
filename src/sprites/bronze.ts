import "phaser";
import { Resource } from "src/components/resource"
import { ResourceType } from "src/components/resourceType";
import { CountersRepo } from "src/components/countersRepo";

const valueMinedPerClick = 2;
const bronzeTypes = [
    new ResourceType('resource_bronze', 2),
]

export class Bronze extends Resource {

    public static generate(scene: Phaser.Scene, totalValue: number): Resource[] {
        return Resource.generateResources(scene, totalValue, bronzeTypes, Bronze.create);
    }

    public static create(scene: Phaser.Scene, x: number, y: number, type: ResourceType): Resource {
        return new Bronze(scene, x, y, type);
    }

    protected onClick() {
        super.collect(valueMinedPerClick, 'resource_bronze', (minedValue: number) => {
            CountersRepo.bronze.add(minedValue);
        });
    }

}
