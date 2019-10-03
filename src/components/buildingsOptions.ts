import { BuildingData } from "./buildingData"

export const buildingsOptionsData = {
    street: BuildingData.create("Street", "street_crossing_t", 0.6)
        .gold(0)
        .wood(12)
        .stone(0)
        .bronze(0)
    ,
    hostel: BuildingData.create("Hostel", "hostel", 0.8)
        .gold(1)
        .wood(10)
        .stone(5)
        .bronze(0)
    ,
    store: BuildingData.create("Store", "store", 0.9)
        .gold(1)
        .wood(5)
        .stone(10)
        .bronze(2)
    ,
    tavern: BuildingData.create("Tavern", "tavern", 0.8)
        .gold(1)
        .wood(10)
        .stone(10)
        .bronze(5)
    ,
    shed: BuildingData.create("Shed", "shed", 0.6)
        .gold(0)
        .wood(10)
        .stone(15)
        .bronze(5)
    ,
    church: BuildingData.create("Church", "church_base", 0.8)
        .gold(3)
        .wood(15)
        .stone(15)
        .bronze(10)
}
