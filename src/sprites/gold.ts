import "phaser";
import { Resource } from "src/components/resource"
import { ResourceType } from "src/components/resourceType";
import { CountersRepo } from "src/components/countersRepo";

const valueMinedPerClick = 1;
const bronzeTypes = [
    new ResourceType('gold', 2000),
]

export class Gold extends Resource {

    public static generate(scene: Phaser.Scene, totalValue: number): Resource[] {
        return Resource.generateResources(scene, totalValue, bronzeTypes, Gold.create);
    }

    public static create(scene: Phaser.Scene, x: number, y: number, type: ResourceType): Resource {
        return new Gold(scene, x, y, type);
    }

    protected onClick() {
        super.collect(valueMinedPerClick, 'coin', (minedValue: number) => {
            CountersRepo.gold.add(minedValue);
        });
    }

}
