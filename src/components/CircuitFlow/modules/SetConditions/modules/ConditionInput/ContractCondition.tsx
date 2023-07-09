import { FunctionComponent } from "react";
import ConditionInput from "./ConditionInput";
import Connector from "../../../Common/Connector";
import { ContractConditionProps } from "@/components/CircuitFlow/types/circuitflow.types";

const ContractCondition: FunctionComponent<ContractConditionProps> = ({
  newContractConditionInformation,
  setNewContractConditionInformation,
}): JSX.Element => {
  return (
    <div className="relative flex flex-row items-center justify-center w-fit h-fit">
      <div
        className="relative w-60 h-60 flex flex-col p-2 gap-3"
        id="inputBorder"
      >
        <ConditionInput text="Enter contract address, ABI, event name, args and chain information." />
        <div className="flex w-full h-full border-4 border-moda overflow-y-scroll">
          <div className="relative w-full h-fit gap-2 flex flex-col px-1.5 py-2.5">
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-white text-sm"
                id="blur"
              >
                Contract Address
              </div>
              <input
                defaultValue={newContractConditionInformation?.contractAddress}
                placeholder="enter contract address"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  setNewContractConditionInformation({
                    ...newContractConditionInformation!,
                    contractAddress: e.target.value as any,
                  })
                }
              />
            </div>

            <input
              placeholder="contract address"
              className="bg-aBlack w-full h-10 p-1 text-white font-vcr"
              id="borderLight"
            />
          </div>
        </div>
      </div>
      <Connector topOnly />
      <div
        className="relative w-60 h-60 flex flex-col p-2 gap-3"
        id="inputBorder"
      >
        <ConditionInput text="Enter expected value, match operator and match functions." />
        <div className="flex flex-col w-full h-full border-4 border-moda"></div>
      </div>
    </div>
  );
};

export default ContractCondition;
