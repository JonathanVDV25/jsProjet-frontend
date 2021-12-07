import Phaser from "phaser";

export default class PlateformSpawner {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene, plateformKey = "plateform") {
    this.scene = scene;
    this.key = plateformKey;

    this._group = this.scene.physics.add.group();
  }

  get group() {
    return this._group;
  }

  spawn() {

    const plateform = this.group.create(800, Phaser.Math.Between(200, 500), this.key);
    
    return plateform;
  }
}
