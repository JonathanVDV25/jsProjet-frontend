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

  spawn() {
    const y = Phaser.Math.Between(200, 500);

    const stopwatch = this.group.create(800, y, this.key);
    stopwatch.setBounce(1.2);
    stopwatch.setCollideWorldBounds(false);
    stopwatch.setVelocity(-100);

    return stopwatch;
  }
}