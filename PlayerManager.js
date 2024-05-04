class PlayerManager {
    constructor(scene, name, fuelLimit, size, startingX, startingY) {
        this.player = scene.physics.add.sprite(startingX, startingY, 'arrowCircle').setScale(0.05);
        this.player.radius = 200*0.05
        this.player.setCircle(400)
        this.player.setOffset(400, 400)
        this.player.setVelocityX(0)
        this.player.setVelocityY(0)

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.fuelAmount = fuelLimit;
        this.scene = scene

        this.scene.input.setPollAlways();
        this.scene.input.on("pointermove", this.followPointer, this)
    }

    updateControls() {
        let pointer = this.scene.input.activePointer;
        if (pointer.isDown) {
            if (this.fuelAmount > 0) {
                this.fuelAmount = this.fuelAmount - 0.5
                this.scene.scene.get("ui").updateFuelBar(this.fuelAmount);

                let radians = this.player.rotation + (Math.PI * 1.5)
            
                this.player.setVelocityX(this.player.body.velocity.x + Math.cos(radians) * 1);
                this.player.setVelocityY(this.player.body.velocity.y + Math.sin(radians) * 1);
            }
        }
    }

    followPointer(pointer) {
        //player is at 800, 400
        this.player.rotation = getAngleTowardsPoint(800, 400, pointer.x, pointer.y) - (Math.PI * 1.5)
    }

    updateFuel() {
        if (this.fuelAmount < 100) {
            this.fuelAmount = this.fuelAmount + 0.1
            this.scene.scene.get("ui").updateFuelBar(this.fuelAmount);
        }
    }
}