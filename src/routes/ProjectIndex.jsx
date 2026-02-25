import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadProjectIndex } from "../lib/contentLoader";
import useBodyClass from "../lib/useBodyClass";

function getProjectImage(p) {
  // Prefer thumb, fallback to hero
  return p.images?.thumb || p.images?.hero || null;
}

export default function ProjectIndex() {
  // Apply your gradient homepage theme
  useBodyClass("bg");

  // Optional: match old site title on home
  useEffect(() => {
	document.title = "Design by Anders Coia";
  }, []);

  const projects = useMemo(() => loadProjectIndex(), []);

  // Separate Featured and All
  const featuredProjects = useMemo(
	() => projects.filter((p) => p.featured),
	[projects]
  );

  const allProjects = useMemo(
	() => projects.filter((p) => !p.featured),
	[projects]
  );

  // Build tag list from ALL projects (or only non-featured if you prefer)
  const tags = useMemo(() => {
	const set = new Set();
	projects.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
	return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [projects]);

  const [activeTag, setActiveTag] = useState("All");

  const filteredAllProjects = useMemo(() => {
	if (activeTag === "All") return allProjects;
	return allProjects.filter((p) => (p.tags || []).includes(activeTag));
  }, [activeTag, allProjects]);

  return (
	<>
  	{/* If you build a HomeNav component later, put it here */}
  	{/* <HomeNav /> */}

  	<main className="home-page">
    	<h1>HI I'M ANDERS, A DESIGNER WORKING ACROSS WEB, GRAPHIC DESIGN AND UX</h1>

    	<span className="break" aria-hidden="true"></span>

    	{/* ---------- FEATURED ---------- */}
    	<h2>FEATURED</h2>
    	<span className="break" aria-hidden="true"></span>

    	<section className="featured-section">
      	{featuredProjects.length === 0 ? (
        	<p>Add <strong>featured: true</strong> to a project frontmatter to show it here.</p>
      	) : (
        	featuredProjects.map((p) => {
          	const img = getProjectImage(p);
          	return (
            	<aside key={p.slug} className="featured-card">
              	<Link to={`/work/${p.slug}`}>
                	<figure>
                  	{img ? (
                    	<img
                      	src={img.url}
                      	alt={p.coverAlt || p.title}
                      	loading="eager"
                    	/>
                  	) : null}

                  	<h3>{p.title}</h3>
                  	{p.summary ? <p>{p.summary}</p> : null}
                  	{p.date ? <p>{p.date}</p> : null}
                	</figure>
              	</Link>
            	</aside>
          	);
        	})
      	)}
    	</section>

    	{/* ---------- ALL PROJECTS + FILTERS ---------- */}
    	<span className="break" aria-hidden="true"></span>

    	<h2>PROJECTS</h2>
    	<span className="break" aria-hidden="true"></span>

    	<div className="tag-filters" role="tablist" aria-label="Filter projects by tag">
      	{tags.map((tag) => (
        	<button
          	key={tag}
          	type="button"
          	className={`tag-pill ${activeTag === tag ? "active" : ""}`}
          	onClick={() => setActiveTag(tag)}
          	aria-pressed={activeTag === tag}
        	>
          	{tag}
        	</button>
      	))}
    	</div>

    	<section>
      	{filteredAllProjects.map((p) => {
        	const img = getProjectImage(p);
        	return (
          	<aside key={p.slug}>
            	<Link to={`/work/${p.slug}`}>
              	<figure>
                	{img ? (
                  	<img
                    	src={img.url}
                    	alt={p.coverAlt || p.title}
                    	loading="lazy"
                    	decoding="async"
                  	/>
                	) : null}

                	<h3>{p.title}</h3>
                	{p.date ? <p>{p.date}</p> : null}
              	</figure>
            	</Link>
          	</aside>
        	);
      	})}
    	</section>
  	</main>
	</>
  );
}


