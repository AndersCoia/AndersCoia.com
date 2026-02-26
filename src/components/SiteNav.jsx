import { Link } from "react-router-dom";

export default function SiteNav() {
  return (
	<nav>
  	<ul className="in-nav">
    	<li className="nav-logo">
      	<Link to="/">
        	<img src="/images/icons/nav-logo.svg" alt="Home" />
      	</Link>
    	</li>

    	<li>
      	<Link to="/about">About</Link>
    	</li>

    	<li>
      	<Link to="/contact">Contact</Link>
    	</li>
  	</ul>
	</nav>
  );
}
