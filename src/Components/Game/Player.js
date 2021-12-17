import Phaser from "phaser";

export default class Player {
    /**
     * @param {Phaser.Scene} scene
    */
    constructor(scene, perso) {
        let personnage;

        if (perso == 1) {
        personnage = "personnage1";
        } else if (perso == 2) {
        personnage = "personnage2";
        } else {
        personnage = "personnage3";
        }

        const player = scene.physics.add.sprite(100, 400, personnage); // player spawning position
        player.setBounce(0);
        player.setCollideWorldBounds(true);
        /*The 'left' animation uses frames 0, 1, 2 and 3 and runs at 10 frames per second. 
        The 'repeat -1' value tells the animation to loop.
        */

        scene.anims.create({
        key: "left",
        frames: scene.anims.generateFrameNumbers(personnage, { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
        });

        scene.anims.create({
        key: "turn",
        frames: [{ key: personnage, frame: 6 }],
        frameRate: 1,
        });

        scene.anims.create({
        key: "right",
        frames: scene.anims.generateFrameNumbers(personnage, {
            start: 7,
            end: 12,
        }),
        frameRate: 10,
        repeat: -1,
        });

        return player;
    }
}