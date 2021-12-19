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
            plateform = this.group.create(1300, y, this.key);
        }   
        else {
            plateform = this.group.create(1350, y+5, this.key);
        }
        plateform.setSize(1, 22, 0, 0);
        plateform.body.setAllowGravity(false);
        plateform.setGravity(0);
        plateform.setImmovable(true);
        plateform.setVelocity(0);
      
        return plateform;
    }
}
