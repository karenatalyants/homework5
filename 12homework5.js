  const canvas = document.getElementById('');
  const context = canvas.getContext('2d');




  context.fillStyle = '#bbdefb';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // returns a random number between 1 and the given number inclusively
  const rand = function(num) {
    return Math.floor(Math.random() * num) + 1;
  };

  // returns a random hexadecimal color code
  const colorRandomizer = function() {
    const hexColorArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    let color = '#';
    const random15 = function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }
    for (let j = 1; j <= 6; j++) {
      color = color + hexColorArr[random15(0, 15)];
    }
    return color;
  };


  let enemies = [];

  // creates the boxes, of random position and random color, as many as the number given
  const createBoxes = function(count, canvasWidth, canvasHeight) {

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let i = 0;
    for (let i = 0; i < count; i++) {
      enemies[i] = {
        x: rand(canvasWidth - 50),
        y: rand(canvasHeight - 50),
        xDelta: 5,
        yDelta: 5,
        width: 50,
        height: 50,
        color: colorRandomizer(),
        //the below appeared to put the boxes into Brownian motion haha (call this method in update right after the movement comment)
        /*randDir: function() {
          if (rand(2) === 1) {
            this.xDelta = this.xDelta * (-1);
          }
          if (rand(2) === 2) {
            this.yDelta = this.yDelta * (-1);
          }
        },*/
        reverseDirX: function() {
          this.xDelta = this.xDelta * (-1);
        },
        reverseDirY: function() {
          this.yDelta = this.yDelta * (-1);
        },
        draw: function() {
          context.fillStyle = this.color;
          context.fillRect(this.x, this.y, this.width, this.height);
        },
        update: function() {
          context.fillStyle = '#bbdefb';
          context.fillRect(0, 0, canvasWidth, canvasHeight);

          //change direction when meeting the border of the canvas
          if (this.x >= canvasWidth - this.width || this.x <= 0) {
            this.reverseDirX();
            this.color = colorRandomizer();
          }
          if (this.y >= canvasHeight - this.height || this.y <= 0) {
            this.reverseDirY();
            this.color = colorRandomizer();
          }
          //movement
          this.x = this.x + this.xDelta;
          this.y = this.y + this.yDelta;
        }
      }
    }
    return enemies;
  };


  createBoxes(5, 1400, 700);

  console.log(enemies);


  const draw = function() {
    for (let d = 0; d < enemies.length; d++) {
      const obj = enemies[d];
      obj.draw();
    }
  }

  const update = function() {
    for (let d = 0; d < enemies.length; d++) {
      const obj = enemies[d];
      obj.update();
    }
  }

  const loop = function() {
    update();
    draw();

    requestAnimationFrame(loop);
  };

  loop()