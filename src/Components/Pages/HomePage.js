/**
 * Render the HomePage
 */
import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { getSessionObject } from "../../utils/session";
import LogoHomePage from "../../img/chrono2.png";

async function HomePage() {
  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = `<div> <img id='logoHomePage' src='${LogoHomePage}' alt='imageLogo'> </div>`;
  pageDiv.innerHTML += `<div><h1 id='test'>Bienvenue sur le scoreboard de ChronoRun</h1> </div>`;
  pageDiv.innerHTML += "<div id='scoreboard'> </div>";

  try {
    // hide data to inform if the leaderboard is already printed
    const response = await fetch("/api/scores");
    console.log("response:", response);

    if (!response.ok) {
      // status code was not 200, error status code
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const scores = await response.json(); // json() returns a promise => we wait for the data
    scores.sort(function (a, b) {
      return Number(b.distance) - Number(a.distance);
    });

    const higscore = scores.slice(0, 10); //Shows only top 10 scores

    // create a wrapper to provide a responsive table
    const tableWrapper = document.createElement("div");
    tableWrapper.className = "container";

    // create an HTMLTableElement dynamically, based on the scores data (Array of Objects)
    const table = document.createElement("table");
    table.className = "table table-dark";
    tableWrapper.appendChild(table);
    // deal with header
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
    // deal with data rows for tbody
    const tbody = document.createElement("tbody");
    higscore.forEach((score) => {
      const line = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.innerText = score.name;
      line.appendChild(nameCell);
      const scoreCell = document.createElement("td");
      scoreCell.innerText = score.distance;
      line.appendChild(scoreCell);
      // hide info within each row, the pizza id
      //line.dataset.pizzaId = pizza.id;
      tbody.appendChild(line);
    });
    table.appendChild(tbody);
    // add the HTMLTableElement to the main, within the #page div
    tableWrapper.innerHTML += "<br/><br/><br/>";
    pageDiv.appendChild(tableWrapper);
  } catch (error) {
    console.error("scoreView::error: ", error);
  }

  const user = getSessionObject("user");
  if (user) {
    try {
      const response = await fetch("/api/scores/" + user.username); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const score = await response.json();
      console.log(score.distance);

      // create a wrapper to provide a responsive table
      const tableWrapper = document.createElement("div");
      tableWrapper.className = "container";

      // create an HTMLTableElement dynamically, based on the scores data (Array of Objects)
      const table = document.createElement("table");
      table.className = "table table-dark";
      tableWrapper.appendChild(table);
      // deal with header
      const thead = document.createElement("thead");
      const header = document.createElement("tr");
      thead.appendChild(header);
      const header1 = document.createElement("th");

      header1.innerText = "Personal best distance";

      header.appendChild(header1);

      table.appendChild(thead);
      // deal with data rows for tbody
      const tbody = document.createElement("tbody");

      const line = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.innerText = score.distance;
      line.appendChild(nameCell);
      tbody.appendChild(line);

      table.appendChild(tbody);
      // add the HTMLTableElement to the main, within the #page div
      pageDiv.appendChild(tableWrapper);
    } catch (error) {
      console.log("raté");
    }
  }
}

export default HomePage;
