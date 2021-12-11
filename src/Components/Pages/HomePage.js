/**
 * Render the HomePage
 */
import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";

function HomePage() {
  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "";

  try {
    // hide data to inform if the leaderboard is already printed
    const response = fetch("/api/score.http"); 

    if (!response.ok) {
      // status code was not 200, error status code
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }
    const scores = response.json(); // json() returns a promise => we wait for the data
    // create a wrapper to provide a responsive table
    const tableWrapper = document.createElement("div");
    tableWrapper.className = "table-responsive pt-5";
    // create an HTMLTableElement dynamically, based on the scores data (Array of Objects)
    const table = document.createElement("table");
    table.className = "table table-danger";
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
    scores.forEach((score) => {
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
    pageDiv.appendChild(tableWrapper);
  } catch (error) {
    console.error("scoreView::error: ", error);
  }

}

export default HomePage;
