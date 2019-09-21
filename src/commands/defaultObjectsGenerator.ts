// import { Random } from './../utils/random';
import "phaser"
import { constWorld, tile } from "src/utils/gameConfigurations";
import { Street } from "src/sprites/street";
import { Resource } from "src/components/resource";
import { Random } from "src/utils/random";
import { Tree } from "src/sprites/tree";
import { Stone } from "src/sprites/stone";
import { Bronze } from "src/sprites/bronze";
import { Gold } from "src/sprites/gold";

const count_of_resources = 2000;
const resource_generators = [
    {count: Random.percent(count_of_resources, 0.5), generate: Gold.generate},
    {count: Random.percent(count_of_resources, 1.5), generate: Bronze.generate},
    {count: Random.percent(count_of_resources, 10), generate: Stone.generate},
    {count: Random.percent(count_of_resources, 88), generate: Tree.generate},
];

export class DefaultObjectsGenerator {

    public static makeRandomResources(scene: Phaser.Scene) : Resource[] {
        let resourceces: Resource[] = [];
        for (let generator of resource_generators) {
            resourceces.concat(generator.generate(scene, generator.count));
        }

        return resourceces;
    }

    public static makeMainStreet(scene: Phaser.Scene) {
        const x_position: number = constWorld/2;
        const count_of_streets = constWorld/tile;
        let pastStreet: Street;

        for (let i = 1; i <= count_of_streets; i++) {
            let currentStreet = new Street(scene, x_position, i * tile - (tile/2));
            pastStreet = DefaultObjectsGenerator.setStreetReferences(currentStreet, pastStreet);
        }
    }

    private static setStreetReferences(currentStreet: Street, pastStreet: Street | null): Street {
        if (pastStreet) {
            pastStreet.streetDown = currentStreet;
        }

        currentStreet.streetUp = pastStreet;
        return currentStreet;
    }

    // private static generateResource(count:number, generator: () => void) {
    //     for(let i = 0; i < count; i++) {
    //         generator();
    //     }
    // }

    // private static tree() {
    //     let x = Random.int(1, 1000);
    //     let y = Random.int(1, 1000);
    //     let type = Random.int(1,2);
    //     let tree = new Tree(ResourcesGenerator.game, x, y, type);
    //     ResourcesGenerator.game.add.existing(tree);
    // }
}
