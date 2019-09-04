export class Splash extends Phaser.State {
    private loaderBg: Phaser.Sprite;
    private loaderBar: Phaser.Sprite;

    preload () {
      this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
      this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
      this.centerObjects([this.loaderBg, this.loaderBar]);
  
      this.load.setPreloadSprite(this.loaderBar);

      // load assets
      this.load.atlasXML('tileset', 'assets/tileset/all.png', 'assets/tileset/all.xml');
    }
    
    create () {
      
      this.state.start('Game');
    }

    private centerObjects(objects:any) {
      objects.forEach((object:any) => {
        object.anchor.setTo(0.5);
      })
    }
}