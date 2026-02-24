import fm from 'front-matter';

// Glob all markdown files as RAW TEXT
const mdFiles = import.meta.glob('../content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

// Glob all images as URLs
const allImages = import.meta.glob('../assets/portfolio/**/*.{jpg,jpeg,png,webp,gif}', {
  eager: true,
  as: 'url',
});

// Utility: numeric sort by indexes in filenames
const extractIndex = (name) => {
  const m = name.match(/(?:^|[-_])(\d{1,3})(?=[^-_]*\.)/);
  return m ? Number(m[1]) : Infinity;
};

const roleFromName = (filename) => {
  const f = filename.toLowerCase();
  if (f.includes('hero')) return 'hero';
  if (f.includes('thumb') || f.includes('cover')) return 'thumb';
  if (f.includes('wide') || f.includes('banner')) return 'wide';
  if (f.includes('detail') || f.includes('close')) return 'detail';
  if (/gallery|img[-_]\d+|(^|\D)\d{1,3}(\D|$)/.test(f)) return 'gallery';
  return 'other';
};

export function loadProjects() {
  const projects = [];

  for (const [path, raw] of Object.entries(mdFiles)) {
	const parsed = fm(raw);
    const frontmatter = parsed.attributes;
    const content = parsed.body;

	const slug = frontmatter.slug;
	const imagesDir = (frontmatter.imagesDir || '').replace(/^\/?src\//, '../'); // normalize

	const images = Object.entries(allImages)
  	.filter(([imgPath]) => imgPath.startsWith(imagesDir))
  	.map(([imgPath, url]) => {
    	const fileName = imgPath.split('/').pop();
    	const role = roleFromName(fileName);
    	return { url, fileName, role, index: extractIndex(fileName) };
  	});

	const hero = images.find((i) => i.role === 'hero');
	const thumb = images.find((i) => i.role === 'thumb') || hero;
	const wide = images.filter((i) => i.role === 'wide');
	const gallery = images
  	.filter((i) => i.role === 'gallery')
  	.sort((a, b) => a.index - b.index);
	const details = images.filter((i) => i.role === 'detail');

	projects.push({
  	...frontmatter,
  	slug,
  	content,
  	images: { hero, thumb, wide, gallery, details, all: images },
	});
  }

  projects.sort((a, b) => new Date(b.date) - new Date(a.date));
  return projects;
}

