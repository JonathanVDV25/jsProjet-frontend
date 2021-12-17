import LogoHomePage from "../../img/chrono2.png";
import Perso1 from "../../img/perso_1_modif.png";
import Perso2 from "../../img/perso_2_modif.png";
import Perso3 from "../../img/perso_3_modif.png";

function AcceuilPage() {
  document.querySelector("main").className = 'simple';
  const pageDiv = document.querySelector("#page");
  let acceuil;
  acceuil =
  `<img class="logo" src='${LogoHomePage}' alt='imageLogo'>
  <h1 class="titre">[ ChronoRun ]</h1><br>
  <p>ChronoRun est un jeu de plateforme dans un univers CyberPunk. Nous sommes alors en 2612 et la technologie a fait d'énormes progrès. 
  Mais ces nouvelles technologies bien qu'elles soient devenues indispensables dans cette société sont aussi source de beaucoup de pollution. Le nombre d'usines ne cesse d'augmenter. 
  Ce qui donne lieu à des zones industrielles de plus en plus grandes. Même dans le centre ville, la pollution se ressent et la fumée provenant des nombreuses usines est omniprésente.
  <br><br> Dans ce jeu, vous aurez la possibilité d'incarner 3 personnages vivant dans la ville de Nove. Leur objectif commun est de parcourir le plus de distance possible dans la zone
   industrielle de la ville de Nove. Car une rumeur raconte qu'il y aurait à l'intérieur de cette immense zone industrielle un hangar contenant une richesse inestimable. 
   Mais attention, la zone est très surveillée et pour éviter de se faire attraper, ils ne s'accordent qu'un temps très limité pour explorer la zone. <br><br>Vous allez donc devoir être très
   rapide pour parcourir la plus grande distance possible. Certains éléments sur votre parcours pourront vous aider à gagner du temps ou au contraire vous ralentir dans votre mission.</p>
  <br><iframe id="video" width="750" height="422" src="https://www.youtube.com/embed/ER0XfOSfTao" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <h2>Les personnages :</h2><br>
  <p>Dans ChronoRun, vous pourrez choisir entre 3 personnages dans le menu d'options du jeu. Ces trois personnages habitent tous dans la ville de Nove. Les liens entre eux sont très forts, car ils se connaissent depuis la naissance. Ils ont grandi ensemble et une chose n'a jamais changé en eux, c'est leur curiosité et leur courage d'acier.
  <br>Si vous désirez plus en connaître à propos de ces personnages, passer votre souris sur les cartes ci-dessous.</p>
  <div class="card">
      <div class="circle"></div>
      <div class="content">
      <h2 class="title_card"><br>Andrew</h2>
      <p class="text_card">Aussi connu sous le nom de CyBurger pour sa forte attirance envers les fastfoods de qualité douteuse. Andrew apparaît comme le leader de ce groupe.
      Toujours motivé pour de nouvelles aventures. C'est lui qui a donné l'envie au reste du groupe de partir à l'exploration dans la zone industrielle de Nove.</p>
      </div>
      <img src='${Perso1}'>
  </div>
  <div class="card">
      <div class="content">
      <h2 class="title_card"><br>Lewis</h2>
      <p class="text_card">C'est lui le blagueur de la bande. Lewis n'en rate jamais une quand il s'agit de donner le sourire à ses camarades. Il veille à la bonne ambiance dans le groupe.
      <br>C'est aussi un grand fan de moto. Parfois, il aimerait pouvoir voyager dans le temps pour rouler sur la route 66 vers Chicago.</p>
      </div>
      <img src='${Perso2}'>
  </div>
  <div class="card">
      <div class="content">
      <h2 class="title_card"><br>Riley</h2>
      <p class="text_card">Elle est la plus jeune du groupe avec ses 21 ans, mais elle ne se laisse pas faire pour autant. S'il le faut, elle n'hésite pas à donner son opinion.<br>
      Grande fan de jeux vidéo et de séries. Elle attend avec impatience la 2953 ème saison de Plus Belle la Vie.</p>
      </div>
      <img src='${Perso3}'>
  </div>
  <h2>A propos de nous :</h2><br>
  <p>Ce site a été réalisé par Loïc Hernaut, Nicolas Dedoyard, Jonathan Van de Vyver et Laurant Vandermeersch. Nous sommes 4 étudiants à l'Institut Paul Lambin en 2ème année d'informatique de gestion. Ce site contenant un jeu a été réalisé dans le cadre d'un projet du cours de développement Web. Nous avions 4 semaines pour réaliser ce projet de A à Z.
  Nous espérons que vous allez apprécier notre travail. Voici nos adresses respectives si vous désirez nous contacter<br><br>
  loic.hernaut@student.vinci.be<br>
  <br>
  nicolas.dedoyard@student.vinci.be<br>
  <br>
  jonathan.vandevyver@student.vinci.be<br>
  <br>
  laurant.vandermeersch@student.vinci.be<br>
  <br>
  <br>- La Team ChronoRun</p>`;

  pageDiv.innerHTML = acceuil;
}

export default AcceuilPage;
