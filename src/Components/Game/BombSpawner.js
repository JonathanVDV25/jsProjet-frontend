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
    const y = Phaser.Math.Between(200, 500);

    const bomb = this.group.create(800, y, this.key);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(false);
    bomb.setVelocity(-100);

    return bomb;
  }
}
