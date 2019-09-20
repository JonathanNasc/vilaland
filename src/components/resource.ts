import "phaser";
import { GridPosition } from "src/components/gridPosition";
import { tile, constWorld } from "src/utils/gameConfigurations";
import { Random } from "src/utils/random";
import { zResources } from "src/utils/depth";

export class Resource extends Phaser.Physics.Arcade.Sprite {

    public gridPosition: GridPosition;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, 'tileset', key);
        scene.add.existing(this);
        this.setDepth(zResources);
        this.gridPosition = GridPosition.byObject(this);
    }

    protected static randomX(): number {
        let halfTile = tile/2;
        let skipFrom = constWorld/2 - halfTile;
        let skipTo = skipFrom + tile;
        let x = this.getRandomPositionInWorld();

        if (x > skipFrom && x < skipTo) {
            return this.randomX();
        }

        return x;
    }

    protected static randomY(): number {
        return this.getRandomPositionInWorld();
    }

    private static getRandomPositionInWorld(): number {
        return Random.int(5, constWorld -5);
    }

}
