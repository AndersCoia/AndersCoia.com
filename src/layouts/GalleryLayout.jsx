import { Prose, Downloads, BottomGallery } from "./ProjectParts.jsx";

export default function GalleryLayout({ project }) {
  const { title, summary, content, images, downloads, bottomGallery } = project;

  return (
	<article className="project gallery-layout">
  	<header className="project-header reveal">
    	<h1 className="project-title">{title}</h1>
		<span className="break" aria-hidden="true"></span>
  	</header>

  	{images?.hero && (
    	<figure className="hero-page reveal reveal-delay-1">
      	<img src={images.hero.url} alt={project.coverAlt || title} />
    	</figure>
  	)}

  	{/* Summary + body copy */}
  	<div className="reveal reveal-delay-2">
    	{summary ? <p className="project-summary">{summary}</p> : null}
    	{content ? <Prose>{content}</Prose> : null}
  	</div>

  	{/* Pinterest style 2-col gallery */}

  	<Downloads downloads={downloads} />
  	<BottomGallery images={images} enabled={bottomGallery} />
	</article>
  );
}
