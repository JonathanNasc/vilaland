// import { Random } from './../utils/random';
import "phaser"
import { constWorld, tile } from "src/utils/gameConfigurations";
import { Street } from "src/sprites/street";

export class DefaultObjectsGenerator {

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
