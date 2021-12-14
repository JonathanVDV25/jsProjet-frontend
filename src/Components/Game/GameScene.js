import Phaser from "phaser";
const GROUND_KEY = "ground";
const DUDE_KEY = "dude";
const BOMB_KEY = "bomb";
const STOPWATCH_KEY = "stopwatch";
import BombSpawner from "./BombSpawner.js";
import PlatformSpawner from "./PlatformSpawner.js";
import PlatformBoostSpawner from "./PlatformBoostSpawner.js";
import PlatformSlowSpawner from "./PlatformSlowSpawner.js";
import StopwatchSpawner from "./StopwatchSpawner.js";
import backgroundAsset from "../../assets/background.png";
import platformAsset from "../../assets/platform.png";
import platformBoostAsset from "../../assets/plateform_boost.jpg";
import platformSlowAsset from "../../assets/plateform_slow.jpg";
import bombAsset from "../../assets/bomb.png";
import stopwatchAsset from "../../assets/chrono_game.png";
import dudeAsset from "../../assets/cyborg_v5.png";
import dude2Asset from "../../assets/bike_run_v5.png";
import invisibleGroundAsset from "../../assets/invisible_ground.png";
import bonusSoundAsset from "../../assets/bonus.mp3";
import explosionSoundAsset from "../../assets/explosion.mp3";
import carreBackGroundAsset from "../../assets/carreBackGround.png";

