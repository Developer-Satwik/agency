import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
}

export default function SEO({
  title = 'RiseKlix Agency | Instagram & TikTok Growth Experts',
  description = 'We help brands go viral and grow on Instagram and TikTok with targeted short-form content strategies.',
  image = 'https://riseklix.com/images/og-image.jpg',
  article = false,
}: SEOProps) {
  const router = useRouter();
  const canonicalUrl = `https://riseklix.com${router.asPath}`;
  
  // Default metadata
  const defaultTitle = 'RiseKlix Agency | Instagram & TikTok Growth Experts';
  const defaultDescription = 'We help brands go viral and grow on Instagram and TikTok with targeted short-form content strategies.';
  const site_name = 'RiseKlix Agency';
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={site_name} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@riseklixagency" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0284c7" />
      <meta name="msapplication-TileColor" content="#0284c7" />
      <meta name="theme-color" content="#0F172A" />
      
      {/* Additional metadata */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
} 