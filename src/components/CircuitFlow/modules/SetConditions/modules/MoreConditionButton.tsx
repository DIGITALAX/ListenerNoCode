import { FunctionComponent } from "react";
import { MoreConditionButtonProps } from "@/components/CircuitFlow/types/circuitflow.types";

const MoreConditionButton: FunctionComponent<MoreConditionButtonProps> = ({
  handleAddConditionAndReset,
  handleUpdateCondition,
  editingState,
}): JSX.Element => {
  return (
    <div
      className="relative w-fit h-fit px-2.5 py-1.5 flex items-center justify-center cursor-pointer hover:opacity-50 active:scale-95"
      id="borderLight"
      onClick={() =>
        editingState ? handleUpdateCondition() : handleAddConditionAndReset()
      }
    >
      <div
        className="relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-moda text-lg"
        id="blur"
      >
        {editingState ? "UPDATE CONDITION" : "ADD CONDITION"}
      </div>
    </div>
  );
};

export default MoreConditionButton;