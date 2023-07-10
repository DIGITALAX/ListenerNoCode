import { FunctionComponent } from "react";
import Input from "../Common/Input";
import { setLitActionCodeModal } from "../../../../../redux/reducers/litActionCodeModalSlice";
import { LitActionProps } from "../../types/circuitflow.types";

const LitAction: FunctionComponent<LitActionProps> = ({
  dispatch,
  litActionCode,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-60 flex flex-col p-2 gap-3"
      id="inputBorder"
    >
      <Input text={"Verify your Lit Action Code."} />
      <div className="flex flex-col w-full h-full border-4 border-moda p-1 gap-1.5">
        <div className="relative w-fit h-fit flex text-sol font-vcr" id="blur">
          Lit Action
        </div>
        <div
          className="relative w-full h-full bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer uppercase"
          id="borderLight"
          onClick={() => dispatch(setLitActionCodeModal(true))}
        >
          {litActionCode}
        </div>
      </div>
    </div>
  );
};

export default LitAction;
