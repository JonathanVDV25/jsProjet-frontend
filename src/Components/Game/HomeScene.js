import backgroundHomeAsset from "../../assets/fond_acceuil3.jpg";
import titreAsset from "../../assets/titre.png";
import playButtonAsset from "../../assets/play_button.png";
import musicHomeAsset from "../../assets/music_home.mp3";
import optionsButtonAsset from "../../assets/options_button.png";


class HomeScene extends Phaser.Scene {

    constructor() {
        super('HomeScene');
        this.perso = undefined;
    }
    init(data) {
        this.perso = data.perso;
        if(data.perso == null) {
            this.perso = data.personnage;
            if(data.personnage == null) {
                this.perso = 1;
            }
        }
    }

    preload() {
        this.load.image("backgroundHome", backgroundHomeAsset);
        this.load.image("titre", titreAsset);
        this.load.image("playButton", playButtonAsset);
        this.load.audio("musicHome", musicHomeAsset);
        this.load.image("optionsButton", optionsButtonAsset);
        
        // LoadBar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })
        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
        })
        this.load.on("complete", ()=> {
            console.log("done");
        })

    }

    create() {
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "titre").setDepth(1);
        this.add.image(0,0, "backgroundHome").setOrigin(0, 0).setDepth(0);
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "playButton").setDepth(1);
        let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 150, "optionsButton").setDepth(1);
        
    
        this.sound.play("musicHome", {
            loop: true
        });
        


        playButton.setInteractive();
        playButton.on("pointerup", ()=> {
            this.scene.start('game-scene', { perso: this.perso})
        });
        optionsButton.setInteractive();
        optionsButton.on("pointerup", ()=> {
            this.scene.start('SettingScene');
        });

    }

    update() {
        console.log(this.perso);
    }

}

export default HomeScene;