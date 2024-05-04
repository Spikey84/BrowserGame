function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(Math.abs(x1-x2), 2) + Math.pow(Math.abs(y1-y2), 2))
}

function getAngleFromPosition(x, y) {
    if(x >= 0 && y >= 0) {
        return Math.acos(x)
    } else if(x <= 0 && y >= 0) {
        return Math.acos(y) + Math.PI/2
    } else if(x <= 0 && y <= 0) {
        return Math.acos(-x) + Math.PI
    } else if(x >= 0 && y <= 0) {
        return Math.asin(x) + Math.PI*1.5
    }
}

function getAngleTowardsPoint(originX, originY, pointX, pointY) {
    let distance = Math.sqrt(Math.pow(Math.abs(originX-pointX), 2) + Math.pow(Math.abs(originY-pointY), 2))
    if (distance == 0 ) return null;
    let scaledX = (originX-pointX == 0) ? 0 : (Math.abs(originX-pointX)*(1/distance)) * ((pointX-originX) / Math.abs(pointX-originX))
    let scaledY = (originY-pointY == 0) ? 0 : (Math.abs(originY-pointY)*(1/distance)) * ((pointY-originY) / Math.abs(pointY-originY))
    return getAngleFromPosition(scaledX, scaledY)
}

//Types:
//  expelField:
//      Pushes the sprite in the direction of the arrow.
//  GravityField:
//      Pulls the sprite towards the center of the field.
class Field {
    expelField(player) {
        let fieldDirection = this.physicsObject.rotation + (Math.PI * 1.5)
        let distance = Math.sqrt(Math.pow(player.x - this.physicsObject.x, 2), Math.pow(player.y - this.physicsObject.y, 2))
    
        player.setVelocityX(player.body.velocity.x + Math.cos(fieldDirection) * 10/(distance+1));
        player.setVelocityY(player.body.velocity.y + Math.sin(fieldDirection) * 10/(distance+1));
    }

    gravityField(player) {
        let angle = getAngleTowardsPoint(player.x, player.y, this.physicsObject.x, this.physicsObject.y)
        let distance = Math.sqrt(Math.pow(player.x - this.physicsObject.x, 2), Math.pow(player.y - this.physicsObject.y, 2))

        let speedFactor = 2
        player.setVelocityX(player.body.velocity.x + Math.cos(angle) * speedFactor);
        player.setVelocityY(player.body.velocity.y + Math.sin(angle) * speedFactor);
    }

    constructor(physics, type, locationX, locationY) {
        if (type == "expelField") {
            this.callbackFunction = this.expelField;
            this.physicsObject = physics.add.image(locationX, locationY, 'posArrowField').setScale(0.1).refreshBody().setCircle(400).setOffset(400,400)
            this.physicsObject.rotation = (Math.random() * 100) % (2 * Math.PI)
        } else if(type == "gravityField") {
            this.callbackFunction = this.gravityField;
            this.physicsObject = physics.add.image(locationX, locationY, 'negArrowField').setScale(0.5).refreshBody().setCircle(400).setOffset(400,400)
        }
    }

    destroy() {
        this.physicsObject.destroy()
    }
}