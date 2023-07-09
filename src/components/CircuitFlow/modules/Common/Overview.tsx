import { FunctionComponent } from "react";
import { OverviewProps } from "../../types/circuitflow.types";
import { setCircuitFlow } from "../../../../../redux/reducers/circuitFlowSlice";
import { setModalOpen } from "../../../../../redux/reducers/modalOpenSlice";
const Overview: FunctionComponent<OverviewProps> = ({
  circuitFlowIndex,
  dispatch,
  circuitInformation,
  handleSetConditionalLogic,
}): JSX.Element => {
  return (
    <div className="relative w-96 h-full border-l-2 border-sol bg-aBlack flex flex-row items-center justify-center p-6">
      <div className="relative w-1 h-full bg-moda"></div>
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
          <div className="relative h-1 w-full bg-moda flex items-center justify-center"></div>
        </div>
        <div className="relative w-full h-full flex flex-col gap-3 text-base font-vcr px-2 justify-center items-start">
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
                className={`relative w-full h-fit flex flex-row justify-start items-center gap-3 cursor-pointer active:scale-95 hover:text-sol ${
                  circuitFlowIndex === index ? "text-sol" : "text-rio"
                }`}
                onClick={
                  circuitFlowIndex === 0 &&
                  circuitInformation?.conditions?.length < 1
                    ? () =>
                        dispatch(
                          setModalOpen({
                            actionOpen: true,
                            actionMessage: "Add Conditions Before Continuing.",
                            actionImage: "",
                          })
                        )
                    : circuitFlowIndex === 1
                    ? () => {
                        const logicCorrect = handleSetConditionalLogic();
                        if (logicCorrect) {
                          dispatch(setCircuitFlow(circuitFlowIndex + 1));
                        }
                      }
                    : () => dispatch(setCircuitFlow(index))
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
      <div className="relative w-1 h-full bg-moda"></div>
    </div>
  );
};

export default Overview;
