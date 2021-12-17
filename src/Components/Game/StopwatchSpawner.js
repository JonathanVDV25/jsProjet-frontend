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

    const stopwatch = this.group.create(1500, 510, this.key);
    stopwatch.setBounce(0.5);
    stopwatch.setCollideWorldBounds(false);
    stopwatch.body.setAllowGravity(false);
    stopwatch.setImmovable(true);
    return stopwatch;
  }
}