import "phaser"
import { MovementOrder } from "src/commands/movementOrder";
import { InteractiveArea } from "./interactiveArea";
import { zStreet } from "src/utils/depth";
import { GridPosition } from "src/components/gridPosition";
import { GameScene } from "src/scenes/gameScene";

export const streetBuildingKey = "street_crossing_t";

export class Street extends Phaser.GameObjects.Sprite {

  static readonly KEY_VERTICAL: string = 'vertical';
  static readonly KEY_VERTICAL_RIGHT: string = 'vertical_right';
  static readonly KEY_VERTICAL_LEFT: string = 'vertical_left';
  static readonly KEY_HORIZONTAL: string = 'horizontal';
  static readonly KEY_HORIZONTAL_UP: string = 'horizontal_up';
  static readonly KEY_HORIZONTAL_DOWN: string = 'horizontal_down';
  static readonly KEY_RIGHT_DOWN: string = 'right_down';
  static readonly KEY_LEFT_DOWN: string = 'left_down';
  static readonly KEY_RIGHT_UP: string = 'right_up';
  static readonly KEY_LEFT_UP: string = 'left_up';
  static readonly KEY_LEFT: string = 'left';
  static readonly KEY_RIGHT: string = 'right';
  static readonly KEY_UP: string = 'up';
  static readonly KEY_DOWN: string = 'down';
  static readonly KEY_CROSSING: string = 'crossing';

  private static readonly FRAME_ROADWAY_ALLEY: string = 'roadway_alley';
  private static readonly FRAME_ROADWAY_STRAIGHT: string = 'roadway_straight';
  private static readonly FRAME_ROADWAY_CROSSING: string = 'roadway_crossing';
  private static readonly FRAME_ROADWAY_FORK: string = 'roadway_fork';
  private static readonly FRAME_ROADWAY_CORNER: string = 'roadway_corner';

