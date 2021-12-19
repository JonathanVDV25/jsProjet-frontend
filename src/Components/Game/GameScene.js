import Phaser from "phaser";
import { Redirect } from "../Router/Router";
import { getSessionObject } from "../../utils/session";

const GROUND_KEY = "ground";
const BOMB_KEY = "bomb";
const STOPWATCH_KEY = "stopwatch";

import BombSpawner from "./BombSpawner.js";
import PlatformSpawner from "./PlatformSpawner.js";
import PlatformBoostSpawner from "./PlatformBoostSpawner.js";
import PlatformSlowSpawner from "./PlatformSlowSpawner.js";
import FakePlateformSpawner from "./FakePlaformSpawner.js";
import VerifPlatformSpawner from "./VerifPlatformSpawner.js";
import VerifPlatformDroitSpawner from "./VerifPlatformDroitSpawner.js";
import StopwatchSpawner from "./StopwatchSpawner.js";
import Player from "./Player";

import backgroundAsset from "../../assets/background.png";
import platformAsset from "../../assets/platform.png";
import platformBoostAsset from "../../assets/plateform_boost.jpg";
import platformSlowAsset from "../../assets/plateform_slow.jpg";
import bombAsset from "../../assets/bomb_projectile2.png";
import stopwatchAsset from "../../assets/chrono_game.png";
import dudeAsset from "../../assets/pers1_final.png";
import dude2Asset from "../../assets/bike_run_V5.png";
import dude3Asset from "../../assets/punk_run_V6.png";
import invisibleGroundAsset from "../../assets/invisible_ground.png";
import gameOverBackGroundAsset from "../../assets/carreBackGround.png";
import timeOutTitleAsset from "../../assets/titreTimeOut.png";
import homeButtonAsset from "../../assets/homeButton.png";
import replayButtonAsset from "../../assets/replayButton.png";
import fakePlateformAsset from "../../assets/fakePlatform.png";
import bordAsset from "../../assets/bord.png";
import secretAsset from "../../assets/shrek_easter_egg.jpg";

