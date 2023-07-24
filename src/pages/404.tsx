import Head from "next/head";
import Link from "next/link";
import { FunctionComponent, useEffect, useState } from "react";

const Custom404: FunctionComponent = (): JSX.Element => {
  const [largeScreen, setLargeScreen] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setLargeScreen(Boolean(window.innerWidth > 600));
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className="relative w-full flex flex-col items-center justify-center overflow-x-hidden"
      id={largeScreen ? "heightCheckout" : ""}
      style={largeScreen ? {} : {height: "45rem"}}
    >
      <Head>
        <title>Page Not Found</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative font-vcr text-moda flex items-center justify-center text-lg">
        No one&apos;s listening. <Link href="/">Go home?</Link>
      </div>
    </div>
  );
};

export default Custom404;
