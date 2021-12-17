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

  <h2>The characters :</h2>
  
  <br>

  <p>
    In ChronoRun, you can choose between three characters in the game's options menu. These three characters all live in the city of Nove. 
    The bond between them is very strong, as they have known each other since birth. They have grown up together and one thing has never changed in them: their curiosity and 
    their courage of steel.<br>
    If you want to know more about these characters, move your mouse over the cards below.
  </p>
  <div class="card">
      <div class="circle"></div>
      <div class="content">
      <h2 class="title_card"><br>Andrew</h2>
      <p class="text_card">Also known as CyBurger for its strong attraction to fast food of questionable quality. Andrew appears to be the leader of this group.
      Always motivated for new adventures. He is the one who inspired the rest of the group to explore the industrial area of Nove.</p>
      </div>
      <img src='${Perso1}'>
  </div>
  <div class="card">
      <div class="content">
      <h2 class="title_card"><br>Lewis</h2>
      <p class="text_card">He's the joker of the bunch. Lewis never misses a beat when it comes to putting a smile on his friends' faces. He keeps the group happy.<br>
      He's also a big motorbike fan. Sometimes he wishes he could go back in time and ride Route 66 to Chicago.</p>
      </div>
      <img src='${Perso2}'>
  </div>
  <div class="card">
      <div class="content">
      <h2 class="title_card"><br>Riley</h2>
      <p class="text_card">She is the youngest of the group at 21 years old, but she doesn't let that stop her. If necessary, she does not hesitate to give her opinion.<br>
      A big fan of video games and series. She is looking forward to the 2953rd season of Plus Belle la Vie.</p>
      </div>
      <img src='${Perso3}'>
  </div>
  <h2>About us :</h2><br>
  <p>
    This website was created by Loïc Hernaut, Nicolas Dedoyard, Jonathan Van de Vyver and Laurent Vandermeersch. We are 4 students at the Institut Paul Lambin in our 2nd year 
    in computer science management. This website containing a game was created as part of a project for the web development course. We had 4 weeks to realize this project from A to Z.
    We hope you will enjoy our work. Here are our respective email addresses if you want to contact us<br><br>
    loic.hernaut@student.vinci.be<br>
    <br>
    nicolas.dedoyard@student.vinci.be<br>
    <br>
    jonathan.vandevyver@student.vinci.be<br>
    <br>
    laurant.vandermeersch@student.vinci.be<br>
    <br>
    <br>- The ChronoRun team !!!
  </p>
  `;

  pageDiv.innerHTML = acceuil;
}

export default HomePage;
