import Phaser from "phaser";
const GROUND_KEY = "ground";
const DUDE_KEY = "dude";
const STAR_KEY = "star";
const BOMB_KEY = "bomb";
const STOPWATCH_KEY = "stopwatch";
import ScoreLabel from "./ScoreLabel.js";
import BombSpawner from "./BombSpawner.js";
import PlateformSpawner from "./PlateformSpawner.js";
import StopwatchSpawner from "./StopwatchSpawner.js";
import backgroundAsset from "../../assets/background.png";
import platformAsset from "../../assets/platform.png";
import starAsset from "../../assets/star.png";
import bombAsset from "../../assets/bomb.png";
import stopwatchAsset from "../../assets/stopwatch.png";
import dudeAsset from "../../assets/cyborg_v5.png";
import invisibleGroundAsset from "../../assets/invisible_ground.png";

class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player = undefined;
    this.cursors = undefined;
    this.scoreLabel = undefined;
    this.stars = undefined;
    this.bombSpawner = undefined;
    this.plateformSpawner = undefined;
    this.backgrounds = undefined;
    this.gameOver = false;
    this.text = undefined;
    this.countdown = undefined;
    this.ground = undefined;

    this.stopwatchSpawner = undefined;

    // timer
    this.textTime = undefined;
    this.countdown = undefined;

    // distance parcourue
    this.textDistance = undefined;
    this.distance = undefined;
  }

  preload() {
    this.load.image("background", backgroundAsset);
    this.load.image(GROUND_KEY, platformAsset);
    this.load.image("invisible_ground", invisibleGroundAsset);

    /*
    this.load.spritesheet(DUDE_KEY, platformAsset, {
      frameWidth: 400,
      frameHeight: 32,
    });
    */

    this.load.image(STAR_KEY, starAsset );
    this.load.image(BOMB_KEY, bombAsset);
    this.load.image(STOPWATCH_KEY, stopwatchAsset);

    this.load.spritesheet(DUDE_KEY, dudeAsset , {
      frameWidth: 184, // la hit box est surement horrible
      frameHeight: 129,
    });
  }

  create() {
    //Decor
    this.backgrounds = this.add.tileSprite(0, 0, 2000, 1200, "background");
    this.backgrounds.setScrollFactor(0);
    this.ground = this.createGround();
    const fakeGround = this.createFakeGround();
    this.plateformSpawner = new PlateformSpawner(this, GROUND_KEY);
    const plateformGroup = this.plateformSpawner.group;
    
    
    //Joueur
    this.player = this.createPlayer();
    //this.player.body.setGravityY(5000);
    console.log("Player : " + this.player.body);
    console.log("Plateform : "+ this.plateformSpawner.child);

    this.stars = this.createStars();

    this.scoreLabel = this.createScoreLabel(16, 16, 0);

    this.bombSpawner = new BombSpawner(this, BOMB_KEY);
    const bombsGroup = this.bombSpawner.group;
    
    this.stopwatchSpawner = new StopwatchSpawner(this, STOPWATCH_KEY);
    const stopwatchesGroup = this.stopwatchSpawner.group;
    

    this.physics.add.collider(bombsGroup, fakeGround);
    this.physics.add.collider(stopwatchesGroup, fakeGround);

    this.physics.add.collider(
      this.player,
      bombsGroup,
      this.hitBomb,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      stopwatchesGroup,
      this.hitStopwatch,
      null,
      this
    );


    //Physique
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.physics.add.collider(this.stars, fakeGround);
    this.physics.add.collider(this.player, fakeGround);
    this.physics.add.collider(plateformGroup, fakeGround);
    this.physics.add.collider(this.player, plateformGroup);

    // this.physics.add.overlap(this.player, this.stopwatches, this.collectStopwatch, null, this);
    // this.physics.add.collider(this.stopwatches, fakeGround);
  
    this.cursors = this.input.keyboard.createCursorKeys();

    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, 800 * 100000000, 600);

    // making the camera follow the player
    this.myCam.startFollow(this.player);

    /*The Collider takes two objects and tests for collision and performs separation against them.
    Note that we could call a callback in case of collision...*/

    // timer
    this.initTime = 100;
    this.textTime = this.add.text(16, 42, 'Timer: ' + this.initTime, {fontSize: 32, color: 'black'});
    this.countdown = this.time.addEvent({
      delay: 1000, 
      callback: this.countdownLabel, 
      callbackScope: this, 
      loop: true
    });

    // distance parcourue
    this.initDistance = 0;
    this.textDistance = this.add.text(16, 68, 'Distance: ' + this.initDistance, {fontSize: 32, color: 'black'});

    // stopwatches + bombs
    setTimeout(this.bombSpawner.spawn(this.player.x),10000);
    setTimeout(this.stopwatchSpawner.spawn(this.player.x),10000);
  
  }

  update() {
    if (this.gameOver) {
      return;
    }
    console.log(this.player.x);
    if (this.cursors.left.isDown ) {
      if(this.player.x > 100) {
        this.player.x -= 10;
        this.backgrounds.tilePositionX -=10;
        this.ground.tilePositionX  -= 10;
        // decrease distance
        this.distance = this.decDistance();
        this.plateformSpawner.group.setVelocityX(200);
      }
      else {
        if(this.backgrounds.tilePositionX > 0) {
          this.backgrounds.tilePositionX -=10;
          this.ground.tilePositionX  -= 10;
          this.plateformSpawner.group.setVelocityX(200);
        }
      }
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      if(this.player.x != 400) {
        this.player.x += 10;
      }
      this.player.anims.play("right", true);
      this.backgrounds.tilePositionX += 10;
      this.ground.tilePositionX += 10;
      // increment distance
      this.distance = this.incDistance();
      this.stars.setVelocityX(-200);
      if(this.backgrounds.tilePositionX % 1000 == 0) {
        this.plateformSpawner.spawn();
      }
      this.plateformSpawner.group.setVelocityX(-300);
      

    } else {
      this.player.anims.play("turn");
      this.stars.setVelocityX(0);
      

    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  incDistance() {
    if(!this.gameOver) {
      this.initDistance += 1;
      this.textDistance.setText('Distance: ' + this.initDistance);
    }
  }

  decDistance() {
    if(!this.gameOver) {
      this.initDistance -= 1;
      this.textDistance.setText('Distance: ' + this.initDistance);
    }
  }

  createGround() {

    const ground = this.add.tileSprite(0, 600, 2000, 125, GROUND_KEY);
    ground.setScrollFactor(0);

    //const ground = this.physics.add.staticGroup();
    //ground.create(400, 568, GROUND_KEY).setScale(2).refreshBody();
    return ground;

  }

  createFakeGround() {
    const fakeGround = this.physics.add.staticGroup();
    fakeGround.create(400, 568, "invisible_ground").setScale(2).refreshBody();
    return fakeGround;
  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody();

    // platforms.create(600, 400, GROUND_KEY);
    // platforms.create(50, 250, GROUND_KEY);
    platforms.create(750, 220, GROUND_KEY);
    return platforms;
  }

  createPlayer() {
    const player = this.physics.add.sprite(100, 400, DUDE_KEY); // positon où le personnage apparait
    player.setBounce(0);
    player.setCollideWorldBounds(true);
    /*The 'left' animation uses frames 0, 1, 2 and 3 and runs at 10 frames per second. 
    The 'repeat -1' value tells the animation to loop.
    */
    
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    
    this.anims.create({
      key: "turn",
      frames: [{ key: DUDE_KEY, frame: 6 }],
      frameRate: 1,
    });
    
    
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 7, end: 12 }),
      frameRate: 10,
      repeat: -1,
    });
    
    return player;
  }

  
  createStars() {
    const stars = this.physics.add.group({
      key: STAR_KEY,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });
    
    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    return stars;
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.scoreLabel.add(10);
    if (this.stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });
    }
  }

  createScoreLabel(x, y, score) {
    const style = { fontSize: "32px", fill: "#000" };
    const label = new ScoreLabel(this, x, y, score, style);
    console.log("score:", label);
    this.add.existing(label);

    return label;
  }

  hitBomb(player, bomb) {
    this.initTime -= 10;
    this.textTime.setText('Timer: ' + this.initTime);
    bomb.disableBody(true,true);
  }

  hitStopwatch(player, stopwatch) {
    this.initTime += 10;
    this.textTime.setText('Timer: ' + this.initTime);
    stopwatch.disableBody(true,true);
  }

  // timer
  countdownLabel() {
    if(this.initTime == 0) {
      this.gameOver = true;
      this.player.active = false;
      // this.player.setVelocity(0, 0);
    } else {
      this.initTime -= 1;
      this.textTime.setText('Timer: ' + this.initTime);
    }
  }
}

export default GameScene;