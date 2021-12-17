import LogoHomePage from "../../img/chrono2.png";

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

  </br></br>

  <p>
    If you have any questions, feel free to contact one of the developers :

    </br></br>

    - laurent.vandermeersch@student.vinci.be

    </br>

    - jonathan.vandevyver@student.vinci.be

    </br>

    - loic.hernaut@student.vinci.be

    </br>

    - nicolas.dedoyard@student.vinci.be
  </p>
  `;

  pageDiv.innerHTML = acceuil;
}

export default HomePage;
