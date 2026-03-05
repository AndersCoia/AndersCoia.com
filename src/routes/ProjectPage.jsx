import { useMemo, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { loadProjectIndex, loadProjectBody } from "../lib/contentLoader";

import HeroLayout from "../layouts/HeroLayout.jsx";
import GalleryLayout from "../layouts/GalleryLayout.jsx";
import IframeLayout from "../layouts/IframeLayout.jsx";
import SiteNav from "../components/SiteNav.jsx"

const layouts = {
  hero: HeroLayout,
  gallery: GalleryLayout,
  iframe: IframeLayout,

  // Backward compatibility if some projects still use A/B/C:
  A: HeroLayout,
  B: GalleryLayout,
  C: IframeLayout,
};

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
  	<main>
    	<p>Project not found.</p>
    	<Link to="/">Back to index</Link>
  	</main>
	);
  }

  const Layout = layouts[project.layout] || HeroLayout;

  return (
	<>
	<SiteNav />
	<main>
  	{loading ? <p>Loading…</p> : <Layout project={{ ...project, content: body }} />}

  	<nav className="post-nav">
    	<Link to="/">← Back</Link>
  	</nav>
	</main>
	</>
  );
}
