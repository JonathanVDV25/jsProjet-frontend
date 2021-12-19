import { Redirect } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
/**
 * View the Login form :
 * render a login page into the #page div (formerly login function)
 */
function LoginPage() {
  
  document.querySelector("main").className = 'log';
  const pageDiv = document.querySelector("#page");
  // reset #page div
  pageDiv.innerHTML = "";
  

  const errorAlert = document.createElement("div");
  errorAlert.innerHTML = "";
  pageDiv.appendChild(errorAlert);

  // create a login form
  // inspiration of a part of the code of Raphael Baroni's login
  // link :https://github.com/e-vinci/js-demos/spa/spa-essentials/step4/
  const form = document.createElement("form");
  form.className = "p-5";
  form.innerHTML += `<h1> Login </h1>`;
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
  submit.value = "Login";
  submit.type = "submit";
  submit.className = "btn btn-primary";
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submit);

  form.addEventListener("submit", onSubmit);
  pageDiv.appendChild(form);


  async function onSubmit(e) {
    e.preventDefault();
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    console.log("credentials", username.value, password.value);
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("/api/users/login", options); // we wait for the response
      if (!response.ok) {
        errorAlert.className = "alert alert-danger";
        errorAlert.innerText = "Login failed !";
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const user = await response.json(); // we wait for the user
      console.log("user authenticated", user);  

      setSessionObject("user", user);

      Navbar({ isAuthenticated: true });

      Redirect("/game");
    } catch (error) {
      console.error("LoginPage::error: ", error);
    }
  }
}

export default LoginPage;
