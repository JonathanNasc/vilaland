import "phaser"
import { Building } from "src/components/building"

export const tavernBuildingKey = "tavern";

export class Tavern extends Building {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y - 50, tavernBuildingKey);
        super.startCreationAnim(x, y);
    }

    public static create(scene: Phaser.Scene, x: number, y: number) {
        return new Tavern(scene, x, y);
    }

}