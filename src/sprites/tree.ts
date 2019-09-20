import "phaser";
import { Resource } from "src/components/resource"
import { Random } from "src/utils/random";
import { zResources } from "src/utils/depth";

const treeTypes = [
    {key: 'tree1', value: 7},
]

export class Tree extends Resource {

    public static generate(scene: Phaser.Scene, totalValue: number): Resource[] {
        let trees: Tree[] = [];
        let treesValue = 0;
        let i = 0;
        while (totalValue > treesValue) {
            let treeType = treeTypes[Random.int(0, treeTypes.length)];
            let y = Resource.randomY();
            let tree = new Tree(scene, Resource.randomX(), y, treeType.key);

            tree.setDepth(zResources + y);
            trees.push(tree);
            treesValue += treeType.value;
        }

        return trees;
    }

}
