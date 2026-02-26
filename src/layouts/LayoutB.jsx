export default function LayoutB({ project }) {
  const { title, images } = project;

  return (
	<article className="layoutB">
  	<header className="page-header"><h1>{title}</h1>
	<span className="break" aria-hidden="true"></span></header>

  	<section className="mosaic">
    	{/* Wide banners */}
    	{images.wide?.map(img => (
      	<img key={img.url} className="mosaic-wide" src={img.url} alt={`${title} wide`} />
    	))}
    	{/* Gallery tiles */}
    	{images.gallery?.map((img, i) => (
      	<img key={img.url} className={`mosaic-tile tile-${(i % 6) + 1}`} src={img.url} alt={`${title} gallery`} />
    	))}
    	{/* Details at the end */}
    	{images.details?.map(img => (
      	<img key={img.url} className="mosaic-detail" src={img.url} alt={`${title} detail`} />
    	))}
  	</section>
	</article>
  );
}

