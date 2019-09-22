import "phaser";
import { Resource } from "src/components/resource"
import { ResourceType } from "src/components/resourceType";
import { Random } from "src/utils/random";
import { CountersRepo } from "src/components/countersRepo";

const valueMinedPerClick = 3;
const treeTypes = [
  new ResourceType('tree1', 7),
  new ResourceType('tree2', 7),
]

export class Tree extends Resource {

  public static generate(scene: Phaser.Scene, totalValue: number): Resource[] {
    const types = [treeTypes[Random.int(0, treeTypes.length)]]
    return Resource.generateResources(scene, totalValue, types, Tree.create);
  }

  public static create(scene: Phaser.Scene, x: number, y: number, type: ResourceType): Resource {
    return new Tree(scene, x, y, type);
  }

  protected onClick() {
    this.collet();
  }

  private collet() {
    const minedValue = this.value >= valueMinedPerClick ? valueMinedPerClick : this.value;
    this.value -= minedValue;
    CountersRepo.wood.add(minedValue);
    if (this.value < 1) {
      this.destroy();
    }
  }

}
