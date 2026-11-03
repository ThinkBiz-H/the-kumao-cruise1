import { Helmet } from 'react-helmet-async';
import { ogImage } from '../../assets/images';
import { site } from '../../data/siteContent';
import { absoluteUrl } from '../../utils/site';

/**
 * Page-level meta: title, description, canonical, Open Graph, Twitter
 * and optional JSON-LD blocks.
 */
export default function Seo({
  title = site.title,
  description = site.description,
  path = '/',
  image = ogImage,
  schema = [],
}) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image.src);

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="theme-color" content={site.themeColor} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={String(image.width)} />
      <meta property="og:image:height" content={String(image.height)} />
      <meta property="og:image:alt" content={image.alt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={image.alt} />

      {schema.map((block) => (
        <script key={block['@type']} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
