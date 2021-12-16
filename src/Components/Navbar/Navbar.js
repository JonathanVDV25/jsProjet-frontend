// When using Bootstrap to style components, the CSS is imported in index.js
// However, the JS has still to be loaded for each Bootstrap's component that needs it.
// Here, because our JS component 'Navbar' has the same name as Navbar Bootstrap's component
// we change the name of the imported Bootstrap's 'Navbar' component
import { Navbar as BootstrapNavbar} from "bootstrap";

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */
 import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
 const Navbar = () => {
  const navbarWrapper = document.querySelector("#navbarWrapper");
  let navbar;
  let user = getSessionObject("user");
  //if (!user) {
  navbar = `  
  <nav class="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-1">
        <li class="nav-item">
          <a class="nav-link text-light" aria-current="page" href="#" data-uri="/">Acceuil</a>
        </li>`;
        if(!user){
          console.log("here1");
          navbar += 
          `<li class="nav-item">
            <a class="nav-link text-light" href="#" data-uri="/login">Login</a>
           </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#" data-uri="/register">Register</a>
          </li>`;
        } else {
          console.log("here2");
          navbar +=
          `<li class="nav-item">
              <a class="nav-link text-light" href="#" data-uri="/game">Jeu</a>
           </li>
           <li class="nav-item">
              <a class="nav-link text-light" aria-current="page" href="#" data-uri="/score">Score</a>
            </li>
           <li class="nav-item">
              <a class="nav-link text-light" href="#" data-uri="/logout">Logout</a>
           </li>`;
        }
        navbar+=
        `
      </ul>          
    </div>
  </nav>`;
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
