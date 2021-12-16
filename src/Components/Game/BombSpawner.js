import { beforeMain } from "@popperjs/core";
import Phaser from "phaser";

export default class BombSpawner {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene, bombKey = "bomb") {
    this.scene = scene;
    this.key = bombKey;

    this._group = this.scene.physics.add.group();
  }

  get group() {
    return this._group;
  }

  spawn(playerX = 0) {
    let random = Phaser.Math.Between(1, 2);
    if(random == 1) {
      var x = Phaser.Math.Between(400, 1200);
      var y = 0;
      var minVelocityX = -350;
      var maxVelocityX = 350;
    }
    else {
      console.log("OK");
      var x = 1200;
      var y = Phaser.Math.Between(0, 400);
      var minVelocityX = -250;
      var maxVelocityX = -100;
    }
    const bomb = this.group.create(x, y, this.key);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(false);
    bomb.setVelocityX(Phaser.Math.Between(minVelocityX, maxVelocityX));
    bomb.setVelocityY(Phaser.Math.Between(-75, -15));

    return bomb;
  }
}
