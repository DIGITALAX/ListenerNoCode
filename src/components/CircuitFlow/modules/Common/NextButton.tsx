import { FunctionComponent } from "react";
import { NextButtonProps } from "../../types/circuitflow.types";
import { setCircuitFlow } from "../../../../../redux/reducers/circuitFlowSlice";
import { setModalOpen } from "../../../../../redux/reducers/modalOpenSlice";

const NextButton: FunctionComponent<NextButtonProps> = ({
  text,
  dispatch,
  circuitFlowIndex,
  circuitInformation,
  handleSetConditionalLogic,
  handleAddExecutionConstraints,
  ipfsHash,
}): JSX.Element => {
  return (
    <div className="relative w-full h-fit flex justify-end">
      <div
        className="relative w-fit h-fit px-2.5 py-2 flex items-end justify-center cursor-pointer hover:opacity-50 hover:bg-moda/40 hover:text-aBlack active:scale-95"
        id="borderLight"
        onClick={
          circuitFlowIndex === 0 && circuitInformation?.conditions?.length < 1
            ? () =>
                dispatch(
                  setModalOpen({
                    actionOpen: true,
                    actionMessage: "Add Conditions Before Continuing.",
                    actionImage: "Qmam45hAbVeeq4RaJ2Dz4kTw7iea42rmvrgJySJBdSJuFS",
                  })
                )
            : circuitFlowIndex === 1
            ? () => {
                const logicCorrect = handleSetConditionalLogic();
                if (logicCorrect) {
                  dispatch(setCircuitFlow(circuitFlowIndex + 1));
                }
              }
            : circuitFlowIndex === 2
            ? () => {
                handleAddExecutionConstraints();
                dispatch(setCircuitFlow(circuitFlowIndex + 1));
              }
            : circuitFlowIndex === 4 && ipfsHash?.trim() === ""
            ? () =>
                dispatch(
                  setModalOpen({
                    actionOpen: true,
                    actionMessage: "Hash to IPFS before continuing.",
                    actionImage: "QmSjfHHFeLfMhgdwjuvczjxqDbRhs3rW3z4kvo1Jqf9TfM",
                  })
                )
            : () => dispatch(setCircuitFlow(circuitFlowIndex + 1))
        }
      >
        <div
          className="relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-moda text-lg"
          id="blur"
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default NextButton;
