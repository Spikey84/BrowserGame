class UI extends Phaser.Scene {


    preload () {
        console.log("Ui Loaded")
    }

    create () {
        
        this.fuelBar = this.add.graphics();

        this.fuelBar.fillStyle(0xded9ff, 1)
        this.fuelBar.fillRect(10, 10, 200, 20)

        this.fuelBar.fillStyle(0x785d24, 1)
        this.fuelBar.fillRect(10, 10, 100*2, 20)
        this.updateFuelBar(100)
    }
    updateFuelBar(fuelAmount) {
        this.fuelBar.fillStyle(0xded9ff, 1)
        this.fuelBar.fillRect(10, 10, 200, 20)
        this.fuelBar.fillStyle(0x785d24, 1)
        this.fuelBar.fillRect(10, 10, fuelAmount*2, 20)
    }
}

const uiConfig = {
    key: "UI",
    active: true,
    visible: true,
    type: Phaser.AUTO,
    Scene: UI,
    width: 1600,
    height: 800,
};



