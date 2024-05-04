class Chunk {
    constructor(scene, x, y) {
        this.x = x
        this.y = y
        this.scene = scene
        
        this.active = true
        this.scene.activeChunks++;
        
        this.size = 1500;
        this.locationX = x*this.size
        this.locationY = y*this.size
        this.physics = this.scene.physics

        this.physicsObject = this.scene.add.graphics();
        
        this.chunkSeed = this.scene.seed * this.x * this.y
        this.fieldAmount = Math.round((this.chunkSeed*30)%4) + 3
        this.fieldLocations = []

        for (let i = 0; i < this.fieldAmount; i++) {
            this.fieldLocations[i] = [(this.chunkSeed * i * 20000) % this.size, (this.chunkSeed * i * 20000) % this.size]
        }

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

        for (let i  = 0; i < this.fieldLocations.length; i++) {
            this.fields[this.fields.length] = new Field(physics, "gravityField", this.locationX + this.fieldLocations[i][0],this.locationY + this.fieldLocations[i][1])
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