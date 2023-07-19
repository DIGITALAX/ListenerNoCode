import { FunctionComponent } from "react";

import { HashIPFSProps } from "../../types/circuitflow.types";
import { AiOutlineLoading } from "react-icons/ai";
import { Action, ContractAction } from "../../types/litlistener.types";
import { setCircuitInformation } from "../../../../../redux/reducers/circuitInformationSlice";

const HashIPFS: FunctionComponent<HashIPFSProps> = ({
  handleInstantiateCircuit,
  ipfsLoading,
  circuitInformation,
  dispatch,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-60 flex flex-col p-2 gap-3"
      id="inputBorder"
    >
    
      <div className="flex w-full h-full border-4 border-moda overflow-y-scroll">
        <div className="relative w-full h-fit gap-6 flex flex-col px-1.5 py-2.5 justify-start items-center">
          {circuitInformation?.actions.some(
            (obj: Action) => (obj as ContractAction).chainId !== undefined
          ) && (
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Provider URL
              </div>
              <input
                value={circuitInformation?.providerURL || ""}
                placeholder="enter provider URL"
                type="password"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  dispatch(
                    setCircuitInformation({
                      ...circuitInformation,
                      providerURL: e.target.value as any,
                    })
                  )
                }
              />
            </div>
          )}
          <div
            className={`relative w-36 px-1.5 h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer uppercase`}
            id="borderLight"
            onClick={() => handleInstantiateCircuit()}
          >
            <div
              className={`relative w-fit h-fit items-center justify-center flex  ${
                ipfsLoading && "animate-spin"
              }`}
            >
              {ipfsLoading ? (
                <AiOutlineLoading size={15} color="white" opacity={80} />
              ) : (
                "hash to ipfs"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashIPFS;
