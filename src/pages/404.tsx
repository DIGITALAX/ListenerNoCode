import Head from "next/head";
import { FunctionComponent } from "react";

const Custom404: FunctionComponent = (): JSX.Element => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-x-hidden">
      <Head>
        <title>Page Not Found</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative font-vcr text-moda flex items-center justify-center text-lg">
        No one's listening. <a href="/">Go home?</a>
      </div>
    </div>
  );
};

export default Custom404;
