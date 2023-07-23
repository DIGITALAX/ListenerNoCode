import { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork } from "wagmi";
import { setWalletConnected } from "../../../../redux/reducers/walletConnectedSlice";

const Header: FunctionComponent = (): JSX.Element => {
  const walletConnected = useSelector(
    (state: RootState) => state.app.walletConnectedReducer.value
  );
  const [switchState, setSwitchState] = useState<boolean>(false);
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const dispatch = useDispatch();
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    dispatch(setWalletConnected(isConnected));
    setSwitchState(chain?.id !== 175177 && chain?.id !== 137 ? true : false);
  }, [isConnected, walletConnected, chain?.id]);
  return (
    <div className="relative w-full flex flex-col gap-3 pt-2 pb-[4.5rem]">
      <div className="flex flex-row w-full h-fit text-white flex items-center justify-center px-3">
        <div className="relative flex justify-start w-fit h-fit items-center whitespace-nowrap text-3xl break-words">
          🔥 ☎️
        </div>
        <div className="relative flex flex-row w-full h-fit items-center justify-center gap-6 text-xl text-ama font-vcr">
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
        </div>
        <div
          className="relative flex justify-end w-fit h-fit items-center ml-auto whitespace-nowrap break-words cursor-pointer active:scale-95 px-3 py-1.5"
          id="borderYellow"
          onClick={
            switchState
              ? openChainModal
              : !walletConnected
              ? openConnectModal
              : openAccountModal
          }
        >
          <div
            className="relative flex items-center justify-start font-vcr"
            id="blurText"
          >
            {switchState && walletConnected
              ? "switch"
              : walletConnected
              ? "connected"
              : "connect"}
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
