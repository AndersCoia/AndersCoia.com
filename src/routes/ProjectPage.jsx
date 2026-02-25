import { useMemo, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { loadProjectIndex, loadProjectBody } from "../lib/contentLoader";
import LayoutA from "../layouts/LayoutA.jsx";
import LayoutB from "../layouts/LayoutB.jsx";
import LayoutC from "../layouts/LayoutC.jsx";
import SiteNav from "../components/SiteNav.jsx";

const layouts = { A: LayoutA, B: LayoutB, C: LayoutC };

export default function ProjectPage() {
  const { slug } = useParams();
  const projects = useMemo(() => loadProjectIndex(), []);
  const project = projects.find((p) => p.slug === slug);

  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
	let cancelled = false;

	async function run() {
  	if (!project) return;
  	setLoading(true);
  	try {
    	const md = await loadProjectBody(project.mdPath);
    	if (!cancelled) setBody(md);
  	} finally {
    	if (!cancelled) setLoading(false);
  	}
	}

	run();
	return () => {
  	cancelled = true;
	};
  }, [project]);

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
	<>
	<SiteNav />
	<main className="container">
  	{loading ? <p>Loading…</p> : <Layout project={{ ...project, content: body }} />}

  	<nav className="post-nav">
    	<Link to="/">← Back</Link>
  	</nav>
	</main>
	</>
  );
}

