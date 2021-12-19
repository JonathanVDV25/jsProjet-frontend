/**
 * Render the HomePage
 */
import { getSessionObject } from "../../utils/session";
import LogoHomePage from "../../img/chrono2.png";

async function ScoresPage() {
  // reset #page div
  document.querySelector("main").className = 'scores';
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `<div> <img class="logo" src='${LogoHomePage}' alt='imageLogo'> </div>`;
  pageDiv.innerHTML += `<div><h1 id='title_score'>Welcome to ChronoRuns scoreboard</h1> </div>`;
  pageDiv.innerHTML += "<div id='scoreboard'> </div>";

  const user = getSessionObject("user");

  try {
    // hide data to inform if the leaderboard is already printed
    const response = await fetch("/api/scores");
    console.log("response:", response);

    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const scores = await response.json(); // we wait for the scores
    scores.sort(function (a, b) {
      return Number(b.distance) - Number(a.distance);
    });

    const higscore = scores.slice(0, 10); //Shows only top 10 scores

    const tableWrapper = document.createElement("div");
    tableWrapper.className = "container";

    const table = document.createElement("table");
    table.className = "table table-dark";
    tableWrapper.appendChild(table);

    const thead = document.createElement("thead");
    const header = document.createElement("tr");
    thead.appendChild(header);
    const header1 = document.createElement("th");

    header1.innerText = "Username";
    const header2 = document.createElement("th");

    header2.innerText = "Best distance";

    header.appendChild(header1);
    header.appendChild(header2);

    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    let you = false;
    higscore.forEach((score) => {
      if(user && score.name === user.username){
        you = true;
      } else {
        you = false;
      }

      const line = document.createElement("tr");
      const nameCell = document.createElement("td");
      const scoreCell = document.createElement("td");
      if(you){
        nameCell.innerHTML = `<b> ${score.name} <i>(you)</i></b>`;
        nameCell.className ="text-warning";
        scoreCell.innerHTML = `<b> ${score.distance} </b>`;
      } else {
        nameCell.innerText = score.name;
        scoreCell.innerText = score.distance;
      }
      line.appendChild(nameCell);
      line.appendChild(scoreCell);
      tbody.appendChild(line);
    });
    table.appendChild(tbody);

    tableWrapper.innerHTML += "</br></br></br>";
    pageDiv.appendChild(tableWrapper);
    
  } catch (error) {
    console.error("scoreView::error: ", error);
  }

  if (user) {
    try {
      const response = await fetch("/api/scores/" + user.username); // we wait for the response : promise

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const score = await response.json();
      console.log(score.distance);

      const tableWrapper = document.createElement("div");
      tableWrapper.className = "container";

      const table = document.createElement("table");
      table.className = "table table-dark";
      tableWrapper.appendChild(table);
      const thead = document.createElement("thead");
      const header = document.createElement("tr");
      thead.appendChild(header);
      const header1 = document.createElement("th");

      header1.innerText = "Personal best distance";

      header.appendChild(header1);

      table.appendChild(thead);
      const tbody = document.createElement("tbody");

      const line = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.innerText = score.distance;
      line.appendChild(nameCell);
      tbody.appendChild(line);

      table.appendChild(tbody);

      pageDiv.appendChild(tableWrapper);
    } catch (error) {
      console.log("failed");
    }
  }
}

export default ScoresPage;
