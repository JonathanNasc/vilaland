import { ResourcesGenerator } from './../commands/resourcesGenerator';
import { Player } from './../sprites/player';

export class Game extends Phaser.State {
    private player: Player;
    private grass: Phaser.TileSprite;
    private mainStreet: Phaser.TileSprite;

    create() {
        this.grass = this.add.tileSprite(0, 0, 2688, 2688, 'tileset', 'grass');
        this.world.setBounds(0, 0, 2688, 2688);
        this.mainStreet = this.add.tileSprite(1280, 0, 128, 2688, 'tileset', 'street_vertical');
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.player = new Player(this.game, this.world.centerX, 50, 'tileset', 'player_red');
        this.add.existing(this.player);
        this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        ResourcesGenerator.generate(this.game);
    }

    render() {
        this.game.debug.spriteInfo(this.player, 32, 32)
    }

}