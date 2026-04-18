import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/general_images/window.png" />
        <meta name="theme-color" content="#C46A4A" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
