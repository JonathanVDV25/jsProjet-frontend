import Phaser from "phaser";

export default class StopwatchSpawner {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene, stopwatchKey = "stopwatch") {
    this.scene = scene;
    this.key = stopwatchKey;

    this._group = this.scene.physics.add.group();
  }

  get group() {
    return this._group;
  }

  spawn(playerX = 0) {
    const x =
      playerX < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    const stopwatch = this.group.create(x, 16, this.key);
    stopwatch.setBounce(1);
    stopwatch.setCollideWorldBounds(false);
    stopwatch.setVelocity(Phaser.Math.Between(-200, 200), 20);

    return stopwatch;
  }
}