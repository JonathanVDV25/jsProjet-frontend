import Phaser from "phaser";

export default class FakePlateformSpawner {
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
  create() {
    
  }
  spawn(y) {

    const plateform = this.group.create(1500, y, this.key);
    
    plateform.body.setSize(300, 22, 0, 22);
    plateform.body.setAllowGravity(false);
    plateform.setGravity(0);
    plateform.setImmovable(true);
    plateform.setVelocity(0);
    
    return plateform;
  }
}