  public gridPosition: GridPosition;
  public scene: GameScene;
  public key: string;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, 'tileset', 'roadway_straight');
    this.setKeyPosition(key);
    this.scene.add.existing(this);
    this.scene.streets.push(this);
    this.setInteractive({cursor: 'pointer'});
    this.setDepth(zStreet);
    this.gridPosition = GridPosition.byObject(this);
    this.on('pointerdown', this.onPointerDown);
  }

  public static create(scene: GameScene, x: number, y: number) {
    const pos: GridPosition = GridPosition.byCoordinates(x, y);
    if (!Street.isPositionAvailable(pos, scene.streets)) {
      return;
    }

    const adjacentSet: any = Street.getAdjacentSet(pos, scene.streets);
    let key = Street.getPositionKey(adjacentSet);
    key = Street.adjustKeyAndAdjacents(adjacentSet, key);
    
    return new Street(scene, x, y, key);
  }

  public static adjustKeyAndAdjacents(adjacentSet: any, key: string): string {    
    const adjacents: Array<Street> = Street.filterAdjacents(adjacentSet);
    const adjacent1 = adjacentSet[key];
    const countOfLength = <number> adjacents.length;
    adjacent1.setKeyPosition(Street.getNewKeyForAdjacent(key, adjacent1.key, 1));

    if (countOfLength == 1) {
      return key;
    }

    if (countOfLength == 2) {
      const adjacent2 = adjacents[0].key != adjacent1.key ? adjacents[0] : adjacents[1];
      adjacent2.setKeyPosition(Street.getNewKeyForAdjacent(key, adjacent2.key, 2))
      return key == Street.KEY_UP || key == this.KEY_DOWN ? Street.KEY_VERTICAL : Street.KEY_HORIZONTAL;
    }

    throw new Error("More then 2 adjacent streets is not expected");
  }

  public static isPositionAvailable(gridPosition: GridPosition, streets: any): boolean {
    const adjancentSet = Street.getAdjacentSet(gridPosition, streets);
    return <number> Street.filterAdjacents(adjancentSet).length == 1;
  }

  private static filterAdjacents(adjacentSet: any): Array<Street> {
    let adjacentsNotEmpty: Array<Street> = [];
    for (let key in adjacentSet) {
      if (adjacentSet[key]) {
        adjacentsNotEmpty.push(adjacentSet[key]);
      }
    }

    return adjacentsNotEmpty;
  }

  public setKeyPosition(key: string) {
    this.key = key;
    switch (key) {
      case Street.KEY_VERTICAL: return this.adjust(Street.FRAME_ROADWAY_STRAIGHT, 90);
      case Street.KEY_VERTICAL_RIGHT: return this.adjust(Street.FRAME_ROADWAY_FORK, 0);
      case Street.KEY_VERTICAL_LEFT: return this.adjust(Street.FRAME_ROADWAY_FORK, 180);
      case Street.KEY_HORIZONTAL: return this.adjust(Street.FRAME_ROADWAY_STRAIGHT, 0);
      case Street.KEY_HORIZONTAL_UP: return this.adjust(Street.FRAME_ROADWAY_FORK, 270);
      case Street.KEY_HORIZONTAL_DOWN: return this.adjust(Street.FRAME_ROADWAY_FORK, 90);
      case Street.KEY_RIGHT_DOWN: return this.adjust(Street.FRAME_ROADWAY_CORNER, 90);
      case Street.KEY_LEFT_DOWN: return this.adjust(Street.FRAME_ROADWAY_CORNER, 180);
      case Street.KEY_RIGHT_UP: return this.adjust(Street.FRAME_ROADWAY_CORNER, 0);
      case Street.KEY_LEFT_UP: return this.adjust(Street.FRAME_ROADWAY_CORNER, 270);
      case Street.KEY_LEFT: return this.adjust(Street.FRAME_ROADWAY_ALLEY, 0);
      case Street.KEY_RIGHT: return this.adjust(Street.FRAME_ROADWAY_ALLEY, 180);
      case Street.KEY_UP: return this.adjust(Street.FRAME_ROADWAY_ALLEY, 90);
      case Street.KEY_DOWN: return this.adjust(Street.FRAME_ROADWAY_ALLEY, 270);
      case Street.KEY_CROSSING: return this.adjust(Street.FRAME_ROADWAY_CROSSING, 0);
    }
  }

  private static getPositionKey(adjacentSet: any): string {
    for (let key in adjacentSet) {
      if (adjacentSet[key]) {
        return key;
      }
    }

    return null;
  }

  private static getAdjacentSet(pos: GridPosition, streets: any[]): {} {
    let adjacentStreetByKey: any = {};
    adjacentStreetByKey[Street.KEY_UP] = Street.getAdjacentStreet(streets, pos.row + 1, pos.column);
    adjacentStreetByKey[Street.KEY_LEFT] = Street.getAdjacentStreet(streets, pos.row, pos.column + 1);
    adjacentStreetByKey[Street.KEY_DOWN] = Street.getAdjacentStreet(streets, pos.row - 1, pos.column);
    adjacentStreetByKey[Street.KEY_RIGHT] = Street.getAdjacentStreet(streets, pos.row, pos.column - 1);
    return adjacentStreetByKey;
  }

  private static getAdjacentStreet(streets: any, row: number, column: number){
    let objects = GridPosition.filterObjectByPosition(streets, new GridPosition(row, column));
    if (objects.length == 0) {
      return null;
    }

    return objects[0];
  }

  private static getNewKeyForAdjacent(newStreetKey: string, currentAdjecentKey: string, adjacentNumber = 1): string {
    let keyByNumber = adjacentNumber == 1 ? Street.KEY_UP : Street.KEY_DOWN;
    if (newStreetKey == keyByNumber) {
      if (currentAdjecentKey == Street.KEY_HORIZONTAL) return Street.KEY_HORIZONTAL_UP;
      if (currentAdjecentKey == Street.KEY_UP) return Street.KEY_VERTICAL;
      if (currentAdjecentKey == Street.KEY_LEFT) return Street.KEY_RIGHT_UP;
      if (currentAdjecentKey == Street.KEY_RIGHT) return Street.KEY_LEFT_UP;
      if (currentAdjecentKey == Street.KEY_HORIZONTAL_DOWN) return Street.KEY_CROSSING;
      if (currentAdjecentKey == Street.KEY_RIGHT_DOWN) return Street.KEY_VERTICAL_RIGHT;
      if (currentAdjecentKey == Street.KEY_LEFT_DOWN) return Street.KEY_VERTICAL_LEFT;
    }

    keyByNumber = adjacentNumber == 1 ? Street.KEY_DOWN : Street.KEY_UP;
    if (newStreetKey == keyByNumber) {
      if (currentAdjecentKey == Street.KEY_HORIZONTAL) return Street.KEY_HORIZONTAL_DOWN;
      if (currentAdjecentKey == Street.KEY_DOWN) return Street.KEY_VERTICAL;
      if (currentAdjecentKey == Street.KEY_LEFT) return Street.KEY_RIGHT_DOWN;
      if (currentAdjecentKey == Street.KEY_RIGHT) return Street.KEY_LEFT_DOWN;
      if (currentAdjecentKey == Street.KEY_HORIZONTAL_UP) return Street.KEY_CROSSING;
      if (currentAdjecentKey == Street.KEY_RIGHT_UP) return Street.KEY_VERTICAL_RIGHT;
      if (currentAdjecentKey == Street.KEY_LEFT_UP) return Street.KEY_VERTICAL_LEFT;

    }

    keyByNumber = adjacentNumber == 1 ? Street.KEY_RIGHT : Street.KEY_LEFT;
    if (newStreetKey == keyByNumber) {
      if (currentAdjecentKey == Street.KEY_VERTICAL) return Street.KEY_VERTICAL_RIGHT;
      if (currentAdjecentKey == Street.KEY_RIGHT) return Street.KEY_HORIZONTAL;
      if (currentAdjecentKey == Street.KEY_UP) return Street.KEY_RIGHT_DOWN;
      if (currentAdjecentKey == Street.KEY_DOWN) return Street.KEY_RIGHT_UP;
      if (currentAdjecentKey == Street.KEY_VERTICAL_LEFT) return Street.KEY_CROSSING;
      if (currentAdjecentKey == Street.KEY_LEFT_UP) return Street.KEY_HORIZONTAL_UP;
      if (currentAdjecentKey == Street.KEY_LEFT_DOWN) return Street.KEY_HORIZONTAL_DOWN;
    }

    keyByNumber = adjacentNumber == 1 ? Street.KEY_LEFT : Street.KEY_RIGHT;
    if (newStreetKey == keyByNumber) {
      if (currentAdjecentKey == Street.KEY_VERTICAL) return Street.KEY_VERTICAL_LEFT;
      if (currentAdjecentKey == Street.KEY_LEFT) return Street.KEY_HORIZONTAL;
      if (currentAdjecentKey == Street.KEY_UP) return Street.KEY_LEFT_DOWN;
      if (currentAdjecentKey == Street.KEY_DOWN) return Street.KEY_LEFT_UP;
      if (currentAdjecentKey == Street.KEY_VERTICAL_RIGHT) return Street.KEY_CROSSING;
      if (currentAdjecentKey == Street.KEY_RIGHT_UP) return Street.KEY_HORIZONTAL_UP;
      if (currentAdjecentKey == Street.KEY_RIGHT_DOWN) return Street.KEY_HORIZONTAL_DOWN;
    }

    throw new Error(`No key mapped for adjacent street: {new: ${newStreetKey}, current: ${currentAdjecentKey}}`);
  }

  private onPointerDown(): void {
    MovementOrder.moveTo(this.x, this.y);
    InteractiveArea.setPosition(this.x, this.y);
  }

  private adjust(key: string, rotation: number): void {
    this.setFrame(key);
    this.setAngle(rotation);
  }

}
