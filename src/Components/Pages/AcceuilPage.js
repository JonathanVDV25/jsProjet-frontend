import LogoHomePage from "../../img/chrono2.png";

function AcceuilPage() {
  document.querySelector("main").className = 'simple';
  const pageDiv = document.querySelector("#page");
  let acceuil;
  acceuil =
  `<img class="logo" src='${LogoHomePage}' alt='imageLogo'>
  <h1 class="titre">[ ChronoRun ]</h1><br>
  <p>ChronoRun est un jeu de plateforme dans un univers CyberPunk. Nous sommes alors en 2612 et la technologie a fait d'énorme progrès. 
  Mais ces nouvelles technologies bien qu'elles soient devenues indispensables dans cette société sont aussi source de beaucoup de pollution. Le nombres d'usines ne cesse d'augmenter. 
  Ce qui donne lieu à des zones industrieles de plus en plus grandes. Même dans le centre ville, la polution se ressent et la fumée provenant des nombreuses usines est omniprésente.
  <br><br> Dans ce jeu, vous aurez la possibilité d'incarner 3 personnages vivant dans la ville de Nove. Leur objectif commun est de parcourir le plus de distance possible dans la zone
   industrielle de la ville de Nove. Car une rumeur raconte qu'il y aurait à l'intérieur de cette imense zone industrielle un hangar contenant une richesse inestimable. 
   Mais attention, la zone est très surveillée et pour éviter de se faire attraper, ils ne s'accordent qu'un temps très limité pour explorer la zone. <br><br>Vous allez donc devoir être très
   rapide pour parcourir la plus grande distance possible. Certains éléments sur votre parcour pourront vous aider à gagner du temps ou au contraire vous ralentir dans votre mission.</p>
  <br><iframe id="video" width="750" height="422" src="https://www.youtube.com/embed/ER0XfOSfTao" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;

  pageDiv.innerHTML = acceuil;
}

export default AcceuilPage;
