import { FunctionComponent } from "react";
import { useAccount } from "wagmi";
import AllLinks from "./AllLinks";
import { useModal } from "connectkit";

const Header: FunctionComponent = (): JSX.Element => {
  const { isConnected, chainId } = useAccount();
  const { openOnboarding, openSwitchNetworks, openProfile } = useModal();

  return (
    <div className="relative w-full flex flex-col gap-3 pt-2 pb-[4.5rem]">
      <div className="grid grid-flow-col w-full h-fit text-white flex items-center justify-between px-3">
        <div className="relative flex justify-start w-fit h-fit items-center whitespace-nowrap text-3xl break-words col-start-1 row-start-1">
          🔥 ☎️
        </div>
        <div className="relative flex-row w-full h-fit items-center justify-center gap-3 lg:gap-6 text-sm lg:text-xl text-ama font-vcr tablet:flex hidden ">
          <AllLinks />
        </div>
        <div
          className="relative flex justify-end w-fit h-fit items-center ml-auto whitespace-nowrap break-words cursor-pointer active:scale-95 px-3 py-1.5"
          id="borderYellow"
          onClick={
            !isConnected
              ? () => openOnboarding()
              : isConnected && chainId !== 175177
              ? () => openSwitchNetworks()
              : () => openProfile()
          }
        >
          <div
            className="relative flex items-center justify-start font-vcr"
            id="blurText"
          >
            {isConnected && chainId !== 175177
              ? "switch"
              : isConnected
              ? "connected"
              : "connect"}
          </div>
        </div>
      </div>
      <div className="relative flex-row w-full h-fit items-center justify-center gap-3 lg:gap-6 text-sm lg:text-xl text-ama font-vcr tablet:hidden flex flex-wrap break-words px-1.5">
        <AllLinks />
      </div>
      <div className="relative flex flex-col items-center justify-center w-full h-fit">
        <div className="relative w-full h-2 flex bg-moda"></div>
        <div
          className="font-ignite flex items-center justify-center w-fit h-fit text-center  text-[5rem] tablet:text-[7rem] lg:text-[13rem] break-words leading-[6.5rem] lg:leading-[12rem]"
          id="noCode"
        >
          NO-CODE LIT LISTENER
        </div>
        <div className="relative w-full h-2 flex bg-oscuraAzul"></div>
      </div>
    </div>
  );
};

export default Header;
