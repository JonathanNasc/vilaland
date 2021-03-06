import "phaser"
import { Building } from "src/components/building"

export const hostelBuildingKey = "hostel";

export class Hostel extends Building {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y - 50, hostelBuildingKey);
        super.startCreationAnim(x, y);
    }

    public static create(scene: Phaser.Scene, x: number, y: number) {
        return new Hostel(scene, x, y);
    }

}