import ReactMarkdown from "react-markdown";

export function Prose({ children, className = "" }) {
  return (
	<div className={`prose reveal ${className}`}>
  	<ReactMarkdown>{children}</ReactMarkdown>
	</div>
  );
}

export function Downloads({ downloads }) {
  if (!downloads || downloads.length === 0) return null;

  return (
	<section className="downloads reveal reveal-delay-2">
  	<h3>Files</h3>
  	<ul>
    	{downloads.map((f) => (
      	<li key={f.url}>
        	<a href={f.url} target="_blank" rel="noreferrer">
          	{f.label} <span className="file-ext">({f.ext})</span>
        	</a>
      	</li>
    	))}
  	</ul>
	</section>
  );
}

export function BottomGallery({ images, enabled }) {
  if (!enabled) return null;

  const gallery = images?.gallery || [];
  if (gallery.length === 0) return null;

  return (
	<section className="bottom-gallery reveal reveal-delay-2">
  	<h3>Gallery</h3>
  	<div className="grid-3">
    	{gallery.map((img) => (
      	<img
        	key={img.url}
        	src={img.url}
        	alt=""
        	loading="lazy"
        	decoding="async"
      	/>
    	))}
  	</div>
	</section>
  );
}
