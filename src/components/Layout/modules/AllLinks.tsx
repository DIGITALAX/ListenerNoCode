import Link from "next/link";
import { FunctionComponent } from "react";

const AllLinks: FunctionComponent = (): JSX.Element => {
  return (
    <>
      <Link
        href={"/"}
        className="relative w-fit h-fit justify-center items-center flex cursor-pointer hover:opacity-70"
        draggable={false}
      >{`( Home )`}</Link>
      <Link
        href={"https://docs.irrevocable.dev/"}
        target="_blank"
        rel="noreferrer"
        className="relative w-fit h-fit justify-center items-center flex cursor-pointer hover:opacity-70"
        draggable={false}
      >{`( Docs )`}</Link>
      <Link
        href={"https://github.com/DIGITALAX/LitListenerSDK"}
        target="_blank"
        rel="noreferrer"
        className="relative w-fit h-fit justify-center items-center flex cursor-pointer hover:opacity-70"
        draggable={false}
      >{`( SDK )`}</Link>
      <Link
        href={"/shop"}
        className="relative w-fit h-fit justify-center items-center flex cursor-pointer hover:opacity-70"
        draggable={false}
      >{`( Shop )`}</Link>
      <Link
        href={"/account"}
        className="relative w-fit h-fit justify-center items-center flex cursor-pointer hover:opacity-70"
        draggable={false}
      >{`( Account )`}</Link>
      <Link
        href={"/actions"}
        className="relative w-fit h-fit justify-center items-center flex cursor-pointer hover:opacity-70"
        draggable={false}
      >{`( Actions )`}</Link>
    </>
  );
};

export default AllLinks;
