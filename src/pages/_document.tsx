import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <meta name="og:url" content="https://listener.irrevocable.dev" />
      <meta name="og:title" content="No-Code Lit Listener" />
      <meta name="og:description" content="" />
      <meta
        name="og:image"
        content="https://listener.irrevocable.dev/card.png/"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="og:url" content="https://listener.irrevocable.dev" />
      <meta
        name="og:image"
        content="https://listener.irrevocable.dev/card.png/"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@digitalax_" />
      <meta name="twitter:creator" content="@digitalax_" />
      <meta
        name="twitter:image"
        content="https://listener.irrevocable.dev/card.png/"
      />
      <meta name="twitter:url" content="https://listener.irrevocable.dev" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="canonical" href="https://listener.irrevocable.dev" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Ignite.otf"
        as="font"
        crossOrigin="anonymous"
        type="font/otf"
      />
      <link
        rel="preload"
        href="/fonts/Vcr.ttf"
        as="font"
        crossOrigin="anonymous"
        type="font/ttf"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
              @font-face {
                font-family: "Ignite";
                font-weight: 400;
                src: url("./fonts/Ignite.otf");
              }

              @font-face {
                font-family: "VCR";
                src: url("./fonts/Vcr.otf");
              }
            `,
        }}
      ></style>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
