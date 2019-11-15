import { BuildingData } from "./buildingData"
import { Hostel, hostelBuildingKey } from "src/sprites/hostel";
import { Church, churchBuildingKey } from "src/sprites/church";
import { Tavern, tavernBuildingKey } from "src/sprites/tavern";
import { Street, streetBuildingKey } from "src/sprites/street";

export const storeBuildingKey = "store";
export const shedBuildingKey = "shed";

export const buildingsOptionsData = {
    street: BuildingData.create()
        .withTitle("Street")
        .withBuildingKey(streetBuildingKey)
        .withScale(0.6)
        .withBuilder(Street.create)
        .withPrice({
            gold: 0,
            wood: 12,
            stone: 0,
            bronze: 0
        })
    ,
    hostel: BuildingData.create()
        .withTitle("Hostel")
        .withBuildingKey(hostelBuildingKey)
        .withScale(0.68)
        .withBuilder(Hostel.create)
        .withPrice({
            gold: 1,
            wood: 10,
            stone: 5,
            bronze: 0
        })
    ,
    store: BuildingData.create()
        .withTitle("Store")
        .withBuildingKey(storeBuildingKey)
        .withScale(0.9)
        .withBuilder(Hostel.create)
        .withPrice({
            gold: 1,
            wood: 5,
            stone: 10,
            bronze: 2
        })
    ,
    tavern: BuildingData.create()
        .withTitle("Tavern")
        .withBuildingKey(tavernBuildingKey)
        .withScale(0.8)
        .withBuilder(Tavern.create)
        .withPrice({
            gold: 1,
            wood: 10,
            stone: 10,
            bronze: 5
        })
    ,
    shed: BuildingData.create()
        .withTitle("Shed")
        .withBuildingKey(shedBuildingKey)
        .withScale(0.6)
        .withBuilder(Hostel.create)
        .withPrice({
            gold: 0,
            wood: 10,
            stone: 15,
            bronze: 5
        })
    ,
    church: BuildingData.create()
        .withTitle("Church")
        .withBuildingKey(churchBuildingKey)
        .withScale(0.8)
        .withBuilder(Church.create)
        .withPrice({
            gold: 3,
            wood: 15,
            stone: 15,
            bronze: 10
        })
}
