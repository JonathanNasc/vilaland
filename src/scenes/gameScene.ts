import "phaser";
import { Player } from "src/sprites/player";
import { constWorld, tile } from "src/utils/gameConfigurations"
import { DefaultObjectsGenerator } from "src/commands/defaultObjectsGenerator";
import { InteractiveArea } from "src/sprites/interactiveArea";
import { CountersRepo } from "src/components/countersRepo";
import { Hostel } from "src/sprites/hostel";
import { Building } from "src/components/building";
import { Resource } from "src/components/resource";
import { OptionsToBuildDialog } from "src/components/dialogs/optionsToBuildDialog";
import { Street } from "src/sprites/street";

const doc = document.documentElement;

export class GameScene extends Phaser.Scene {
  public buildings: Building[] = [];
  public resources: Resource[] = [];
  public streets: Street[] = [];
  public player: Player;
  public optionsToBuild: OptionsToBuildDialog;
  
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
    this.streets = DefaultObjectsGenerator.makeMainStreet(this);
    this.resources = DefaultObjectsGenerator.makeRandomResources(this);
    this.optionsToBuild = new OptionsToBuildDialog(this);
    this.player = new Player(this, constWorld / 2, 0, 'player_red');
    this.interactivearea = new InteractiveArea(this, -tile*3, -tile*3);
    this.setWorldAndCamera();
    CountersRepo.init(this);
  }

  update(time: any): void {
    this.player.update();
    this.interactivearea.update(this);
  }

  private setWorldAndCamera(): void {
    this.physics.world.setBounds(0, 0, constWorld, constWorld);
    this.cameras.main.setBounds(0, 0, constWorld, constWorld);
    this.physics.world.setBoundsCollision();
    this.cameras.main.startFollow(this.player, false, 0.05, 0.05);
  }
};
