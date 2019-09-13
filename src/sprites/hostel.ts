import "phaser"
import { Building } from "src/components/building"

export class Hostel extends Building {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'house');
    }

}