/**
 * Render the Navbar
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */
 import { getSessionObject } from "../../utils/session"; // destructuring assignment ("{}": see MDN for more info ; )
 const Navbar = () => {
  const navbarWrapper = document.querySelector("#navbarWrapper");
  let navbar;
  let user = getSessionObject("user");
  navbar = `  
  <nav id="navbar">
    <div id="navbarSupportedContent">
      <ul>
        <li>
          <a aria-current="page" href="#" data-uri="/">Home</a>
        </li>
        <li>
          <a aria-current="page" href="#" data-uri="/score">Scores</a>
        </li>`;
        if(!user){
          navbar += 
          `<li>
            <a href="#" data-uri="/login">Login</a>
           </li>
          <li>
            <a href="#" data-uri="/register">Register</a>
          </li>`;
        } else {
          navbar +=
          `<li>
              <a href="#" data-uri="/game">Game</a>
           </li>
           <li>
              <a href="#" data-uri="/logout">Logout (${user.username})</a>
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
