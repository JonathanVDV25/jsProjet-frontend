import Phaser from "phaser";
import GameScene from "../Game/GameScene.js";
import HomeScene from "../Game/HomeScene.js";
import SettingScene from "../Game/SettingScene.js";
import { getSessionObject } from "../../utils/session.js";
import { Redirect } from "../Router/Router.js";

var game;

const GamePage = () => {
  let user = getSessionObject("user");
  if (!user) return Redirect("/login");

  let phaserGame = `
<div id="gameDiv" class="d-flex justify-content-center my-3">
</div>`;

  let page = document.querySelector("#page");
  page.innerHTML = phaserGame;

  let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 600 },
        debug: false,
      },
    },
    scene: [HomeScene, SettingScene, GameScene],
    //  parent DOM element into which the canvas created by the renderer will be injected.
    parent: "gameDiv",
    audio: {
      disableWebAudio: true,
    },
  };

  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if (game) game.destroy(true);
  game = new Phaser.Game(config);
};

export default GamePage;
