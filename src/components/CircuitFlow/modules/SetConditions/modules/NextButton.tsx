import { FunctionComponent } from "react";
import { MoreConditionButtonProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { setConditionFlow } from "../../../../../../redux/reducers/conditionFlowSlice";
import { setModalOpen } from "../../../../../../redux/reducers/modalOpenSlice";
import { setCircuitFlow } from "../../../../../../redux/reducers/circuitFlowSlice";

const NextButton: FunctionComponent<MoreConditionButtonProps> = ({
  handleAddConditionAndReset,
  handleUpdateCondition,
  editingState,
  conditionFlowIndex,
  conditionType,
  circuitFlowIndex,
  dispatch,
  circuitInformation,
  handleAddExecutionConstraints,
  handleSetConditionalLogic,
  ipfsHash,
  stepCount,
}): JSX.Element => {
  return (
    <div
      className="relative w-full h-16 flex items-center justify-center cursor-pointer hover:opacity-50 active:scale-95 border border-ballena"
      onClick={
        () => {
          if (circuitFlowIndex === 0) {
            if (
              conditionFlowIndex.index === stepCount - 1 &&
              circuitInformation?.conditions?.length < 1
            ) {
              dispatch(
                setModalOpen({
                  actionOpen: true,
                  actionMessage: "Add Conditions Before Continuing.",
                  actionImage: "Qmam45hAbVeeq4RaJ2Dz4kTw7iea42rmvrgJySJBdSJuFS",
                })
              );
            } else {
              dispatch(
                setConditionFlow({
                  index: conditionFlowIndex.index + 1,
                  contractCount: conditionFlowIndex.contractCount,
                  webhookCount: conditionFlowIndex.webhookCount,
                })
              );
            }

            return;
          }
        }

        // : circuitFlowIndex === 1
        // ? () => {
        //     const logicCorrect = handleSetConditionalLogic();
        //     if (logicCorrect) {
        //       dispatch(setCircuitFlow(circuitFlowIndex + 1));
        //     }
        //   }
        // : circuitFlowIndex === 2 && circuitInformation?.actions?.length < 1
        // ? () =>
        //     dispatch(
        //       setModalOpen({
        //         actionOpen: true,
        //         actionMessage: "Add Actions Before Continuing.",
        //         actionImage: "Qmam45hAbVeeq4RaJ2Dz4kTw7iea42rmvrgJySJBdSJuFS",
        //       })
        //     )
        // : circuitFlowIndex === 3
        // ? () => {
        //     handleAddExecutionConstraints();
        //     dispatch(setCircuitFlow(circuitFlowIndex + 1));
        //   }
        // : circuitFlowIndex === 4 && ipfsHash?.trim() === ""
        // ? () =>
        //     dispatch(
        //       setModalOpen({
        //         actionOpen: true,
        //         actionMessage: "Hash to IPFS before continuing.",
        //         actionImage: "QmSjfHHFeLfMhgdwjuvczjxqDbRhs3rW3z4kvo1Jqf9TfM",
        //       })
        //     )
        // : () => dispatch(setCircuitFlow(circuitFlowIndex + 1))
      }
    >
      <div
        className="relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-moda text-lg"
        id="blur"
      >
        {`>>> CONTINUE`}
      </div>
    </div>
  );
};

export default NextButton;
