import "phaser";
import { GridPosition } from "src/components/gridPosition";
import { tile, constWorld } from "src/utils/gameConfigurations";
import { Random } from "src/utils/random";
import { zResources } from "src/utils/depth";
import { ResourceType } from "./resourceType";
import { GameScene } from "src/scenes/gameScene";
import { ObjectsManager } from "src/components/objectsManager";
import { InteractiveArea } from "src/sprites/interactiveArea";

export class Resource extends Phaser.Physics.Arcade.Sprite {

    public gridPosition: GridPosition;
    public value: number;
    public scene: GameScene;
    public id: string;

    constructor(scene: Phaser.Scene, x: number, y: number, type: ResourceType) {
        super(scene, x, y, 'tileset', type.spritekey);
        this.value = type.value;
        scene.add.existing(this);
        this.setDepth(zResources);
        this.gridPosition = GridPosition.byObject(this);
        this.on('pointerdown', this.onClick);
        ObjectsManager.setId(this);
    }

    protected static generateResources(scene: Phaser.Scene, totalValue: number, resourceTypes: Array<ResourceType>, create: CallableFunction): Resource[] {
        let resources: Resource[] = [];
        let resourcesSumValue = 0;
        while (totalValue > resourcesSumValue) {
            const resourceType = resourceTypes[Random.int(0, resourceTypes.length)];
            const y = Resource.randomY();
            const x = Resource.randomX();
            const resource = create(scene, x, y, resourceType);

            resource.setDepth(zResources + y);
            resources.push(resource);
            resourcesSumValue += resourceType.value;
        }

        return resources;
    }

    protected static randomX(): number {
        const halfTile = tile/2;
        const skipFrom = constWorld/2 - halfTile;
        const skipTo = skipFrom + tile;
        const x = this.getRandomPositionInWorld();

        if (x > skipFrom && x < skipTo) {
            return this.randomX();
        }

        return x;
    }

    protected static randomY(): number {
        return this.getRandomPositionInWorld();
    }

    protected onClick() {}

    private static getRandomPositionInWorld(): number {
        const border = 5;
        return Random.int(border, constWorld - border);
    }

    public destroy() {
        this.removeFromSceneResources();
        InteractiveArea.removeObject(this);
        super.destroy();
    }

    private removeFromSceneResources() {
        const index = this.scene.resources
            .map((resource) => resource.id)
            .indexOf(this.id);
        
        if (index > -1) {
            this.scene.resources.splice(index, 1);
        }
    }

}
