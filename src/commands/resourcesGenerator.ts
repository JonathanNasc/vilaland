import { Tree } from './../sprites/tree';
import { Random } from './../utils/random';

export class ResourcesGenerator {

    public static game: Phaser.Game;

    public static generate(game: Phaser.Game) {
        ResourcesGenerator.game = game;
        ResourcesGenerator.generateResource(40, this.tree);
    }

    private static generateResource(count:number, generator: () => void) {
        for(let i = 0; i < count; i++) {
            generator();
        }
    }

    private static tree() {
        let x = Random.int(1, 1000);
        let y = Random.int(1, 1000);
        let type = Random.int(1,2);
        let tree = new Tree(ResourcesGenerator.game, x, y, type);
        ResourcesGenerator.game.add.existing(tree);
    }
}
