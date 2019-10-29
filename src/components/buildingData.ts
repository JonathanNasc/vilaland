import "phaser";
import { CountersRepo } from "./countersRepo";
import { Price } from "./price";

export class BuildingData {
    title: string;
    buildingKey: string;
    price: Price;
    scale: number;
    builder: CallableFunction;

    // scene objects
    img: Phaser.GameObjects.Sprite;
    text: Phaser.GameObjects.Text;
    box: Phaser.GameObjects.Rectangle;
    priceContainer: Phaser.GameObjects.Container;

    public static create(): BuildingData {
        let option = new BuildingData();
        option.price = new Price();

        return option;
    }

    public withTitle(title: string): BuildingData {
        this.title = title;
        return this;
    }

    public withBuildingKey(buildingKey: string): BuildingData {
        this.buildingKey = buildingKey;
        return this;
    }

    public withScale(scale: number): BuildingData {
        this.scale = scale;
        return this;
    }

    public withBuilder(builder: CallableFunction) {
        this.builder = builder;
        return this;
    }

    public withPrice(price: any) {
        this.price.gold = price.gold;
        this.price.wood = price.wood;
        this.price.stone = price.stone;
        this.price.bronze = price.bronze;

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
