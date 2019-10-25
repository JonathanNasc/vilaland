import "phaser";
import { CountersRepo } from "./countersRepo";
import { Price } from "./price";

export class BuildingData {
    title: string;
    key: string;
    price: Price;
    scale: number;

    // scene objects
    img: Phaser.GameObjects.Sprite;
    text: Phaser.GameObjects.Text;
    box: Phaser.GameObjects.Rectangle;
    priceContainer: Phaser.GameObjects.Container;

    public static create(title: string, key: string, scale: number): BuildingData {
        let option = new BuildingData();
        option.title = title;
        option.key = key;
        option.price = new Price();
        option.scale = scale;

        return option;
    }

    public gold(value: number): BuildingData {
        this.price.gold = value;
        return this;
    }

    public wood(value: number): BuildingData {
        this.price.wood = value;
        return this;
    }

    public stone(value: number): BuildingData {
        this.price.stone = value;
        return this;
    }

    public bronze(value: number): BuildingData {
        this.price.bronze = value;
        return this;
    }

    public getObjects() {
        return [this.box, this.img, this.text];
    }

    public getRequiredResources(): { [s: string]: number; } {
        let resources: { [s: string]: number; } = {}
        if (this.price.wood) resources['resource_wood'] = this.price.wood;
        if (this.price.stone) resources['resource_stone'] = this.price.stone;
        if (this.price.bronze) resources['resource_bronze'] = this.price.bronze;;
        if (this.price.gold) resources['resource_coin'] = this.price.gold;

        return resources;
    }

}