import bonusSoundAsset from "../../assets/bonus.mp3";
import explosionSoundAsset from "../../assets/explosion.mp3";
import gameSoundAsset from "../../assets/music_home.mp3";
import slowSoundAsset from "../../assets/slowmotion.mp3";
import speedSoundAsset from "../../assets/speed.mp3";

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

    // audio
    this.bonusSound = undefined;
    this.explosionSound = undefined;
    this.gameSound = undefined;
    this.slowSound = undefined;
    this.speedSound = undefined;

    // spawners
    this.stopwatchSpawner = undefined;
    this.bombSpawner = undefined;
    this.platformSpawner = undefined;
    this.platformBoostSpawner = undefined;
    this.platformSlowSpawner = undefined;
    this.fakePlatformSpawner = undefined;
    this.verifPlatformSpawner = undefined;
    this.verifPlatformDroitSpawner = undefined;

    // text label
    this.text = undefined;
    this.initDistance = 0;
    this.initTime = 60;

    // intervals
    this.bombInterval = undefined;
    this.stopwatchInterval = undefined;
    this.timeInterval = undefined;

    this.bestScore = undefined; //ICII
    this.foundBestScore = false; //Faudra peut-etre mettre ça à CHAQUE chargement de jeu, pour avoir le bestScore à jour !
    this.updatedBestScore = false; //ICIII
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
    this.load.image("fakePlatform", fakePlateformAsset);
    this.load.image("verifPlatform", bordAsset);

    this.load.image(BOMB_KEY, bombAsset);
    this.load.image(STOPWATCH_KEY, stopwatchAsset);

    this.load.spritesheet("personnage1", dudeAsset, {
      frameWidth: 135,
      frameHeight: 129,
    });
    this.load.spritesheet("personnage2", dude2Asset, {
      frameWidth: 132,
      frameHeight: 129,
    });
    this.load.spritesheet("personnage3", dude3Asset, {
      frameWidth: 101,
      frameHeight: 120,
    });

    // sound preloading
    this.load.audio("bonusSound", bonusSoundAsset);
    this.load.audio("explosionSound", explosionSoundAsset);
    this.load.audio("gameSound", gameSoundAsset);
    this.load.audio("slowSound", slowSoundAsset);
    this.load.audio("speedSound", speedSoundAsset);

    // Game Over
    this.load.image("gameOverRectangle", gameOverBackGroundAsset);
    this.load.image("timeOutTitle", timeOutTitleAsset);
    this.load.image("homeButton", homeButtonAsset);
    this.load.image("replayButton", replayButtonAsset);

    this.load.image("secret", secretAsset);
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
    this.platformBoostSpawner = new PlatformBoostSpawner(this, "platformBoost");
    const platformBoostGroup = this.platformBoostSpawner.group;
    this.platformSlowSpawner = new PlatformSlowSpawner(this, "platformSlow");
    const platformSlowGroup = this.platformSlowSpawner.group;
    this.fakePlatformSpawner = new FakePlateformSpawner(this, "fakePlatform");
    const fakePlatformGroup = this.fakePlatformSpawner.group;
    this.verifPlatformSpawner = new VerifPlatformSpawner(this, "verifPlatform");
    const verifPlatformGroup = this.verifPlatformSpawner.group;
    this.verifPlatformDroitSpawner = new VerifPlatformDroitSpawner(this, "verifPlatform");

    const verifPlatformDroitGroup = this.verifPlatformDroitSpawner.group;
    // sound
    this.bonusSound = this.sound.add("bonusSound");
    this.explosionSound = this.sound.add("explosionSound");
    this.gameSound = this.sound.add("gameSound");
    this.gameSound.loop = true;
    this.gameSound.play();
    this.slowSound = this.sound.add("slowSound");
    this.speedSound = this.sound.add("speedSound");

    // joueur
    this.player = new Player(this, this.perso);
    this.player.setPushable(true);

    // spawners
    this.bombSpawner = new BombSpawner(this, BOMB_KEY);
    const bombsGroup = this.bombSpawner.group;

    this.stopwatchSpawner = new StopwatchSpawner(this, STOPWATCH_KEY);
    const stopwatchesGroup = this.stopwatchSpawner.group;

    // physics for players
    this.physics.add.collider(this.player, fakeGround);
    this.physics.add.collider(this.player, platformGroup);
    this.physics.add.collider(this.player, fakePlatformGroup);

    this.physics.add.collider(
      this.player,
      verifPlatformGroup,
      this.verifPlatform,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      verifPlatformDroitGroup,
      this.verifPlatformDroit,
      null,
      this
    );

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

    // physics for bombs and stopwatches
    this.physics.add.collider(bombsGroup, fakeGround);
    this.physics.add.collider(bombsGroup, fakePlatformGroup);
    this.physics.add.collider(stopwatchesGroup, fakeGround);
    this.physics.add.collider(bombsGroup, platformGroup);

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
    this.bombInterval = setInterval(
      () => this.bombSpawner.spawn(),
      Phaser.Math.Between(1000, 3000)
    );
    this.stopwatchInterval = setInterval(
      () => this.stopwatchSpawner.spawn(),
      Phaser.Math.Between(8000, 12500)
    );

    // time
    this.timeInterval = setInterval(() => this.timeLabel(), 1000);
  }

  async update() {
    if(this.player.data.get("time") < 6) {
      this.text.setColor("#ff0000");
    }
    else if(this.player.data.get("time") < 11) {
      this.text.setColor("#ff7f00");
    }
    else {
      this.text.setColor("#000000");
    }
    // get player best score
    if (!this.foundBestScore) {
      this.bestScore = await this.getUserBestScore(); //ICIIIII
      console.log("TEST");
      this.foundBestScore = true;
    }

    if (this.gameOver) {
      this.clearIntervals();
      this.launchGameOver();
      this.tilePos(0);
      this.platformVelocity(0);
      this.gameSound.stop();

      if (!this.updatedBestScore) {
        //await Méthode ASYNCHRONE DE PUT !
        if (this.player.data.get("distance") > this.bestScore) {
          //ICI IL BEUG! JPENSE C REGlé MTN
          await this.putUserBestScore(this.player.data.get("distance"));
        }
        this.updatedBestScore = true;
      }

      return;
    }

    // can't move when player stops
    if (
      this.cursors.down.isDown &&
      (this.cursors.right.isDown || this.cursors.left.isDown)
    ) {
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
          this.bombSpawner.group.setVelocityX(1000);
        }
        // slow platform
        else if (this.speed == -1) {
          this.player.setVelocityX(-250);
          this.tilePos(-5);
          this.platformVelocity(250);
          this.bombSpawner.group.setVelocityX(250);
        }
        // basic platfom
        else {
          this.player.setVelocityX(-500);
          this.tilePos(-10);
          this.platformVelocity(500);
          this.bombSpawner.group.setVelocityX(500);
        }
        // decrease distance
        this.data.set("distance", this.decDistance());
      } else {
        if (this.backgrounds.tilePositionX > 0) {
          // speedboost platform
          if (this.speed == 1) {
            this.tilePos(-20);
            this.platformVelocity(1000);
            this.bombSpawner.group.setVelocityX(1000);
          }
          // slow platform
          else if (this.speed == -1) {
            this.tilePos(-5);
            this.platformVelocity(250);
            this.bombSpawner.group.setVelocityX(250);
          }
          // basic platform
          else {
            this.tilePos(-10);
            this.platformVelocity(500);
            this.bombSpawner.group.setVelocityX(500);
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
          this.bombSpawner.group.setVelocityX(-1000);
        }
        // slow platform
        else if (this.speed == -1) {
          this.player.setVelocityX(250);
          this.tilePos(5);
          this.platformVelocity(-250);
          this.bombSpawner.group.setVelocityX(-250);
        }
        // basic platform
        else {
          this.player.setVelocityX(500);
          this.tilePos(10);
          this.platformVelocity(-500);
          this.bombSpawner.group.setVelocityX(-500);
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
          // console.log(position);
          this.ensembleCoPlatform.add(position);

          var random = Phaser.Math.Between(1, 5);
          if (random == 1 || random == 2 || random == 3) {
            var newPlatform = this.platformSpawner.spawn();
            this.verifPlatformSpawner.spawn(newPlatform.y, 1);
            this.verifPlatformDroitSpawner.spawn(newPlatform.y, 1);
            if(random == 1) {
              if (Phaser.Math.Between(1, 4) == 1) {
                this.stopwatchSpawner.spawnOnPlatform(newPlatform.y);
              }
            }
          } else if (random == 4) {
            var newPlatform = this.platformSlowSpawner.spawn();
            this.fakePlatformSpawner.spawn(newPlatform.y);
            this.verifPlatformSpawner.spawn(newPlatform.y, 2);
            this.verifPlatformDroitSpawner.spawn(newPlatform.y, 2);
          } else {
            var newPlatform = this.platformBoostSpawner.spawn();
            this.fakePlatformSpawner.spawn(newPlatform.y);
            this.verifPlatformSpawner.spawn(newPlatform.y, 2);
            this.verifPlatformDroitSpawner.spawn(newPlatform.y, 2);
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
      this.player.setVelocityY(-850);
    }

    if(this.player.data.get("distance") == -50) {
      this.add.image(400, 300, "secret").setScrollFactor(0);
    }
  }

  platformVelocity(value) {
    this.platformSpawner.group.setVelocityX(value);
    this.platformBoostSpawner.group.setVelocityX(value);
    this.platformSlowSpawner.group.setVelocityX(value);
    this.fakePlatformSpawner.group.setVelocityX(value);
    this.verifPlatformSpawner.group.setVelocityX(value);
    this.verifPlatformDroitSpawner.group.setVelocityX(value);
    this.stopwatchSpawner.group.setVelocityX(value);
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

  hitBomb(player, bomb) {
    if (this.player.data.get("time") <= 5) {
      this.player.data.set("time", 0);
    } else {
      this.player.data.set("time", this.player.data.get("time") - 5);
    }
    player.setTint(0xff0000);
    setTimeout(() => {
      player.setTint(0xffffff);
    }, 250);
    this.explosionSound.play();
    bomb.disableBody(true, true);
    this.timeDistanceRender();
  }

  hitStopwatch(player, stopwatch) {
    this.player.data.set("time", this.player.data.get("time") + 10);
    this.bonusSound.play();
    stopwatch.disableBody(true, true);
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
    this.speedSound.play();
    this.speed = 1;
    setTimeout(() => {
      this.speed = 0;
    }, 5000);
  }
  decreaseSpeedPlayer() {
    this.slowSound.play();
    this.speed = -1;
    setTimeout(() => {
      this.speed = 0;
    }, 4000);
  }

  verifPlatform() {
    if (this.speed == 1) {
      this.tilePos(-20);
    } else if (this.speed == -1) {
      this.tilePos(-5);
    } else {
      this.tilePos(-10);
    }
  }

  verifPlatformDroit() {
    if (this.speed == 1) {
      this.tilePos(20);
    } else if (this.speed == -1) {
      this.tilePos(5);
    } else {
      this.tilePos(10);
    }
  }

  async launchGameOver() {
    // game over rectangle
    const gameOverRectangle = this.add.image(400, 300, "gameOverRectangle");
    gameOverRectangle.setScrollFactor(0);

    // game over text
    const textGameOver = this.add.text(200, 250, "", {
      fontSize: 32,
      color: "white",
    });
    textGameOver.setScrollFactor(0);

    // time out title
    const timeOutTitle = this.add.image(385, 175, "timeOutTitle");
    timeOutTitle.setScrollFactor(0);

    gameOverRectangle.setDataEnabled();
    gameOverRectangle.data.set("distance", this.player.data.get("distance"));

    if (this.bestScore < gameOverRectangle.data.get("distance")) {
      textGameOver.setText([
        "Distance: " +
          gameOverRectangle.data.get("distance") +
          "\nBest Distance: " +
          gameOverRectangle.data.get("distance") +
          "\n\nYou have beaten your \nbest score !!!",
      ]); //Si distance est plus grande que son bestscore d'avant !
    } else {
      textGameOver.setText([
        "Distance: " +
          gameOverRectangle.data.get("distance") +
          "\nBest Distance: " +
          this.bestScore,
      ]);
    }

    //gameOverRectangle.data.set("record", this.bestScore);
    // textGameOver.setText(["Record: " + "NOT WORKING"]);

    let home = this.add.image(160, 450, "homeButton");
    home.setScrollFactor(0);
    home.setInteractive();
    home.on("pointerup", () => {
      this.gameOver = false;
      this.ensembleCoPlatform.clear();
      Redirect("/");
    });

    let replay = this.add.image(600, 450, "replayButton");
    replay.setScrollFactor(0);
    replay.setInteractive();
    replay.on("pointerup", () => {
      this.gameOver = false;
      this.ensembleCoPlatform.clear();
      Redirect("/game");
    });
  }

  async getUserBestScore() {
    const user = getSessionObject("user");
    //console.log("ici " , user);

    try {
      const response = await fetch("/api/scores/" + user.username); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }

      const score = await response.json();

      return score.distance;
    } catch (error) {
      console.error("PutScore::error: ", error);
    }
  }

  async putUserBestScore(bestScore) {
    const user = getSessionObject("user");

    try {
      const options = {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          name: user.username,
          distance: bestScore, //pt etre pas mettre le .value
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      };

      const response = await fetch("/api/scores/" + user.username, options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }

      console.log("Score updated : ", bestScore);
    } catch (error) {
      console.error("PutBestScore::error: ", error);
    }
  }
}

export default GameScene;
