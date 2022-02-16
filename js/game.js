class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.road = new Image();
    this.road.src = '../images/road.png';
    this.car = new Car(this.ctx);
    this.frame = 0;
    this.obstacles = [];
    this.score = 0;
  }

  createObstacle = () => {
    this.obstacles.push(new Obstacle(this.ctx));
  };

  drawRoad = () => {
    this.ctx.drawImage(this.road, 0, 0, canvas.width, canvas.height);
  };

  checkCollision = (obstacle, idx, gameId) => {
    if (
      this.car.x + this.car.carWidth > obstacle.x &&
      obstacle.x + obstacle.obsWidth > this.car.x &&
      this.car.y + this.car.carHeight > obstacle.y &&
      obstacle.y + obstacle.obsHeight > this.car.y
    ) {
      this.obstacles.splice(idx, 1);
      cancelAnimationFrame(gameId);
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(0, canvas.height / 4, canvas.width, canvas.height / 2);
      this.ctx.fillStyle = 'red';
      this.ctx.fillText(`Game Over!!!`, 30, canvas.height / 2);
    }
  };

  handleScore = (obstacle, idx) => {
    if (obstacle.y > canvas.height) {
      this.obstacles.splice(idx, 1);
      this.score++;
    }
  };

  drawEverything = () => {
    let gameId = requestAnimationFrame(this.drawEverything);
    this.drawRoad();

    this.car.drawCar();
    this.obstacles.forEach((obstacle, idx) => {
      obstacle.drawObstacle();
      obstacle.moveObstacle();
      this.checkCollision(obstacle, idx, gameId);
      this.handleScore(obstacle, idx);
    });
    this.frame++;
    if (this.frame % 50 === 0) this.createObstacle();
    this.ctx.fillStyle = 'red';
    this.ctx.font = '50px Verdana';
    this.ctx.fillText(`Score: ${this.score}`, 10, 50);
  };
}
