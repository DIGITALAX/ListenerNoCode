import Image from "next/image";
import { FunctionComponent } from "react";
import { INFURA_GATEWAY } from "../../../../lib/constants";
import { BsGithub, BsTwitter } from "react-icons/bs";

const Footer: FunctionComponent = (): JSX.Element => {
  return (
    <div
      className="relative w-full h-fit flex items-center justify-center px-4 py-3 mt-auto"
      id="footerBG"
    >
      <div className="w-full h-full flex flex-row gap-3 justify-center items-center">
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.digitalax.xyz"
          className="relative w-4 h-4 flex cursor-pointer active:scale-95 justify-center items-center"
          draggable={false}
        >
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmZ8vEUCU8KjiahZQD8mqBAtmYfxf9mfMCxgHmtmRa4MRf`}
            fill
            priority
            draggable={false}
            alt="digitalax"
          />
        </a>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.chromadin.xyz/autograph/digitalax"
          className="relative w-5 h-5 flex cursor-pointer active:scale-95 justify-center items-center"
          draggable={false}
        >
          <Image
            src={`${INFURA_GATEWAY}/ipfs/QmP5FRrhPL64YoguEpdxVsBM76B22MmCXNcro3EaNuxKBs`}
            fill
            priority
            draggable={false}
            alt="lens"
          />
        </a>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://github.com/digitalax"
          className="relative w-fit h-fit cursor-pointer active:scale-95 flex justify-center items-center"
          draggable={false}
        >
          <BsGithub size={20} color={"#F6D39B"} />
        </a>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://twitter.com/DIGITALAX_"
          className="relative w-fit h-fit cursor-pointer active:scale-95 flex justify-center items-center"
          draggable={false}
        >
          <BsTwitter size={20} color={"#F6D39B"} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
