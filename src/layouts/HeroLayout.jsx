import { useMemo } from "react";
import { Prose, Downloads, BottomGallery } from "./ProjectParts.jsx";

function splitIntoBlocks(md) {
  const lines = (md || "").split("\n");
  const blocks = [];
  let buf = [];

  const flush = () => {
	const s = buf.join("\n").trim();
	if (s) blocks.push(s);
	buf = [];
  };

  for (const line of lines) {
	if (line.trim() === "") flush();
	else buf.push(line);
  }
  flush();

  return blocks;
}

/**
* Row directives (put at the top of a block):
*  - <!-- no-image -->
*  - <!-- image: gallery-03.jpg -->
*  - <!-- row: 50-50 | 70-img | 70-text -->
*/
function parseRowDirectives(block) {
  const lines = block.split("\n");
  let noImage = false;
  let imageFile = null;
  let rowPattern = null; // "50-50" | "70-img" | "70-text"

  // Consume directive lines at the top of the block
  while (lines.length && lines[0].trim().startsWith("<!--")) {
	const first = lines[0].trim();

	if (first === "<!-- no-image -->") {
  	noImage = true;
  	lines.shift();
  	continue;
	}

	const imgMatch = first.match(/^<!--\s*image:\s*([^\s]+)\s*-->$/i);
	if (imgMatch) {
  	imageFile = imgMatch[1];
  	lines.shift();
  	continue;
	}

	const rowMatch = first.match(/^<!--\s*row:\s*([a-z0-9-]+)\s*-->$/i);
	if (rowMatch) {
  	const value = rowMatch[1].toLowerCase();
  	if (value === "50-50" || value === "70-img" || value === "70-text") {
    	rowPattern = value;
  	}
  	lines.shift();
  	continue;
	}

	// Unknown comment — stop consuming further comments
	break;
  }

  return {
	text: lines.join("\n").trim(),
	noImage,
	imageFile,
	rowPattern,
  };
}

function columnsForRow(rowIndex, rowPatternOverride) {
  // If author provided an override, respect it
  const p = rowPatternOverride;

  if (p === "50-50") return { img: 50, text: 50 };
  if (p === "70-img") return { img: 70, text: 30 };
  if (p === "70-text") return { img: 30, text: 70 };

  // Default repeating pattern (0,1,2)
  const pattern = rowIndex % 3;
  if (pattern === 0) return { img: 50, text: 50 };
  if (pattern === 1) return { img: 70, text: 30 };
  return { img: 30, text: 70 };
}

export default function HeroLayout({ project }) {
  const { title, summary, content, images, downloads, bottomGallery } = project;

  const blocks = useMemo(() => splitIntoBlocks(content), [content]);
  const overview = blocks[0] || "";
  const rawSections = blocks.slice(1);

  /**
   * Precompute rows in a pure way (no mutation/cursors).
   * - Derive gallery inside this memo.
   * - Build a prefix count of eligible auto-image rows to select the k-th gallery image.
   */
  const rows = useMemo(() => {
	const gallery = images?.gallery || [];

	// Parse all directives first (stable array)
	const parsed = rawSections.map((block) => parseRowDirectives(block));

	// Mark which rows are eligible to auto-pair an image
	const eligible = parsed.map(
  	(p) => !!p.text && !p.noImage && !p.imageFile
	);

	// Build prefix counts: how many eligible rows have occurred before index i
	const prefixEligibleCount = new Array(eligible.length).fill(0);
	for (let i = 1; i < eligible.length; i += 1) {
  	prefixEligibleCount[i] = prefixEligibleCount[i - 1] + (eligible[i - 1] ? 1 : 0);
	}

	// Build final row descriptors
	return parsed.map((p, i) => {
  	if (!p.text) {
    	return { key: `${i}-empty`, isEmpty: true };
  	}

  	const flip = i % 2 === 1;

  	// Choose image
  	let img = null;
  	if (!p.noImage) {
    	if (p.imageFile) {
      	img = gallery.find((g) => g.fileName === p.imageFile) || null;
    	} else if (eligible[i]) {
      	const k = prefixEligibleCount[i]; // the k-th eligible row
      	if (k < gallery.length && k < 6) {
        	img = gallery[k];
      	}
    	}
  	}

  	// Determine widths for this row (override if provided)
  	const { img: imgW, text: textW } = columnsForRow(i, p.rowPattern);

  	// If no image, full-width text row
  	const gridTemplate = img
    	? (flip ? `${textW}% ${imgW}%` : `${imgW}% ${textW}%`)
    	: "1fr";

  	return {
    	key: `${i}-${p.imageFile || "auto"}`,
    	text: p.text,
    	img,
    	flip,
    	gridTemplate,
    	isTextOnly: !img,
  	};
	});
  }, [rawSections, images]); // images is safe; we re-derive gallery inside

  return (
	<>
	{images?.hero && (
    	<figure className="hero-full reveal">
      	<img src={images.hero.url} alt={project.coverAlt || title} />
    	</figure>
  	)}
	<article className="project hero-layout">
  	
  	<header className="project-header reveal reveal-delay-1">
    	<h1 className="project-title">{title}</h1>
		<span className="break" aria-hidden="true"></span>
    	{summary ? <p className="project-summary">{summary}</p> : null}
  	</header>

  	{overview ? (
    	<Prose className="project-overview reveal reveal-delay-1">{overview}</Prose>
  	) : null}

  	{/* Alternating rows */}
  	<section className="hero-rows">
    	{rows.map((row) => {
      	if (row.isEmpty) return null;
      	const { key, img, flip, gridTemplate, text, isTextOnly } = row;

      	return (
        	<div
          	key={key}
          	className={`hero-row reveal reveal-delay-2 ${isTextOnly ? "hero-row--textOnly" : ""}`}
          	style={{ gridTemplateColumns: gridTemplate }}
        	>
          	{img ? (
            	<>
              	{!flip ? (
                	<figure className="hero-row__media">
                  	<img src={img.url} alt="" loading="lazy" decoding="async" />
                	</figure>
              	) : null}

              	<div className="hero-row__text">
                	<Prose>{text}</Prose>
              	</div>

              	{flip ? (
                	<figure className="hero-row__media">
                  	<img src={img.url} alt="" loading="lazy" decoding="async" />
                	</figure>
              	) : null}
            	</>
          	) : (
            	<div className="hero-row__text">
              	<Prose>{text}</Prose>
            	</div>
          	)}
        	</div>
      	);
    	})}
  	</section>

  	{/* Downloads + Bottom gallery with reveal animation */}
  	{Array.isArray(downloads) && downloads.length > 0 ? (
    	<div className="reveal reveal-delay-2">
      	<Downloads downloads={downloads} />
    	</div>
  	) : null}

  	{bottomGallery ? (
    	<div className="reveal reveal-delay-3">
      	<BottomGallery images={images} enabled={bottomGallery} />
    	</div>
  	) : null}
	</article>
	</>
  );
}
