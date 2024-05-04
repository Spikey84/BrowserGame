class Chunk {
    constructor(scene, x, y) {
        this.x = x
        this.y = y
        this.seed = Math.random()

        this.active = true
        scene.activeChunks++;
        this.scene = scene

        this.size = 1500;
        this.locationX = x*this.size
        this.locationY = y*this.size
        this.physics = scene.physics


        this.physicsObject = this.scene.add.graphics();
        this.generateContents(scene.physics);
    }

    generateContents(physics) {
        //top
        this.physicsObject.lineBetween(this.locationX,this.locationY,this.locationX + 1500,this.locationY);
        //bottom
        this.physicsObject.lineBetween(this.locationX,this.locationY + 1500,this.locationX + 1500,this.locationY + 1500);
        //left
        this.physicsObject.lineBetween(this.locationX,this.locationY,this.locationX,this.locationY + 1500);
        //right
        this.physicsObject.lineBetween(this.locationX + 1500,this.locationY,this.locationX + 1500,this.locationY + 1500);
        //center
        this.physicsObject.lineBetween(this.locationX, this.locationY, this.locationX + 1500, this.locationY + 1500);

        this.fields = []
        let locations = [[200, 200], [600, 600], [ 900, 200]]

        for (let i  = 0; i < locations.length; i++) {
            this.fields[this.fields.length] = new Field(physics, "gravityField", this.locationX + locations[i][0],this.locationY + locations[i][1])
        }
    }

    isPlayerInChunk(player) {
        if (player.x + player.radius < this.locationX) return false;
        if (player.y + player.radius < this.locationY) return false;
        if (player.x - player.radius > this.locationX + this.size) return false;
        if (player.y - player.radius > this.locationY + this.size) return false;
        return true;
    }

    update(physics, player) {
        for (let i = 0; i < this.fields.length; i++) {
            let field = this.fields[i]
            if (physics.overlap(player, field.physicsObject)) {
                field.callbackFunction(player)
            }
        }
    }

    removeContents() {
        for (let i = 0; i < this.fields.length; i++) {
            this.fields[i].destroy()
        }
        this.fields = []
        this.physicsObject.clear()
    }

    setActive(bool) {
        if (bool && !this.active) {
            this.generateContents(this.physics)
            this.active = true
            this.scene.activeChunks++;
        } else if(!bool && this.active) {
            this.removeContents()
            this.active = false
            this.scene.activeChunks--;
        }
    }
}