class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player = undefined;
    this.cursors = undefined;
    this.backgrounds = undefined;
    this.gameOver = false;
    this.ground = undefined;
    this.speed = 0;
    this.ensembleCoPlatform = new Set([]);
    this.perso = undefined;

    // spawners
    this.stopwatchSpawner = undefined;
    this.bombSpawner = undefined;
    this.platformSpawner = undefined;
    this.platformBoostSpawner = undefined;
    this.platformSlowSpawner = undefined;

    // text label
    this.text = undefined;
    this.initDistance = 0;
    this.initTime = 5;

    // intervals
    this.bombInterval = undefined;
    this.stopwatchInterval = undefined;
    this.timeInterval = undefined;

  }

  init(data) {
    this.perso = data.perso;
  }

  preload() {
    this.load.image("background", backgroundAsset);
    this.load.image(GROUND_KEY, platformAsset);
    this.load.image("invisible_ground", invisibleGroundAsset);
    this.load.image("platformBoost", platformBoostAsset);
    this.load.image("platformSlow", platformSlowAsset);

    this.load.image(BOMB_KEY, bombAsset);
    this.load.image(STOPWATCH_KEY, stopwatchAsset);

    this.load.spritesheet("personnage1", dudeAsset , {
      frameWidth: 184, // la hit box est surement horrible
      frameHeight: 129,
    });
    this.load.spritesheet("personnage2", dude2Asset, {
      frameWidth: 132,
      frameHeight: 129,
    });

    // sound preloading
    this.load.audio("bonusSound", bonusSoundAsset);
    this.load.audio("explosionSound", explosionSoundAsset);

    // Game Over
    this.load.image("carreGameOver", carreBackGroundAsset);
  }

  create() {
    //Empèche de générer deux platformes en même temps
    this.ensembleCoPlatform.add(0);

    // decor
    this.backgrounds = this.add.tileSprite(0, 0, 2000, 1200, "background");
    this.backgrounds.setScrollFactor(0);
    this.ground = this.createGround();
    const fakeGround = this.createFakeGround();
    this.platformSpawner = new PlatformSpawner(this, GROUND_KEY);
    const platformGroup = this.platformSpawner.group;
    this.platformBoostSpawner = new PlatformBoostSpawner(
      this,
      "platformBoost"
    );
    const platformBoostGroup = this.platformBoostSpawner.group;
    this.platformSlowSpawner = new PlatformSlowSpawner(this, "platformSlow");
    const platformSlowGroup = this.platformSlowSpawner.group;

    // sound
    this.bonusSound = this.sound.add("bonusSound");
    this.explosionSound = this.sound.add("explosionSound");

    // joueur
    this.player = this.createPlayer();
    this.player.setPushable(true);

    // spawners
    this.bombSpawner = new BombSpawner(this, BOMB_KEY);
    const bombsGroup = this.bombSpawner.group;

    this.stopwatchSpawner = new StopwatchSpawner(this, STOPWATCH_KEY);
    const stopwatchesGroup = this.stopwatchSpawner.group;

    // physics
    this.physics.add.collider(this.player, fakeGround);
    this.physics.add.collider(this.player, platformGroup);

    this.physics.add.collider(
      this.player,
      platformBoostGroup,
      this.increaseSpeedPlayer,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      platformSlowGroup,
      this.decreaseSpeedPlayer,
      null,
      this
    );

    this.physics.add.collider(bombsGroup, fakeGround);
    this.physics.add.collider(stopwatchesGroup, fakeGround);

    this.physics.add.overlap(
      this.player, 
      bombsGroup, 
      this.hitBomb, 
      null, 
      this
    );

    this.physics.add.overlap(
      this.player,
      stopwatchesGroup,
      this.hitStopwatch,
      null,
      this
    );

    // cursor
    this.cursors = this.input.keyboard.createCursorKeys();

    // cam
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, 800 * 100000000, 600);

    // making the camera follow the player
    this.myCam.startFollow(this.player);

    // text for timer and distance
    this.text = this.add.text(16, 16, "", { fontSize: 32, color: "black" });
    this.text.setScrollFactor(0);

    this.player.setDataEnabled();

    this.player.data.set("time", this.initTime);
    this.player.data.set("distance", this.initDistance);

    this.text.setText([
      "Time: " + this.player.data.get("time"),
      "Distance: " + this.player.data.get("distance"),
    ]);

    // stopwatches + bombs
    this.bombInterval = setInterval(() => this.bombSpawner.spawn(), 10000);
    this.stopwatchInterval = setInterval(() => this.stopwatchSpawner.spawn(), 10000);

    // time
    this.timeInterval = setInterval(() => this.timeLabel(), 1000);
  }

  update() {
    if (this.gameOver) {
      this.lauchGameOver();
      return;
    }

    // can't move when player stops
    if ( this.cursors.down.isDown && (this.cursors.right.isDown || this.cursors.left.isDown)) {
      this.player.anims.play("turn");
      this.player.setVelocityY(400);
      this.platformVelocity(0);
    }

    // player goes left
    else if (this.cursors.left.isDown) {
      if (this.player.x > 100) {
        // speedboost platform
        if (this.speed == 1) {
          this.player.setVelocityX(-1000);
          this.tilePos(-20);
          this.platformVelocity(1000);
        }
        // slow platform
        else if (this.speed == -1) {
          this.player.setVelocityX(-250);
          this.tilePos(-5);
          this.platformVelocity(250);
        }
        // basic platfom
        else {
          this.player.setVelocityX(-500);
          this.tilePos(-10);
          this.platformVelocity(500);
        }
        // decrease distance
        this.data.set("distance", this.decDistance());
      } else {
        if (this.backgrounds.tilePositionX > 0) {
          // speedboost platform
          if (this.speed == 1) {
            this.tilePos(-20);
            this.platformVelocity(1000);
          }
          // slow platform
          else if (this.speed == -1) {
            this.tilePos(-5);
            this.platformVelocity(250);
          }
          // basic platform
          else {
            this.tilePos(-10);
            this.platformVelocity(500);
          }
          // decrease distance
          this.data.set("distance", this.decDistance());
        }
      }
      this.player.anims.play("left", true);
    }

    // player goes right
    else if (this.cursors.right.isDown) {
      if (this.player.x != 400) {
        // speedboost platform
        if (this.speed == 1) {
          this.player.setVelocityX(1000);
          this.tilePos(20);
          this.platformVelocity(-1000);
        }
        // slow platform
        else if (this.speed == -1) {
          this.player.setVelocityX(250);
          this.tilePos(5);
          this.platformVelocity(-250);
        }
        // basic platform
        else {
          this.player.setVelocityX(500);
          this.tilePos(10);
          this.platformVelocity(-500);
          // if(this.scoreLabel.x < 320 && this.player.x > 420) {
          //     this.scoreLabel.x += 10;
          // }
        }
      }
      this.player.anims.play("right", true);
      this.data.set("distance", this.incDistance());

      // platforms spawn
      if (
        this.backgrounds.tilePositionX % 1000 >= 0 ||
        this.backgrounds.tilePositionX % 1000 <= 5
      ) {
        var position = Math.round(this.backgrounds.tilePositionX / 1000);

        if (!this.ensembleCoPlatform.has(position)) {
          console.log(position);
          this.ensembleCoPlatform.add(position);

          var random = Phaser.Math.Between(1, 5);
          if (random == 1 || random == 2 || random == 3) {
            this.platformSpawner.spawn();
          } else if (random == 4) {
            this.platformSlowSpawner.spawn();
          } else {
            this.platformBoostSpawner.spawn();
          }
        }
      }
    }

    // player goes down
    else if (this.cursors.down.isDown) {
      this.player.anims.play("turn");
      this.platformVelocity(0);
      this.player.setVelocityY(400);
    }

    // player not moving (no buttons pressed)
    else {
      this.player.anims.play("turn");
      this.platformVelocity(0);
      this.player.setVelocityX(0);
    }

    // player jumps
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-600);
    }
  }

  platformVelocity(value) {
    this.platformSpawner.group.setVelocityX(value);
    this.platformBoostSpawner.group.setVelocityX(value);
    this.platformSlowSpawner.group.setVelocityX(value);
  }

  tilePos(value) {
    this.backgrounds.tilePositionX += value;
    this.ground.tilePositionX += value;
  }

  incDistance() {
    if (!this.gameOver) {
      this.player.data.set(
        "distance",
        Math.round(this.backgrounds.tilePositionX / 10)
      );
      this.timeDistanceRender();
    }
  }

  decDistance() {
    if (!this.gameOver) {
      this.player.data.set("distance", this.backgrounds.tilePositionX / 10);
      this.timeDistanceRender();
    }
  }

  createGround() {
    const ground = this.add.tileSprite(0, 600, 2000, 125, GROUND_KEY);
    ground.setScrollFactor(0);
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
    platforms.create(750, 220, GROUND_KEY);
    return platforms;
  }

  createPlayer() {
    let personnage;
    if(this.perso == 1) {
      personnage = "personnage1";
    }
    else if(this.perso == 2) {
      personnage = "personnage2";
    }
    else {
      personnage = "personnage3";
    }
    const player = this.physics.add.sprite(100, 400, personnage); // player spawning position
    player.setBounce(0);
    player.setCollideWorldBounds(true);
    /*The 'left' animation uses frames 0, 1, 2 and 3 and runs at 10 frames per second. 
    The 'repeat -1' value tells the animation to loop.
    */

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers(personnage, { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: personnage, frame: 6 }],
      frameRate: 1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers(personnage, { start: 7, end: 12 }),
      frameRate: 10,
      repeat: -1,
    });

    return player;
  }

  hitBomb(player, bomb) {
    if (this.player.data.get("time") <= 10) {
      this.player.data.set("time", 0);
    } else {
      this.player.data.set("time", this.player.data.get("time") - 10);
    }
    bomb.disableBody(true, true);
    this.timeDistanceRender();
  }

  hitStopwatch(player, stopwatch) {
    this.player.data.set("time", this.player.data.get("time") + 10);
    bomb.disableBody(true, true);
    this.timeDistanceRender();
  }

  // timer + distance
  timeLabel() {

    if (this.player.data.get("time") <= 0) {
      this.gameOver = true;
      this.player.active = false;
      this.clearIntervals();
    } else {
      this.player.data.set("time", this.player.data.get("time") - 1);
      this.timeDistanceRender();
    }
  }

  clearIntervals() {
    clearInterval(this.bombInterval);
    clearInterval(this.stopwatchInterval);
    clearInterval(this.timeInterval);
  }

  timeDistanceRender() {
    this.text.setText([
      "Time: " + this.player.data.get("time"),
      "Distance: " + this.player.data.get("distance"),
    ]);
  }

  increaseSpeedPlayer() {
    this.speed = 1;
    setTimeout(() => {
      this.speed = 0;
    }, 5000);
  }
  decreaseSpeedPlayer() {
    this.speed = -1;
    setTimeout(() => {
      this.speed = 0;
    }, 4000);
  }

  lauchGameOver() {
    const carreGameOver = this.add.image(400, 300, "carreGameOver");
    const textGameOver = this.add.text(200, 250, '', { fontSize: 32, color: "black" });
    textGameOver.setScrollFactor(0);
    carreGameOver.setScrollFactor(0);
    carreGameOver.setDataEnabled();
    carreGameOver.data.set("distance", this.player.data.get("distance"));
    textGameOver.setText([
      "Distance: " + carreGameOver.data.get("distance"),
    ]);
  }

}

export default GameScene;
