export class ArcadeMovements {
    public static move(sprite: Phaser.Sprite, cursor: Phaser.CursorKeys) {
        sprite.body.setZeroVelocity();
        let velecity = 300;
        let halfVelocity = velecity / 2;
        sprite.body.angle = 0;

        if (cursor.left.isDown) {
            sprite.body.moveLeft(velecity);
            sprite.body.angle = 340;
        } else if (cursor.right.isDown) {
            sprite.body.moveRight(velecity);
            sprite.body.angle = 20;
        }

        if (cursor.up.isDown) {
            sprite.body.angle = 0;
            sprite.body.moveUp(velecity);
            sprite.loadTexture('tileset', 'player_red_back');
        } else if (cursor.down.isDown) {
            sprite.body.angle = 0;
            sprite.body.moveDown(velecity);
            sprite.loadTexture('tileset', 'player_red');
        }
    }
}