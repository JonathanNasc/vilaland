import "phaser";
import { Resource } from "src/components/resource"
import { Random } from "src/utils/random";

const treeTypes = [
    {key: 'tree1', value: 7},
    {key: 'tree1', value: 7},
    {key: 'tree1', value: 7},
    {key: 'tree1_s', value: 5},
    {key: 'trunk', value: 1},
]

export class Tree extends Resource {

    public static generate(scene: Phaser.Scene, totalValue: number): Resource[] {
        let trees: Tree[] = [];
        let treesValue = 0;
        let i = 0;
        while (totalValue > treesValue) {
            let treeType = treeTypes[Random.int(0, treeTypes.length)];
            treesValue += treeType.value;
            trees.push(new Tree(scene, Resource.randomX(), Resource.randomY(), treeType.key));
        }

        return trees;
    }

}
