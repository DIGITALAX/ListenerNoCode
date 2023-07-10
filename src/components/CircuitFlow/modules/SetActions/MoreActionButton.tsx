import { FunctionComponent } from "react";
import { MoreActionButtonProps } from "@/components/CircuitFlow/types/circuitflow.types";

const MoreActionButton: FunctionComponent<MoreActionButtonProps> = ({
  handleAddActionAndReset,
  handleUpdateAction,
  editingStateAction,
}): JSX.Element => {
  return (
    <div
      className="relative w-fit h-fit px-2.5 py-1.5 flex items-center justify-center cursor-pointer hover:opacity-50 active:scale-95"
      id="borderLight"
      onClick={() =>
        editingStateAction ? handleUpdateAction() : handleAddActionAndReset()
      }
    >
      <div
        className="relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-moda text-lg"
        id="blur"
      >
        {editingStateAction ? "UPDATE ACTION" : "ADD ACTION"}
      </div>
    </div>
  );
};

export default MoreActionButton;
