import Phaser from "phaser";
const GROUND_KEY = "ground";
const DUDE_KEY = "dude";
const BOMB_KEY = "bomb";
const STOPWATCH_KEY = "stopwatch";
import BombSpawner from "./BombSpawner.js";
import PlateformSpawner from "./PlateformSpawner.js";
import PlateformBoostSpawner from "./PlateformBoostSpawner.js";
import PlateformSlowSpawner from "./PlateformSlowSpawner.js";
import StopwatchSpawner from "./StopwatchSpawner.js";
import backgroundAsset from "../../assets/background.png";
import platformAsset from "../../assets/platform.png";
import plateformBoostAsset from "../../assets/plateform_boost.jpg";
import plateformSlowAsset from "../../assets/plateform_slow.jpg";
import bombAsset from "../../assets/bomb.png";
import stopwatchAsset from "../../assets/chrono_game.png";
import dudeAsset from "../../assets/cyborg_v5.png";
import invisibleGroundAsset from "../../assets/invisible_ground.png";
import bonusSoundAsset from "../../assets/bonus.mp3";
import explosionSoundAsset from "../../assets/explosion.mp3";

class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player = undefined;
    this.cursors = undefined;
    this.bombSpawner = undefined;
    this.plateformSpawner = undefined;
    this.plateformBoostSpawner = undefined;
    this.plateformSlowSpawner = undefined;
    this.backgrounds = undefined;
    this.gameOver = false;
    this.ground = undefined;
    this.speed = 0;
    this.ensembleCoPlateform = new Set([]);

    this.stopwatchSpawner = undefined;

    this.text = undefined;
    this.initDistance = 0;
    this.initTime = 50;
  }

  preload() {
    this.load.image("background", backgroundAsset);
    this.load.image(GROUND_KEY, platformAsset);
    this.load.image("invisible_ground", invisibleGroundAsset);
    this.load.image("plateformBoost", plateformBoostAsset);
    this.load.image("plateformSlow", plateformSlowAsset);

    this.load.image(BOMB_KEY, bombAsset);
    this.load.image(STOPWATCH_KEY, stopwatchAsset);

    this.load.spritesheet(DUDE_KEY, dudeAsset, {
      frameWidth: 184, // la hit box est surement horrible
      frameHeight: 129,
    });

    // sound preloading
    this.load.audio("bonusSound", bonusSoundAsset);
    this.load.audio("explosionSound", explosionSoundAsset);
  }

  create() {
    //Empèche de générer deux plateformes en même temps
    this.ensembleCoPlateform.add(0);

    // decor
    this.backgrounds = this.add.tileSprite(0, 0, 2000, 1200, "background");
    this.backgrounds.setScrollFactor(0);
    this.ground = this.createGround();
    const fakeGround = this.createFakeGround();
    this.plateformSpawner = new PlateformSpawner(this, GROUND_KEY);
    const plateformGroup = this.plateformSpawner.group;
    this.plateformBoostSpawner = new PlateformBoostSpawner(
      this,
      "plateformBoost"
    );
    const plateformBoostGroup = this.plateformBoostSpawner.group;
    this.plateformSlowSpawner = new PlateformSlowSpawner(this, "plateformSlow");
    const plateformSlowGroup = this.plateformSlowSpawner.group;

    // sound
    this.bonusSound = this.sound.add("bonusSound");
    this.explosionSound = this.sound.add("explosionSound");

    // joueur
    this.player = this.createPlayer();
    this.player.setPushable(true);
<<<<<<< HEAD
=======

    //this.player.body.setGravityY(5000);
>>>>>>> testText

    this.bombSpawner = new BombSpawner(this, BOMB_KEY);
    const bombsGroup = this.bombSpawner.group;

    this.stopwatchSpawner = new StopwatchSpawner(this, STOPWATCH_KEY);
    const stopwatchesGroup = this.stopwatchSpawner.group;
<<<<<<< HEAD
    
=======

>>>>>>> testText
    // physics
    this.physics.add.collider(this.player, fakeGround);
    this.physics.add.collider(this.player, plateformGroup);
<<<<<<< HEAD
    this.physics.add.collider(this.player, plateformBoostGroup, this.increaseSpeedPlayer, null, this);
    this.physics.add.collider(this.player, plateformSlowGroup, this.decreaseSpeedPlayer, null, this);

    this.physics.add.collider(bombsGroup, fakeGround);
    this.physics.add.collider(stopwatchesGroup, fakeGround);

    this.physics.add.overlap(
=======
    this.physics.add.collider(
>>>>>>> testText
      this.player,
      plateformBoostGroup,
      this.increaseSpeedPlayer,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      plateformSlowGroup,
      this.decreaseSpeedPlayer,
      null,
      this
    );
    this.physics.add.collider(bombsGroup, fakeGround);
    this.physics.add.collider(stopwatchesGroup, fakeGround);

    this.physics.add.overlap(this.player, bombsGroup, this.hitBomb, null, this);

    this.physics.add.overlap(
      this.player,
      stopwatchesGroup,
      this.hitStopwatch,
      null,
      this
    );

    // this.physics.add.overlap(this.player, this.stopwatches, this.collectStopwatch, null, this);
    // this.physics.add.collider(this.stopwatches, fakeGround);

    this.cursors = this.input.keyboard.createCursorKeys();

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

    // this.text.fixedToCamera = true;
    // this.text.myCam.setFollowOffset(16, 16);

    // stopwatches + bombs
    setInterval(() => this.bombSpawner.spawn(), 10000);
    setInterval(() => this.stopwatchSpawner.spawn(), 10000);

    // time
    setInterval(() => this.timeLabel(), 1000);
  }

  update() {
    if (this.gameOver) {
      return;
    }

    //Evite d'avancer à l'arret
    if (
      this.cursors.down.isDown &&
      (this.cursors.right.isDown || this.cursors.left.isDown)
    ) {
      this.player.anims.play("turn");
      this.player.setVelocityY(400);
      this.plateformSpawner.group.setVelocityX(0);
      this.plateformBoostSpawner.group.setVelocityX(0);
      this.plateformSlowSpawner.group.setVelocityX(0);
    }

    //Joueur va a gauche
    else if (this.cursors.left.isDown) {
      if (this.player.x > 100) {
        //Plateforme Boost
        if (this.speed == 1) {
          this.player.setVelocityX(-1000);
          this.backgrounds.tilePositionX -= 20;
          this.ground.tilePositionX -= 20;
          this.plateformSpawner.group.setVelocityX(1000);
          this.plateformBoostSpawner.group.setVelocityX(1000);
          this.plateformSlowSpawner.group.setVelocityX(1000);
        }
        //Plateform Slow
        else if (this.speed == -1) {
          this.player.setVelocityX(-250);
          this.backgrounds.tilePositionX -= 5;
          this.ground.tilePositionX -= 5;
          this.plateformSpawner.group.setVelocityX(250);
          this.plateformBoostSpawner.group.setVelocityX(250);
          this.plateformSlowSpawner.group.setVelocityX(250);
        }
        //Plateform Normal
        else {
          this.player.setVelocityX(-500);
          this.backgrounds.tilePositionX -= 10;
          this.ground.tilePositionX -= 10;
          this.plateformSpawner.group.setVelocityX(500);
          this.plateformBoostSpawner.group.setVelocityX(500);
          this.plateformSlowSpawner.group.setVelocityX(500);
        }
        // decrease distance
        this.data.set("distance", this.decDistance());
      } else {
        if (this.backgrounds.tilePositionX > 0) {
          //Plateforme Boost
          if (this.speed == 1) {
            this.backgrounds.tilePositionX -= 20;
            this.ground.tilePositionX -= 20;
            this.plateformSpawner.group.setVelocityX(1000);
            this.plateformBoostSpawner.group.setVelocityX(1000);
            this.plateformSlowSpawner.group.setVelocityX(1000);
          }
          //Plateform Slow
          else if (this.speed == -1) {
            this.backgrounds.tilePositionX -= 5;
            this.ground.tilePositionX -= 5;
            this.plateformSpawner.group.setVelocityX(250);
            this.plateformBoostSpawner.group.setVelocityX(250);
            this.plateformSlowSpawner.group.setVelocityX(250);
          }
          //Plateform Normal
          else {
            this.backgrounds.tilePositionX -= 10;
            this.ground.tilePositionX -= 10;
            this.plateformSpawner.group.setVelocityX(500);
            this.plateformBoostSpawner.group.setVelocityX(500);
            this.plateformSlowSpawner.group.setVelocityX(500);
          }
          // decrease distance
          this.data.set("distance", this.decDistance());
        }
      }
      this.player.anims.play("left", true);
    }

    // Joueur va à droite
    else if (this.cursors.right.isDown) {
      if (this.player.x != 400) {
        //Plateforme Boost
        if (this.speed == 1) {
          this.player.setVelocityX(1000);
          this.backgrounds.tilePositionX += 20;
          this.ground.tilePositionX += 20;
          this.plateformSpawner.group.setVelocityX(-1000);
          this.plateformBoostSpawner.group.setVelocityX(-1000);
          this.plateformSlowSpawner.group.setVelocityX(-1000);
        }
        //Plateform Slow
        else if (this.speed == -1) {
          this.player.setVelocityX(250);
          this.backgrounds.tilePositionX += 5;
          this.ground.tilePositionX += 5;
          this.plateformSpawner.group.setVelocityX(-250);
          this.plateformBoostSpawner.group.setVelocityX(-250);
          this.plateformSlowSpawner.group.setVelocityX(-250);
        }
        //Plateform Normal
        else {
          this.player.setVelocityX(500);
          this.backgrounds.tilePositionX += 10;
          this.ground.tilePositionX += 10;
          this.plateformSpawner.group.setVelocityX(-500);
          this.plateformBoostSpawner.group.setVelocityX(-500);
          this.plateformSlowSpawner.group.setVelocityX(-500);
          // if(this.scoreLabel.x < 320 && this.player.x > 420) {
          //     this.scoreLabel.x += 10;
          // }
        }
      }
      this.player.anims.play("right", true);
      this.data.set("distance", this.incDistance());

      //Générer les plateformes
      if (
        this.backgrounds.tilePositionX % 1000 >= 0 ||
        this.backgrounds.tilePositionX % 1000 <= 5
      ) {
        var position = Math.round(this.backgrounds.tilePositionX / 1000);

        if (!this.ensembleCoPlateform.has(position)) {
          console.log(position);
          this.ensembleCoPlateform.add(position);

          var random = Phaser.Math.Between(1, 5);
          if (random == 1 || random == 2 || random == 3) {
            this.plateformSpawner.spawn();
          } else if (random == 4) {
            this.plateformSlowSpawner.spawn();
          } else {
            this.plateformBoostSpawner.spawn();
          }
        }
      }
    }

    //Joueur va en bas
    else if (this.cursors.down.isDown) {
      this.player.anims.play("turn");
      this.player.setVelocityY(400);
      this.plateformSpawner.group.setVelocityX(0);
      this.plateformBoostSpawner.group.setVelocityX(0);
      this.plateformSlowSpawner.group.setVelocityX(0);
    }

    //Joueur à l'arret (Auncun bouton pressé)
    else {
      this.player.anims.play("turn");
      this.plateformSpawner.group.setVelocityX(0);
      this.plateformBoostSpawner.group.setVelocityX(0);
      this.plateformSlowSpawner.group.setVelocityX(0);
      this.player.setVelocityX(0);
    }

    //Joueur saute
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-600);
    }
  }

  incDistance() {
    if (!this.gameOver) {
      this.player.data.set("distance", Math.round(this.backgrounds.tilePositionX / 10));
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

  hitBomb(player, bomb) {
    if (this.player.data.get("time") <= 10) {
      this.player.data.set("time", 0);
    } else {
      this.player.data.set("time", this.player.data.get("time") - 10);
    }
    this.timeDistanceRender();
  }

  hitStopwatch(player, stopwatch) {
    this.player.data.set("time", this.player.data.get("time") + 10);
    this.timeDistanceRender();
  }

  // timer + distance 
  timeLabel() {
    if (this.player.data.get("time") <= 0) {
      this.gameOver = true;
      this.player.active = false;
    } else {
      this.player.data.set("time", this.player.data.get("time") - 1);
      this.timeDistanceRender();
    }
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
}

export default GameScene;
