import { Routes, Route, Navigate } from "react-router-dom";

import SiteFooter from "./components/SiteFooter.jsx";

import ProjectIndex from "./routes/ProjectIndex.jsx";
import ProjectPage from "./routes/ProjectPage.jsx";

// Temporary placeholders (create these files next)
import About from "./routes/About.jsx";
import Contact from "./routes/Contact.jsx";

export default function App() {
  return (
	<>
  	

  	<Routes>
    	<Route path="/" element={<ProjectIndex />} />
    	<Route path="/work/:slug" element={<ProjectPage />} />

    	<Route path="/about" element={<About />} />
    	<Route path="/contact" element={<Contact />} />

    	<Route path="*" element={<Navigate to="/" replace />} />
  	</Routes>

  	<SiteFooter />
	</>
  );
}


