import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function SiteNav() {
  return (
	<nav>
  	<ul className="in-nav">
    	<li className="nav-logo">
      	<NavLink to="/" aria-label="Home">
        	<img src="/images/icons/nav-logo.svg" alt="" />
      	</NavLink>
    	</li>

    	<li>
      	<NavLink to="/about" className={({ isActive }) => (isActive ? "nav-active" : "")}>
        	About
      	</NavLink>
    	</li>

    	<li>
      	<NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-active" : "")}>
        	Contact
      	</NavLink>
    	</li>
  	</ul>
	</nav>
  );
}
