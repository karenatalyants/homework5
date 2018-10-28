  const canvas = document.getElementById('board');
  const context = canvas.getContext('2d');

  canvas.width = 1400;
  canvas.height = 700;


  context.fillStyle = '#bbdefb';
  context.fillRect(0, 0, canvas.width, canvas.height);

  //adding images for good and bad guys
  const goodGuyImg = new Image();
  goodGuyImg.src = './chicken.png';

  const badGuyImg = new Image();
  badGuyImg.src = './cat.png';


  //creating the game structure
  const gameChar = {
    hero: {},
    enemies: [],
  };


  //adding the event listeners


  const leftKey = 37;
  const upKey = 38;
  const rightKey = 39;
  const downKey = 40;




  // returns a random number between 1 and the given number inclusively
  const rand = function(num) {
    return Math.floor(Math.random() * num) + 1;
  };

  /* make directions of enemies random by getting a 1 or -1 from
  below and multiplying the new enemies' deltas */

  const moveDirCoeff = function() {
    rand(2);
    let result = rand(2);

    if (result === 1) {
      return 1;
    }
    if (result === 2) {
      return -1;
    }
  }

  /*
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
  */



  // building the house
  let house = {};
  const createHouse = function() {
    house.width = 200;
    house.height = 200;
    house.color = '#1a237e';
    house.x = 0;
    house.y = canvas.height - house.height;
    house.draw = function() {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    };
    return house;
  }


  //hero builder

  const createHero = function() {
    let obj = gameChar.hero;
    obj.width = 100;
    obj.height = 110;
    obj.x = 0;
    obj.y = canvas.height - obj.height;
    obj.xStep = 15;
    obj.yStep = 15;
    obj.image = goodGuyImg;
    obj.draw = function() {
      context.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
    };
    obj.update = function(key) {
      if (key === 'moveUp') {
        obj.y = obj.y - obj.yStep;
      }
      if (key === 'moveDown') {
        obj.y = obj.y + obj.yStep;
      }
      if (key === 'moveLeft') {
        obj.x = obj.x - obj.xStep;
      }
      if (key === 'moveRight') {
        obj.x = obj.x + obj.xStep;
      }
    };
  }


  //enemy builder
  const createEnemies = function(count, canvasWidth, canvasHeight) {

    let i = 0;
    for (let i = 0; i < count; i++) {
      gameChar.enemies[i] = {
        x: rand(canvasWidth - 50),
        y: rand(canvasHeight - 50),
        xDelta: 2 * moveDirCoeff(),
        yDelta: 2 * moveDirCoeff(),
        width: 50,
        height: 50,
        image: badGuyImg,
        reverseDirX: function() {
          this.xDelta = this.xDelta * (-1);
        },
        reverseDirY: function() {
          this.yDelta = this.yDelta * (-1);
        },
        draw: function() {
          context.fillStyle = this.color;
          context.drawImage(this.image, this.x, this.y, this.width, this.height);
        },
        collisionCheck: function() {
          let hero = gameChar.hero;

          //overlap from left
          if (this.x - hero.x + hero.width < 0 && this.y - hero.y + hero.height < 0) {
            console.log('you lost my friend');
          }
          //overlap from left
          if (this.x - hero.x + hero.width < 0 && this.y - hero.y + hero.height < 0) {
            console.log('you lost my friend');
          }
        },
        update: function() {
          context.fillStyle = '#bbdefb';
          context.fillRect(0, 0, canvas.width, canvas.height);

          //change direction when meeting the border of the canvas
          if (this.x >= canvas.width - this.width || this.x <= 0) {
            this.reverseDirX();
          }
          if (this.y >= canvas.height - this.height || this.y <= 0) {
            this.reverseDirY();
          }

          //changing direction when hitting the house or work borders

          //right border
          if (this.y + this.height >= canvas.height - house.height && this.x <= house.width) {
            this.reverseDirX();
          }


          //upper border
          if (this.x <= house.width && this.y + this.height >= canvas.height - house.height) {
            this.reverseDirY();
          }


          //movement
          this.x = this.x + this.xDelta;
          this.y = this.y + this.yDelta;
        }
      }
    }
    return gameChar.enemies;
  };

  //create all the stuff

  createEnemies(5, canvas.width, canvas.height);
  createHouse();
  createHero();

  console.log(gameChar.hero);

  console.log(gameChar.enemies);


  const enemiesDraw = function() {
    for (let d = 0; d < gameChar.enemies.length; d++) {
      const obj = gameChar.enemies[d];
      obj.draw();
    }
  }

  const enemiesUpdate = function() {
    for (let d = 0; d < gameChar.enemies.length; d++) {
      const obj = gameChar.enemies[d];
      obj.update();
    }
  }

  const enemiesCollisionCheck = function() {
    for (let d = 0; d < gameChar.enemies.length; d++) {
      const obj = gameChar.enemies[d];
      obj.collisionCheck();
    }
  }

  const houseDraw = function() {
    for (let d = 0; d < gameChar.enemies.length; d++) {
      const obj = house;
      house.draw();
    }
  }

  const heroDraw = function() {
    const obj = gameChar.hero;
    obj.draw();
  }

  const heroUpdate = function() {
    const obj = gameChar.hero;
    obj.update();
  }

  //moving the hero

  document.addEventListener('keydown', function(event) {
    if (event.keyCode === upKey) {
      let obj = gameChar.hero;
      obj.update('moveUp');
    }
  }, false);

  document.addEventListener('keydown', function(event) {
    if (event.keyCode === downKey) {
      let obj = gameChar.hero;
      obj.update('moveDown');
    }
  }, false);

  document.addEventListener('keydown', function(event) {
    if (event.keyCode === leftKey) {
      let obj = gameChar.hero;
      obj.update('moveLeft');
    }
  }, false);

  document.addEventListener('keydown', function(event) {
    if (event.keyCode === rightKey) {
      let obj = gameChar.hero;
      obj.update('moveRight');
    }
  }, false);




  const playStop = function(val) {
    if (val === 'true') {
      const loop = function() {
        enemiesUpdate();
        enemiesDraw();
        enemiesCollisionCheck();
        houseDraw();
        heroDraw();
        heroUpdate();

        requestAnimationFrame(loop);
      };

      loop();
    }
    if (val === 'false') {
      return;
    }
  }

  playStop('true');