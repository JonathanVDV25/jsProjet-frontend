import LogoHomePage from "../../img/chrono2.png";
import Perso1 from "../../img/perso_1_modif.png";
import Perso2 from "../../img/perso_2_modif.png";
import Perso3 from "../../img/perso_3_modif.png";

function HomePage() {
  document.querySelector("main").className = 'simple';
  const pageDiv = document.querySelector("#page");
  let acceuil;
  acceuil =
  `<img class="logo" src='${LogoHomePage}' alt='imageLogo'>

  <h1 class="titre">[ ChronoRun ]</h1><br>

  <p>
    ChronoRun is a platform game set in a CyberPunk universe. We are in 2612 and technology has made enormous progress. But these new technologies, 
    although they have become essential in this society, are also generating a lot of pollution. The number of factories continues to increase. 
    This gives rise to increasingly large industrial zones. Even in the city center, the pollution is felt and the smoke from the factories is omnipresent.

    <br><br> 
    
    In this game, you will have the opportunity to play as 3 characters living in the town of Nove. Their common goal is to travel as far as possible 
    in the industrial area of Nove. Because a rumor goes that there would be inside this immense industrial zone a hangar containing an inestimable wealth. 
    But be careful, the area is very guarded and to avoid getting caught, they only allow themselves a very limited time to explore the area. 

    <br><br>
    
    You will therefore have to be very fast to cover the greatest possible distance. Certain elements on your route may help you save time or conversely 
    slow you down in your mission.
  </p>

  <br>
  
  <iframe id="video" width="750" height="422" src="https://www.youtube.com/embed/ER0XfOSfTao" title="YouTube video player" frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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
  <br>- La Team ChronoRun</p>
  `;

  pageDiv.innerHTML = acceuil;
}

export default HomePage;
