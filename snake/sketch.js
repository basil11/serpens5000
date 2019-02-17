let snake;
let w;

function setup() {
  createCanvas(400, 400);
  frameRate(5);
  w = width / 20;
  snake = new Snakey();
  food = new FoodClass();
}

function draw() {
  background("#FAFF73");
  food.show();
  food.disappear();
  snake.show();
  snake.move();
  snake.teleport();
}

function Snakey() {
  this.x = 0;
  this.y = 0;
  this.speedx = 0;
  this.speedy = 0;
  this.foodcounter = 0;
  this.tail = [];

  this.show = function() {
    fill("#6BF776");
    rect(this.x, this.y, w, w);

    for (let i = 0; i < this.tail.length; i++) {
      fill("#6BF776");
      rect(this.tail[i].x, this.tail[i].y, w, w);
    }
  };

  this.dir = function(dirx, diry) {
    this.speedx = dirx;
    this.speedy = diry;
  };

  this.move = function() {
    for (let i = 0; i < this.foodcounter; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.foodcounter - 1].x = this.x;
    this.tail[this.foodcounter - 1].y = this.y;
    this.x += this.speedx * w;
    this.y += this.speedy * w;
  };

  this.teleport = function() {
    if (this.x < 0) {
      this.x = width;
    }
    if (this.x > width) {
      this.x = -w;
    }
    if (this.y < 0) {
      this.y = height;
    }
    if (this.y > height) {
      this.y = -w;
    }
  };

  this.grow = function() {
    if (this.x == food.x && this.y == food.y) {
      fill("#6BF776");
      rect(this.x, this.y, w, w);
    }
  };
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
  }
  if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0);
  }
  if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1);
  }
  if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0);
  }
}

function FoodClass() {
  this.c = int(random(19));
  this.d = int(random(19));
  this.x = w * this.c;
  this.y = w * this.d;

  this.show = function() {
    fill("#FF5A5A");
    rect(this.x, this.y, w, w);
  };

  this.disappear = function() {
    if (this.x == snake.x && this.y == snake.y) {
      this.c = int(random(19));
      this.d = int(random(19));
      this.x = w * this.c;
      this.y = w * this.d;
      rect(this.x, this.y, w, w);
      snake.foodcounter++;
    }
  };
}
