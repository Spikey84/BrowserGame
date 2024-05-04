class ChunkManager {
    constructor(scene, player) {
        this.scene = scene
        this.player = player

        this.chunks = []            
        for (let i = -2; i < 2;i++) {
            for (let j = -2; j < 2; j++) {
                if (typeof(this.chunks[i]) == "undefined") this.chunks[i] = []
                this.chunks[i][j] = new Chunk(scene, i , j)
            }
        }
    }

    updateChunks() {
        for (let i  = -100; i < this.chunks.length; i++) {
            if (typeof(this.chunks[i]) == "undefined") continue
            for (let j = -100; j < this.chunks[i].length; j++) {
                if (typeof(this.chunks[i][j]) == "undefined") continue;
                let chunk = this.chunks[i][j]

                // if chunk is inactive but close to the player then activate it and if a chunk is active and far away deactiveate it and do not check if player is in it
                if (chunk.active) {
                    if (distance(chunk.locationX, chunk.locationY, this.player.x, this.player.y) > chunk.size*2) {
                        chunk.setActive(false)
                        continue;
                    }
                }

                //if player is not in chunk stop here
                if (!chunk.isPlayerInChunk(this.player)) continue;

                // Generate new chunks
                for (let a = i - 2; a < i + 2;a++) {
                    for (let b = j - 2; b < j + 2; b++) {
                        //Allows for 2d array
                        if (typeof(this.chunks[a]) == "undefined") this.chunks[a] = []
                        //checks if chunk exists
                        if (typeof(this.chunks[a][b]) != "undefined") {
                            //activates the chunk if it exists
                            this.chunks[a][b].setActive(true)
                            continue;
                        }
                        //creates the chunk if it does not exist
                        this.chunks[a][b] = new Chunk(this.scene, a , b)
                    }
                }
                chunk.update(this.scene.physics, this.player)
            }
        }
    }
}