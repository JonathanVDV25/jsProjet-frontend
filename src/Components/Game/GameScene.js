import Phaser from "phaser";
const GROUND_KEY = "ground";
const DUDE_KEY = "dude";
const STAR_KEY = "star";
const BOMB_KEY = "bomb";
import ScoreLabel from "./ScoreLabel.js";
import BombSpawner from "./BombSpawner.js";
import backgroundAsset from "../../assets/background.png";
import backgroundAsset2 from "../../assets/background2.png";
import platformAsset from "../../assets/platform.png";
import starAsset from "../../assets/star.png";
import bombAsset from "../../assets/bomb.png";
import dudeAsset from "../../assets/cyborg_v5.png";

class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player = undefined;
    this.cursors = undefined;
    this.scoreLabel = undefined;
    this.stars = undefined;
    this.bombSpawner = undefined;
    this.backgrounds = undefined;
    this.gameOver = false;
  }

  preload() {
    this.load.image("background", backgroundAsset);
    this.load.image("background2", backgroundAsset2);
    this.load.image(GROUND_KEY, platformAsset);
    this.load.image(STAR_KEY, starAsset );
    this.load.image(BOMB_KEY, bombAsset);

    this.load.spritesheet(DUDE_KEY, dudeAsset , {
      frameWidth: 184, //La hit box est surement horrible
      frameHeight: 129,
    });
  }

  create() {
    this.backgrounds = this.createBackGround();
    this.backgrounds2 = this.createBackGround2();
    //this.add.image(400, 300, "background");
    const platforms = this.createPlatforms();
    this.player = this.createPlayer();
    this.stars = this.createStars();
    this.scoreLabel = this.createScoreLabel(16, 16, 0);
    this.bombSpawner = new BombSpawner(this, BOMB_KEY);
    const bombsGroup = this.bombSpawner.group;
    this.physics.add.collider(this.stars, platforms);
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(bombsGroup, platforms);
    this.physics.add.collider(
      this.player,
      bombsGroup,
      this.hitBomb,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );
    this.cursors = this.input.keyboard.createCursorKeys();

    /*The Collider takes two objects and tests for collision and performs separation against them.
    Note that we could call a callback in case of collision...*/
  }

  update() {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(0);
      this.player.anims.play("left", true);
      
      this.backgrounds.x += 10;
      this.backgrounds2.x += 10;
      
      
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(0);
      this.player.anims.play("right", true);
      this.backgrounds.x -= 10;
      this.backgrounds2.x -= 10;
      //Terrain infini
      //TODO
      if(this.backgrounds.x == -500) {
        this.backgrounds.x = 1000;
        console.log(-400);
      }
      else if(this.backgrounds2.x == -500) {
        this.backgrounds2.x = 1000;
        console.log(Back2);
      }
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
    
  }
  createBackGround() {
    const background = this.add.image(400, 275, "background");

    return background
  }

  createBackGround2() {
    const background = this.add.image(1466, 275, "background2");

    return background
  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody();

    platforms.create(600, 400, GROUND_KEY);
    platforms.create(50, 250, GROUND_KEY);
    platforms.create(750, 220, GROUND_KEY);
    return platforms;
  }

  createPlayer() {
    const player = this.physics.add.sprite(100, 400, DUDE_KEY); //Positon où le personnage apparait
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

    this.bombSpawner.spawn(player.x);
  }

  createScoreLabel(x, y, score) {
    const style = { fontSize: "32px", fill: "#000" };
    const label = new ScoreLabel(this, x, y, score, style);
    console.log("score:", label);
    this.add.existing(label);

    return label;
  }

  hitBomb(player, bomb) {
    this.scoreLabel.setText("GAME OVER : ( \nYour Score = " + this.scoreLabel.score);
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    this.gameOver = true;
  }
}

export default GameScene;
