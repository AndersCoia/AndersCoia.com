import fm from "front-matter";

let _projectIndexCache = null;

// 1) Eager: load markdown RAW so we can build an index (metadata)
const mdIndexFiles = import.meta.glob("../content/projects/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

// 2) Lazy: loaders that can import a single file on demand
const mdLazyLoaders = import.meta.glob("../content/projects/**/*.md", {
  query: "?raw",
  import: "default",
});

// Images: URL map
const allImages = import.meta.glob("../assets/portfolio/**/**/*.{jpg,jpeg,png,webp,gif,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});

// Downloads / extra files (add extensions as needed)
const allDownloads = import.meta.glob(
  "../assets/portfolio/**/**/*.{pdf,zip,mp4,mp3,doc,docx,ppt,pptx,xls,xlsx}",
  { eager: true, query: "?url", import: "default" }
);

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
  // gallery-01, img_03, 001, etc.
  if (/gallery|img[-_]\d+|(^|\D)\d{1,3}(\D|$)/.test(f)) return "gallery";
  return "other";
};

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
  const layout = frontmatter.layout || "hero";

  const dateCandidate = frontmatter.date || "1970-01-01";
  const date = isNaN(new Date(dateCandidate).getTime()) ? "1970-01-01" : dateCandidate;

  const imagesDir = frontmatter.imagesDir || `/src/assets/portfolio/${slug}`;

  // Optional fields used by layouts
  const bottomGallery = frontmatter.bottomGallery ?? false;
  const iframeUrl = frontmatter.iframeUrl || "";
  const iframeTitle = frontmatter.iframeTitle || title;
  const iframeHeight = frontmatter.iframeHeight || "";

  return {
	...frontmatter,
	slug,
	title,
	layout,
	date,
	imagesDir,
	bottomGallery,
	iframeUrl,
	iframeTitle,
	iframeHeight,
  };
}

function buildImages(frontmatter) {
  // Convert e.g. /src/assets/... -> ../assets/... for our import.meta.glob keys
  const imagesDir = frontmatter.imagesDir.replace(/^\/?src\//, "../");

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
  const gallery = images.filter((i) => i.role === "gallery").sort((a, b) => a.index - b.index);
  const details = images.filter((i) => i.role === "detail");

  return { hero, thumb, wide, gallery, details, all: images };
}

function buildDownloads(frontmatter) {
  const imagesDir = frontmatter.imagesDir.replace(/^\/?src\//, "../");

  const files = Object.entries(allDownloads)
	.filter(([p]) => p.startsWith(imagesDir))
	.map(([p, url]) => {
  	const fileName = p.split("/").pop();
  	const ext = fileName.split(".").pop()?.toLowerCase() || "";
  	const label = fileName
    	.replace(/\.[^.]+$/, "")
    	.replace(/[-_]+/g, " ")
    	.replace(/\s+/g, " ")
    	.trim();

  	return { url, fileName, ext, label };
	})
	.sort((a, b) => a.fileName.localeCompare(b.fileName));

  return files;
}

// -------------- Public API --------------

export function loadProjectIndex() {
  if (_projectIndexCache) return _projectIndexCache;

  const projects = [];

  for (const [path, raw] of Object.entries(mdIndexFiles)) {
	const parsed = fm(raw);
	const frontmatterRaw = parsed.attributes || {};
	const frontmatter = normalizeFrontmatter(frontmatterRaw, path);

	projects.push({
  	...frontmatter,
  	mdPath: path,
  	images: buildImages(frontmatter),
  	downloads: buildDownloads(frontmatter),
	});
  }

  projects.sort((a, b) => new Date(b.date) - new Date(a.date));
  _projectIndexCache = projects;
  return projects;
}

export async function loadProjectBody(mdPath) {
  const loader = mdLazyLoaders[mdPath];
  if (!loader) throw new Error(`No markdown loader found for: ${mdPath}`);
  const raw = await loader();
  const parsed = fm(raw);
  return parsed.body || "";
}

export function resetProjectIndexCache() {
  _projectIndexCache = null;
}

if (import.meta.hot) {
  import.meta.hot.accept(() => {
	resetProjectIndexCache();
  });
}
