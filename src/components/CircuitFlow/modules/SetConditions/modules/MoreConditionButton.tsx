import { FunctionComponent } from "react";
import { MoreConditionButtonProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { setConditionFlow } from "../../../../../../redux/reducers/conditionFlowSlice";

const MoreConditionButton: FunctionComponent<MoreConditionButtonProps> = ({
  handleAddConditionAndReset,
  handleUpdateCondition,
  editingState,
  conditionFlowIndex,
  conditionType,
  dispatch,
}): JSX.Element => {
  return (
    <div
      className="relative w-full h-16 flex items-center justify-center cursor-pointer hover:opacity-50 active:scale-95 border border-ballena"
      onClick={() =>
        conditionFlowIndex.index === 0
          ? dispatch(
              setConditionFlow({
                index: conditionFlowIndex.index + 1,
                contractCount: conditionFlowIndex.contractCount,
                webhookCount: conditionFlowIndex.webhookCount,
              })
            )
          : editingState
          ? handleUpdateCondition()
          : handleAddConditionAndReset()
      }
    >
      <div
        className="relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-moda text-lg"
        id="blur"
      >
        {conditionFlowIndex.index <
        (conditionType === "contract"
          ? conditionFlowIndex.contractCount
          : conditionFlowIndex.webhookCount)
          ? ">>> CONTINUE"
          : ">>>  " + (editingState ? "UPDATE CONDITION" : "ADD CONDITION")}
      </div>
    </div>
  );
};

export default MoreConditionButton;
