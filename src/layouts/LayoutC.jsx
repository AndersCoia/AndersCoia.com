import ReactMarkdown from 'react-markdown';

export default function LayoutC({ project }) {
  const { title, content, images } = project;

  const pairs = [];
  const sequence = [...(images.gallery || []), ...(images.details || [])];
  for (let i = 0; i < sequence.length; i += 2) {
	pairs.push(sequence.slice(i, i + 2));
  }

  return (
	<article className="layoutC">
  	<header className="page-header">
    	<h1>{title}</h1>
  	</header>

  	{images.hero && (
    	<figure className="hero-full">
      	<img src={images.hero.url} alt={project.coverAlt || `${title} hero`} />
    	</figure>
  	)}

  	<section className="copy wide">
    	<ReactMarkdown>{content}</ReactMarkdown>
  	</section>

  	{pairs.map((pair, idx) => (
    	<section key={idx} className={`split split-${idx % 2 ? 'right' : 'left'}`}>
      	{pair[0] && <img className="split-img" src={pair[0].url} alt={`${title} view`} />}
      	{pair[1] && <img className="split-img" src={pair[1].url} alt={`${title} view`} />}
    	</section>
  	))}
	</article>
  );
}

