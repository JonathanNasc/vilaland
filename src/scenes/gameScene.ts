import "phaser";
import { Player } from "src/sprites/player";
import { constWorld, tile } from "src/utils/gameConfigurations"
import { DefaultObjectsGenerator } from "src/commands/defaultObjectsGenerator";
import { InteractiveArea } from "src/sprites/interactiveArea";
import { Resources } from "src/components/resources";
import { Hostel } from "src/sprites/hostel";
import { Building } from "src/components/building";

const doc = document.documentElement;

export class GameScene extends Phaser.Scene {
  public buildings: Building[] = [];
  
  private player: Player;
  private interactivearea: InteractiveArea;
  private keys: any;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void { }

  preload(): void {
    this.load.atlasXML('tileset', 'assets/tileset/all.png', 'assets/tileset/all.xml');
  }

  create(): void {
    this.add.tileSprite(0, 0, constWorld * 2, constWorld * 2, 'tileset', 'grass');
    DefaultObjectsGenerator.makeMainStreet(this);

    //testing sprites
    this.buildings.push(new Hostel(this, constWorld / 2 - tile, tile * 7 - tile /2));

    //menu bar
    Resources.init(this);
    this.keys = this.input.keyboard.addKeys('G,S,W,B');//TODO remove it

    this.player = new Player(this, constWorld / 2, 0, 'player_red');
    this.interactivearea = new InteractiveArea(this, -tile*3, -tile*3);
    this.setWorldAndCamera();
  }

  update(time: any): void {
    this.player.update();
    this.interactivearea.update(this);

    if (this.keys.G.isDown) {
      Resources.gold.add(10);
    }
  }

  private setWorldAndCamera(): void {
    this.physics.world.setBounds(0, 0, constWorld, constWorld);
    this.cameras.main.setBounds(0, 0, constWorld, constWorld);
    this.physics.world.setBoundsCollision();
    this.cameras.main.startFollow(this.player, false, 0.05, 0.05);
  }
};
