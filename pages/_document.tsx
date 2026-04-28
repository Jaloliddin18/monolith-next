import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/general_images/window.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#C46A4A" />
        <style>{`
          #pc-wrap { width: 100%; }
          #home-page { width: 100%; }
          .top-rated-section,
          .trending-section,
          .suggested-section,
          .sale-banner-section,
          .top-selection-section {
            max-width: 1440px;
            margin: 0 auto;
            box-sizing: border-box;
          }
        `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
