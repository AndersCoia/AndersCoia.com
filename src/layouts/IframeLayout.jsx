import { Prose, Downloads, BottomGallery } from "./ProjectParts.jsx";

export default function IframeLayout({ project }) {
  const {
	title,
	summary,
	content,
	images,
	downloads,
	bottomGallery,
	iframeUrl,
	iframeTitle,
	iframeHeight,
  } = project;

  return (
	<article className="project iframe-layout">
		{iframeUrl ? (
    	<section className="iframe-wrap reveal reveal-delay-2">
      	<iframe
        	src={iframeUrl}
        	title={iframeTitle || title}
        	style={{ height: iframeHeight ? `${iframeHeight}px` : undefined }}
        	loading="lazy"
        	allow="fullscreen; clipboard-read; clipboard-write"
      	/>
    	</section>
  	) : (
    	<p className="reveal reveal-delay-2">
      	No iframeUrl provided. Add <code>iframeUrl</code> to frontmatter.
    	</p>
  	)}
  	<header className="project-header reveal">
    	<h1 className="project-title">{title}</h1>
		<span className="break" aria-hidden="true"></span>
    	{summary ? <p className="project-summary">{summary}</p> : null}
  	</header>

  	{content ? <Prose className="reveal reveal-delay-1">{content}</Prose> : null}

  	

  	<Downloads downloads={downloads} />
  	<BottomGallery images={images} enabled={bottomGallery} />
	</article>
  );
}
