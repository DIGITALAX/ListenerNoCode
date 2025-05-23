import { FunctionComponent, useContext } from "react";
import Image from "next/legacy/image";
import { ImCross } from "react-icons/im";
import { INFURA_GATEWAY } from "../../../lib/constants";
import { ModalContext } from "@/pages/_app";

const General: FunctionComponent = (): JSX.Element => {
  const context = useContext(ModalContext);
  return (
    <div className="inset-0 justify-center fixed z-20 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto">
      <div className="relative w-full lg:w-[30vw] h-fit col-start-1 place-self-center bg-black">
        <div className="relative w-full row-start-2 h-fit grid grid-flow-col auto-cols-auto">
          <div className="relative w-full h-full col-start-1 place-self-center">
            <div className="relative w-full h-full grid grid-flow-row auto-rows-auto gap-4 pb-8">
              <div
                className="relative w-fit h-fit row-start-1 self-center justify-self-end pr-3 pt-3 cursor-pointer"
                id="blur"
              >
                <ImCross
                  color="white"
                  size={15}
                  onClick={() =>
                    context?.setGeneralModal({
                      open: false,
                      message: "",
                      image: "",
                    })
                  }
                />
              </div>
              <div className="relative w-full h-fit flex flex-col items-center justify-center px-4 gap-6">
                <div
                  className="relative w-3/4 h-fit justify-center items-center text-white font-vcr text-base break-words text-center"
                  id="blur"
                >
                  {context?.generalModal?.message}
                </div>
                <div
                  className="relative w-1/2 h-36 preG:h-52 lg:h-40 xl:h-52 justify-center items-center p-2"
                  id="footerBG"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={`${INFURA_GATEWAY}/ipfs/${context?.generalModal?.image}`}
                      layout="fill"
                      objectFit="cover"
                      className="p-2"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
