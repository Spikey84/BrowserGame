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