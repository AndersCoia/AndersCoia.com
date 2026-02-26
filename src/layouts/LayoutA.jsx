import ReactMarkdown from 'react-markdown';

export default function LayoutA({ project }) {
  const { title, content, images} = project;

  return (
	<>
  	{images.hero && (
    	<figure className="hero">
      	<img src={images.hero.url} alt={project.coverAlt || `${title} hero`} />
    	</figure>
  	)}
	<article>
  	<header className="page-header">
    	<h1>{title}</h1>
		<span className="break" aria-hidden="true"></span>
  	</header>

  	<section className="copy">
    	<ReactMarkdown>{content}</ReactMarkdown>
  	</section>

  	{images.gallery?.length ? (
    	<section className="gallery grid-3">
      	{images.gallery.map(img => (
        	<img key={img.url} src={img.url} alt={`${title} gallery`} />
      	))}
    	</section>
  	) : null}
	</article>
	</>
  );
}

