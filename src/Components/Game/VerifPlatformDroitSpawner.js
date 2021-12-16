import Phaser from "phaser";

export default class VerifPlateformSpawner {
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

  spawn(y, type) {
        let plateform;
        if(type == 1) {
          plateform = this.group.create(1700, y, this.key);
        }   
        else {
          plateform = this.group.create(1650, y, this.key);
        }
        plateform.body.setAllowGravity(false);
        plateform.setGravity(0);
        plateform.setImmovable(true);
        plateform.setVelocity(0);
        return plateform;
    }
}
