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
    {count: Random.percent(count_of_resources, 2.5), generate: Gold.generate},
    {count: Random.percent(count_of_resources, 1.5), generate: Bronze.generate},
    {count: Random.percent(count_of_resources, 10), generate: Stone.generate},
    {count: Random.percent(count_of_resources, 86), generate: Tree.generate},
];

export class DefaultObjectsGenerator {

    public static makeRandomResources(scene: Phaser.Scene) : Resource[] {
        return Array.prototype.concat.apply([], resource_generators.map((generator: any) => {
            return generator.generate(scene, generator.count);
        }));
    }

    public static makeMainStreet(scene: Phaser.Scene): Street[] {
        const x_position: number = constWorld/2;
        const count_of_streets = constWorld/tile;
        let streets: Street[] = [];

        for (let i = 1; i <= count_of_streets; i++) {
            streets.push(new Street(scene, x_position, i * tile - (tile/2), Street.KEY_VERTICAL));
        }

        return streets;
    }

}
