import "phaser"
import { Player } from "src/sprites/player";

const STATUS_OK = "ok";
const STATUS_PENDING = "pe";
const STATUS_MOVING = "mv";
const VELOCITY = 900;

export class MovementOrder {

    private static status: string = STATUS_OK;
    private static x: number;
    private static y: number;

    public static moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.status = STATUS_PENDING;
    }

    public static move(player: Player) {
        if (MovementOrder.status != STATUS_PENDING) {
            return;
        }

        MovementOrder.status = STATUS_MOVING;
        player.scene.physics.moveTo(player, MovementOrder.x, MovementOrder.y, VELOCITY);
    }

    public static stop(player: Player) {
        if (MovementOrder.status != STATUS_MOVING) {
            return;
        }

        let distance = Phaser.Math.Distance.Between(
            player.x,
            player.y,
            MovementOrder.x,
            MovementOrder.y);

        if (player.body.speed > 0) {
            if (distance < 50) {
                player.body.reset(MovementOrder.x, MovementOrder.y);
                MovementOrder.status = STATUS_OK;
            }
        }
    }

}
