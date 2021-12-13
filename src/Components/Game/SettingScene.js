import backgroundHomeAsset from "../../assets/fond_acceuil3.jpg";
import titleOptionsAsset from "../../assets/titre_options.png";
import perso1Asset from "../../assets/perso_1_modif.png";
import perso2Asset from "../../assets/perso_2_modif.png";
import perso3Asset from "../../assets/perso_3_modif.png";

class SettingScene extends Phaser.Scene {

    constructor() {
        super('SettingScene');
    }

    preload() {
        this.load.image("backgroundHome", backgroundHomeAsset);
        this.load.image("titleOptions", titleOptionsAsset);
        this.load.image("perso1", perso1Asset);
        this.load.image("perso2", perso2Asset);
        this.load.image("perso3", perso3Asset);
    }

    create() {
        this.add.image(0,0, "backgroundHome").setOrigin(0, 0).setDepth(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "titleOptions").setDepth(1);
        let perso1 = this.add.image(this.game.renderer.width / 4, this.game.renderer.height / 2 + 50, "perso1");
        let perso2 = this.add.image(this.game.renderer.width / 4 * 2, this.game.renderer.height / 2 + 50, "perso2");
        let perso3 = this.add.image(this.game.renderer.width / 4 * 3, this.game.renderer.height / 2 + 50, "perso3");
        
        perso1.setInteractive();
        perso1.on("pointerup", ()=> {
            this.scene.start('HomeScene', { perso: 1}) //This ?
        });
        perso2.setInteractive();
        perso2.on("pointerup", ()=> {
            this.scene.start('HomeScene', { perso: 2})
        });
        perso3.setInteractive();
        perso3.on("pointerup", ()=> {
            this.scene.start('HomeScene', { perso: 3})
        });
    }

    update() {

    }

}

export default SettingScene;