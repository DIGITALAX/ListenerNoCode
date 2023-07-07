import { FunctionComponent, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { setWalletConnected } from "../../../../redux/reducers/walletConnectedSlice";

const Header: FunctionComponent = (): JSX.Element => {
  const walletConnected = useSelector(
    (state: RootState) => state.app.walletConnectedReducer.value
  );
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const dispatch = useDispatch();
  const { isConnected } = useAccount();

  useEffect(() => {
    dispatch(setWalletConnected(isConnected));
  }, [isConnected]);
  return (
    <div className="relative w-full flex flex-col gap-3 pt-2 pb-20">
      <div className="flex flex-row w-full h-fit text-white flex items-center justify-center px-3">
        <div className="relative flex justify-start w-fit h-fit items-center whitespace-nowrap text-3xl break-words">
          🔥 ☎️
        </div>
        <div className="relative flex flex-row w-full h-fit items-center justify-center gap-6 text-xl text-ama font-vcr">
          <Link
            href={"/"}
            className="relative w-fit h-fit justify-center items-center flex cursor-pointer hover:opacity-70"
          >{`( Home )`}</Link>
          <Link
            href={"https://www.docs.irrevocable.dev"}
            target="_blank"
            rel="noreferrer"
            className="relative w-fit h-fit justify-center items-center flex cursor-pointer hover:opacity-70"
          >{`( Docs )`}</Link>
          <Link
            href={"/shop"}
            className="relative w-fit h-fit justify-center items-center flex cursor-pointer hover:opacity-70"
          >{`( Shop )`}</Link>
          <Link
            href={"/account"}
            className="relative w-fit h-fit justify-center items-center flex cursor-pointer hover:opacity-70"
          >{`( Account )`}</Link>
        </div>
        <div
          className="relative flex justify-end w-fit h-fit items-center ml-auto whitespace-nowrap break-words cursor-pointer active:scale-95 px-3 py-1.5"
          id="borderYellow"
          onClick={!walletConnected ? openConnectModal : openAccountModal}
        >
          <div
            className="relative flex items-center justify-start font-vcr"
            id="blurText"
          >
            {walletConnected ? "connected" : "connect"}
          </div>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center w-full h-fit">
        <div className="relative w-full h-2 flex bg-moda"></div>
        <div
          className="font-ignite flex items-center justify-center w-fit h-fit text-center text-[13rem] break-words leading-[12rem]"
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
