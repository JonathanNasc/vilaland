import "phaser"
import { Building } from "src/components/building"

export const churchBuildingKey = "church_base";

export class Church extends Building {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y - 50, churchBuildingKey);
        super.startCreationAnim(x, y);
    }

    public static create(scene: Phaser.Scene, x: number, y: number) {
        return new Church(scene, x, y);
    }

}