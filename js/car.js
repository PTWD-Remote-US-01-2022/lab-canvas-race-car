class Car {
    constructor(ctx) {
        this.ctx = ctx;
        this.carHeight = 100
        this.carWidth = 80
        this.x = canvas.width / 2
        this.y = canvas.height - this.carHeight
        this.carImg = new Image()
        this.carImg.src = '../images/car.png'
    }

    drawCar = () => {
        this.ctx.drawImage(this.carImg,this.x,this.y,this.carWidth,this.carHeight)
    }

    controls = (code) => {
        if (code === 'ArrowLeft') this.x -= 10
        if(code === 'ArrowRight') this.x += 10
    }
}