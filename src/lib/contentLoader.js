import fm from "front-matter";

let _projectIndexCache = null;

// 1) Eager: load markdown RAW so we can build an index (metadata)
const mdIndexFiles = import.meta.glob("../content/projects/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

// 2) Lazy: loaders that can import a single file on demand
const mdLazyLoaders = import.meta.glob("../content/projects/*.md", {
  query: "?raw",
  import: "default",
});

// Images: URL map (these are URLs, images won’t download until used in <img>)
const allImages = import.meta.glob("../assets/portfolio/**/*.{jpg,jpeg,png,webp,gif}", {
  eager: true,
  as: "url",
});

const extractIndex = (name) => {
  const m = name.match(/(?:^|[-_])(\d{1,3})(?=[^-_]*\.)/);
  return m ? Number(m[1]) : Infinity;
};

const roleFromName = (filename) => {
  const f = filename.toLowerCase();
  if (f.includes("hero")) return "hero";
  if (f.includes("thumb") || f.includes("cover")) return "thumb";
  if (f.includes("wide") || f.includes("banner")) return "wide";
  if (f.includes("detail") || f.includes("close")) return "detail";
  if (/gallery|img[-_]\d+|(^|\D)\d{1,3}(\D|$)/.test(f)) return "gallery";
  return "other";
};

// helper: derive slug from filename if missing
const slugFromPath = (path) => {
  const file = path.split("/").pop()?.replace(/\.md$/, "") ?? "untitled";
  return file
	.toLowerCase()
	.trim()
	.replace(/\s+/g, "-")
	.replace(/[^a-z0-9-]/g, "");
};

const titleFromSlug = (slug) =>
  slug
	.split("-")
	.filter(Boolean)
	.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
	.join(" ");

function normalizeFrontmatter(frontmatter, path) {
  const slug = frontmatter.slug || slugFromPath(path);
  const title = frontmatter.title || titleFromSlug(slug);
  const layout = frontmatter.layout || "A";

  // Ensure date sorts safely. Accept real dates; fallback if missing/invalid.
  const dateCandidate = frontmatter.date || "1970-01-01";
  const date = isNaN(new Date(dateCandidate).getTime()) ? "1970-01-01" : dateCandidate;

  // If imagesDir missing, assume folder matches slug
  const imagesDir = frontmatter.imagesDir || `/src/assets/portfolio/${slug}`;

  return { ...frontmatter, slug, title, layout, date, imagesDir };
}

function buildImages(frontmatter) {
  const imagesDirRaw = frontmatter.imagesDir;
  const imagesDir = imagesDirRaw.replace(/^\/?src\//, "../"); // normalize

  const images = Object.entries(allImages)
	.filter(([imgPath]) => imgPath.startsWith(imagesDir))
	.map(([imgPath, url]) => {
  	const fileName = imgPath.split("/").pop();
  	const role = roleFromName(fileName);
  	return { url, fileName, role, index: extractIndex(fileName) };
	});

  const hero = images.find((i) => i.role === "hero") || null;
  const thumb = images.find((i) => i.role === "thumb") || hero || null;
  const wide = images.filter((i) => i.role === "wide");
  const gallery = images
	.filter((i) => i.role === "gallery")
	.sort((a, b) => a.index - b.index);
  const details = images.filter((i) => i.role === "detail");

  return { hero, thumb, wide, gallery, details, all: images };
}

// -------------- Public API --------------

// Index: metadata only (fast render for homepage)
export function loadProjectIndex() {
  if (_projectIndexCache) return _projectIndexCache;

  const projects = [];

  for (const [path, raw] of Object.entries(mdIndexFiles)) {
	const parsed = fm(raw);
	const frontmatterRaw = parsed.attributes || {};

	const frontmatter = normalizeFrontmatter(frontmatterRaw, path);

	projects.push({
  	...frontmatter,
  	mdPath: path, // IMPORTANT: used for lazy loading body later
  	images: buildImages(frontmatter),
  	// do NOT include full markdown body here
	});
  }

  projects.sort((a, b) => new Date(b.date) - new Date(a.date));
  _projectIndexCache = projects;
  return projects;
}

// Single project body: load only when needed
export async function loadProjectBody(mdPath) {
  const loader = mdLazyLoaders[mdPath];
  if (!loader) throw new Error(`No markdown loader found for: ${mdPath}`);
  const raw = await loader();
  const parsed = fm(raw);
  return parsed.body || "";
}

// Optional: reset cache (handy for dev/HMR)
export function resetProjectIndexCache() {
  _projectIndexCache = null;
}

// HMR: If markdown files change during `npm run dev`, clear cache automatically
if (import.meta.hot) {
  import.meta.hot.accept(() => {
	resetProjectIndexCache();
  });
}

