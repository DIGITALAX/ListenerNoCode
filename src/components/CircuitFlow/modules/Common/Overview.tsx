import { FunctionComponent, useContext } from "react";
import {
  PiArrowCircleUpLeftFill,
  PiArrowCircleDownRightFill,
} from "react-icons/pi";
import { ModalContext } from "@/pages/_app";
import { OverviewProps } from "../../types/circuitflow.types";

const Overview: FunctionComponent<OverviewProps> = ({
  handleSetConditionalLogic,
  handleAddExecutionConstraints,
  handleClearCircuit,
  overviewOpen,
  setOverviewOpen,
  largeScreen,
}): JSX.Element => {
  const context = useContext(ModalContext);
  return (
    <div
      className={`absolute z-20 right-0 top-0 grow border-l-2 h-full border-sol px-4 py-6 bg-aBlack items-center justify-center ${
        overviewOpen
          ? largeScreen
            ? "w-96"
            : "w-11/12"
          : largeScreen
          ? "w-10"
          : "w-4"
      }`}
    >
      <div
        className="absolute top-10 -left-4 flex opacity-80 cursor-pointer w-fit h-fit z-5 border border-ballena rounded-full bg-white"
        onClick={() => setOverviewOpen(!overviewOpen)}
      >
        {overviewOpen ? (
          <PiArrowCircleDownRightFill size={30} color="#FFD85F" />
        ) : (
          <PiArrowCircleUpLeftFill size={30} color="#FFD85F" />
        )}
      </div>
      <div
        className={`flex-row items-center justify-center relative w-full h-full xl:border-x-0 border-x-4 border-moda ${
          overviewOpen ? "flex" : "hidden"
        }`}
      >
        <div className="relative w-1 h-full bg-moda grow xl:flex hidden"></div>
        <div className="relative w-full h-full flex flex-col gap-5">
          <div className="relative w-full h-fit flex flex-row items-start justify-center">
            <div className="relative h-1 w-10 bg-moda flex items-start justify-center"></div>
            <div
              className="relative h-3 w-4 flex items-center justify-center -top-0.5"
              id="boxGrad"
            ></div>
            <div
              className="uppercase text-xl font-vcr text-moda px-1 flex items-start justify-center w-fit h-fit -top-2"
              id="blur"
            >
              overview
            </div>
            <div
              className="relative h-3 w-4 flex items-center justify-center -top-0.5"
              id="boxGrad"
            ></div>
            <div className="relative h-1 w-full bg-moda flex justify-center"></div>
          </div>
          <div className="relative w-full h-full flex flex-col break-words gap-3 text-base font-vcr px-2 justify-start items-start">
            {Array.from([
              "Set Conditions",
              "Conditional Logic",
              "Set Actions",
              "Execution Constraints",
              "IPFS Hash",
              "MintGrantBurn PKP",
              "Run Circuit",
            ]).map((value: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`relative w-fit xl:w-full h-fit flex flex-row justify-start items-center gap-3 cursor-pointer active:scale-95 hover:text-sol xl:grow ${
                    context?.circuitFlow === index ? "text-sol" : "text-rio"
                  }`}
                  onClick={
                    context?.circuitFlow === 6 && context?.circuitRunning
                      ? () => handleClearCircuit()
                      : context?.circuitFlow === 0 &&
                        context?.circuitInformation?.conditions?.length < 1 &&
                        index > 0
                      ? () =>
                          context?.setGeneralModal({
                            open: true,
                            message: "Add Conditions Before Continuing.",
                            image:
                              "QmRyJipNKXxRDRc5B89Xy5dSxqAZoydHSqZrxbAqaQJKpb",
                          })
                      : context?.circuitFlow === 1 && index > 1
                      ? () => {
                          const logicCorrect = handleSetConditionalLogic();
                          if (logicCorrect) {
                            context?.setCircuitFlow(index);
                          }
                        }
                      : context?.circuitFlow === 2 &&
                        context?.circuitInformation?.actions?.length < 1 &&
                        index > 2
                      ? () =>
                          context?.setGeneralModal({
                            open: true,
                            message: "Add Actions Before Continuing.",
                            image:
                              "Qmam45hAbVeeq4RaJ2Dz4kTw7iea42rmvrgJySJBdSJuFS",
                          })
                      : context?.circuitFlow === 3 && index > 3
                      ? () => {
                          handleAddExecutionConstraints();
                          context?.setCircuitFlow(index);
                        }
                      : context?.circuitFlow === 4 &&
                        context?.ipfsHash?.ipfs?.trim() === "" &&
                        index > 4
                      ? () =>
                          context?.setGeneralModal({
                            open: true,
                            message: "Hash to IPFS before continuing.",
                            image:
                              "QmehNYsJB4MBfwr1SmZMGmAsdcVBFYa1cbyMq68RjgRf6J",
                          })
                      : () => context?.setCircuitFlow(index)
                  }
                >
                  <div className="flex flex-row justify-start items-center w-fit h-fit gap-1.5">
                    <div className="text-white flex relative w-fit h-fit">{`(`}</div>
                    <div
                      className="flex relative w-fit h-fit uppercase"
                      id="blur"
                    >
                      {index == 1
                        ? "L"
                        : index == 2
                        ? "A"
                        : index === 4
                        ? "H"
                        : value[0]}
                    </div>
                    <div className="text-white flex relative w-fit h-fit">{`)`}</div>
                  </div>
                  <div
                    className="relative w-fit h-fit items-center justify-center flex"
                    id="blur"
                  >
                    {value}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative h-1 w-full bg-moda flex items-start justify-center"></div>
        </div>
        <div className="relative w-1 h-full bg-moda xl:flex hidden"></div>
      </div>
    </div>
  );
};

export default Overview;
