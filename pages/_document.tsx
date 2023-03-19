import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {

  let description = "Let TeacherGPT improve your written English in seconds.";
  let ogimage = "";
  let sitename = "DOMAIN COMES HERE";
  let title = "Teach GPT to help you with your English";

  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta property="og:site_name" content={sitename} />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:image" content={ogimage} />
        <meta name="twitter:image" content={ogimage} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
