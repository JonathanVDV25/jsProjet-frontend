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
  create() {
    
  }
  spawn() {

    const plateform = this.group.create(1500, Phaser.Math.Between(250, 375), this.key);
    
    plateform.body.setAllowGravity(false);
    plateform.setGravity(0);
    //plateform.setImmovable(true);
    plateform.setPushable(false);
    plateform.setVelocity(0);
    
    
    return plateform;
  }
}
