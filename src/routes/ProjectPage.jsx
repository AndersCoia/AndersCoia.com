import { useParams, Link } from "react-router-dom";
import { loadProjects } from "../lib/contentLoader";
import LayoutA from "../layouts/LayoutA.jsx";
import LayoutB from "../layouts/LayoutB.jsx";
import LayoutC from "../layouts/LayoutC.jsx";

const layouts = { A: LayoutA, B: LayoutB, C: LayoutC };

export default function ProjectPage() {
  const { slug } = useParams();
  const projects = loadProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
	return (
  	<main className="container">
    	<p>Project not found.</p>
    	<Link to="/">Back to index</Link>
  	</main>
	);
  }

  const Layout = layouts[project.layout] || LayoutA;

  return (
	<main className="container">
  	<Layout project={project} />
  	<nav className="post-nav">
    	<Link to="/">← Back</Link>
  	</nav>
	</main>
  );
}

