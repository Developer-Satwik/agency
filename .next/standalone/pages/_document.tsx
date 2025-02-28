import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content="#ffffff" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="RiseKlix Agency | Instagram & TikTok Growth Experts" />
          <meta property="og:description" content="We help brands go viral and grow on Instagram and TikTok with targeted short-form content strategies." />
          <meta property="og:image" content="/images/og-image.jpg" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="RiseKlix Agency | Instagram & TikTok Growth Experts" />
          <meta property="twitter:description" content="We help brands go viral and grow on Instagram and TikTok with targeted short-form content strategies." />
          <meta property="twitter:image" content="/images/og-image.jpg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 