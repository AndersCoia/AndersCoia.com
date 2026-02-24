import { Link } from 'react-router-dom';
import { loadProjects } from '../lib/contentLoader';

export default function ProjectIndex() {
  const projects = loadProjects();

  return (
	<main className="container">
  	<h1 className="site-title">Selected Work</h1>
  	<ul className="grid">
    	{projects.map(p => (
      	<li key={p.slug} className="card">
        	<Link to={`/work/${p.slug}`} className="card-link">
          	{p.images.thumb && (
            	<img src={p.images.thumb.url} alt={p.coverAlt || p.title} className="card-thumb" />
          	)}
          	<div className="card-meta">
            	<h2>{p.title}</h2>
            	<p>{p.summary}</p>
            	{p.tags?.length ? <small>{p.tags.join(' · ')}</small> : null}
          	</div>
        	</Link>
      	</li>
    	))}
  	</ul>
	</main>
  );
}

