import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
/**
 * View the Register form :
 * render a register page into the #page div (formerly render function)
 */
function RegisterPage() {
  document.querySelector("main").className = 'log';
  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "";

  const errorAlert = document.createElement("div");
  errorAlert.innerHTML = "";
  pageDiv.appendChild(errorAlert);
  // create a login form
  // inspiration of a part of the code of Raphael Baroni's login
  // link :https://github.com/e-vinci/js-demos/spa/spa-essentials/step4/
  const form = document.createElement("form");
  form.className = "p-5";
  form.innerHTML += `<h1> Register </h1>`;
  const username = document.createElement("input");
  username.type = "text";
  username.id = "username";
  username.placeholder = "username";
  username.required = true;
  username.className = "form-control mb-3";
  const password = document.createElement("input");
  password.type = "password";
  password.id = "password";
  password.required = true;
  password.placeholder = "password";
  password.className = "form-control mb-3";
  const submit = document.createElement("input");
  submit.value = "Register";
  submit.type = "submit";
  submit.className = "btn btn-danger";
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submit);

  form.addEventListener("submit", onSubmit);
  pageDiv.appendChild(form);

  async function onSubmit(e) {
    e.preventDefault();
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    console.log("credentials", username.value);
    try {
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/users/register", options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const user = await response.json(); // json() returns a promise => we wait for the data
      console.log("user authenticated", user);
      // save the user into the localStorage
      setSessionObject("user", user);

      // Rerender the navbar for an authenticated user : temporary step prior to deal with token
      Navbar({ isAuthenticated: true });

      // add a default score of 0

      const defaultScore = {
        method: "POST", 
        body: JSON.stringify({
          name: username.value,
          distance: 0,
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      };

      const baseScore = await fetch("/api/scores", defaultScore);

      if (!baseScore.ok) {
        throw new Error(
          "fetch error : " + baseScore.status + " : " + baseScore.statusText
        );
      }

      // call the HomePage via the Router
      Redirect("/game");
    } catch (error) {
      errorAlert.className = "alert alert-danger";
      if(error.message.includes("411")) {
        errorAlert.innerText = "Password too weak.";
      } else {
        errorAlert.innerText = "Registration failed! Maybe try another username.";
      }
      console.error("RegisterPage::error: ", error);
    }
  }
}

export default RegisterPage;
