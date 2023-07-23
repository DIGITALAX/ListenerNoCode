import { AbiProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { FunctionComponent } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

const Abi: FunctionComponent<AbiProps> = ({
  inputs,
  setInputs,
  dropDownsOpen,
  setDropDownsOpen,
  type,
  setOutputs,
  outputs,
  setStateMutability,
  stateMutability,
  payable,
  setPayable,
  indexed,
}): JSX.Element => {
  switch (type) {
    case "output":
      const actionOutputs = outputs!;
      const setActionOutputs = setOutputs!;
      const dropDownsOpenAction = dropDownsOpen as {
        internalTypesInput: boolean[];
        typesInput: boolean[];
        internalTypesOutput: boolean[];
        typesOutput: boolean[];
        payable: boolean;
        stateMutability: boolean;
        signType: boolean[];
        valueType: boolean[];
      };
      return (
        <div
          className="relative w-72 h-60 flex flex-col p-2 gap-3 justify-start items-center px-4 overflow-y-scroll"
          id="inputBorder"
        >
          <div
            className="relative w-fit h-fit justify-start items-start flex font-vcr text-ballena text-base"
            id="blur"
          >
            Contract ABI Outputs
          </div>
          <div className="flex flex-col relative gap-1 w-full h-fit">
            <div className="relative flex flex-row justify-start items-center gap-1.5 w-fit h-fit">
              <div
                className="relative text-ballena font-vcr text-sm flex"
                id="blur"
              >
                Outputs
              </div>
              <div
                className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
                onClick={() =>
                  setActionOutputs([
                    ...actionOutputs,
                    {
                      internalType: "string",
                      name: "",
                      type: "string",
                    },
                  ])
                }
              >
                <IoMdAddCircleOutline size={15} color="#8EADB5" />
              </div>
            </div>
            <div className="relative w-full h-fit flex flex-col gap-5">
              {actionOutputs?.map(
                (
                  output: {
                    internalType: string;
                    name: string;
                    type: string;
                  },
                  index: number
                ) => {
                  return (
                    <div
                      key={index}
                      className="relative w-full h-fit flex flex-col gap-2 text-sm font-vcr text-white"
                    >
                      <div className="relative w-full h-fit flex flex-col gap-1">
                        <div className="relative w-fit h-fit flex" id="blur">
                          Internal Type
                        </div>
                        <div
                          className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
                          id="borderLight"
                          onClick={() =>
                            setDropDownsOpen(((prevState: any) => {
                              const updatedInternalTypes = [
                                ...prevState.internalTypesOutput,
                              ];
                              updatedInternalTypes[index] =
                                !dropDownsOpenAction.internalTypesOutput[index];
                              return {
                                ...prevState,
                                internalTypesOutput: updatedInternalTypes,
                              };
                            }) as any)
                          }
                        >
                          {output?.internalType}
                        </div>
                        {dropDownsOpenAction.internalTypesOutput[index] && (
                          <div className="z-10 absolute w-full h-fit flex flex-col bg-aBlack">
                            {Array.from([
                              "address",
                              "bool",
                              "uint256",
                              "int256",
                              "string",
                              "bytes",
                              "bytes32",
                            ]).map((type: string, indexTwo: number) => {
                              return (
                                <div
                                  key={indexTwo}
                                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                                  id="borderLight"
                                  onClick={() => {
                                    setDropDownsOpen(((prevState: any) => {
                                      const updatedInternalTypes = [
                                        ...prevState.internalTypesOutput,
                                      ];
                                      updatedInternalTypes[index] =
                                        !dropDownsOpenAction
                                          .internalTypesOutput[index];
                                      return {
                                        ...prevState,
                                        internalTypesOutput:
                                          updatedInternalTypes,
                                      };
                                    }) as any);
                                    setActionOutputs(((
                                      prevInputsArray: any
                                    ) => {
                                      const updatedInputsArray = [
                                        ...prevInputsArray,
                                      ];
                                      const updatedObject = {
                                        ...updatedInputsArray[index],
                                        internalType: type,
                                      };
                                      updatedInputsArray[index] = updatedObject;
                                      return updatedInputsArray;
                                    }) as any);
                                  }}
                                >
                                  {type}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div className="relative w-full h-fit gap-1 flex flex-col">
                        <div
                          className="relative w-fit h-fit justify-start items-start flex font-vcr text-white text-sm"
                          id="blur"
                        >
                          Name
                        </div>
                        <input
                          value={output?.name || ""}
                          placeholder="enter function name"
                          className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                          id="borderLight"
                          onChange={(e) =>
                            setActionOutputs(((prevInputsArray: any) => {
                              const updatedInputsArray = [...prevInputsArray];
                              const updatedObject = {
                                ...updatedInputsArray[index],
                                name: e.target.value,
                              };
                              updatedInputsArray[index] = updatedObject;
                              return updatedInputsArray;
                            }) as any)
                          }
                        />
                      </div>
                      <div className="relative w-full h-fit flex flex-col gap-1">
                        <div className="relative w-fit h-fit flex" id="blur">
                          Type
                        </div>
                        <div
                          className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
                          id="borderLight"
                          onClick={() =>
                            setDropDownsOpen(((prevState: any) => {
                              const updatedInternalTypes = [
                                ...prevState.typesOutput,
                              ];
                              updatedInternalTypes[index] =
                                !dropDownsOpenAction.typesOutput[index];
                              return {
                                ...prevState,
                                typesOutput: updatedInternalTypes,
                              };
                            }) as any)
                          }
                        >
                          {output?.type}
                        </div>
                        {dropDownsOpenAction.typesOutput[index] && (
                          <div className="z-10 absolute w-full h-fit flex flex-col bg-aBlack">
                            {Array.from([
                              "address",
                              "bool",
                              "uint256",
                              "int256",
                              "string",
                              "bytes",
                              "bytes32",
                            ]).map((type: string, indexTwo: number) => {
                              return (
                                <div
                                  key={indexTwo}
                                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                                  id="borderLight"
                                  onClick={() => {
                                    setDropDownsOpen(((prevState: any) => {
                                      const updatedTypes = [
                                        ...prevState.typesOutput,
                                      ];
                                      updatedTypes[index] =
                                        !dropDownsOpenAction.typesOutput[index];
                                      return {
                                        ...prevState,
                                        typesOutput: updatedTypes,
                                      };
                                    }) as any);
                                    setActionOutputs(((
                                      prevInputsArray: any
                                    ) => {
                                      const updatedTypesArray = [
                                        ...prevInputsArray,
                                      ];
                                      const updatedObject = {
                                        ...updatedTypesArray[index],
                                        type: type,
                                      };
                                      updatedTypesArray[index] = updatedObject;
                                      return updatedTypesArray;
                                    }) as any);
                                  }}
                                >
                                  {type}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
              <div className="relative w-full px-1 h-1 bg-ballena"></div>
            </div>
          </div>
          <div className="relative w-full h-fit flex flex-col gap-1">
            <div
              className="relative w-fit h-fit flex text-ballena font-vcr text-sm"
              id="blur"
            >
              Payable
            </div>
            <div
              className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
              id="borderLight"
              onClick={() =>
                setDropDownsOpen(((prevState: any) => {
                  return {
                    ...prevState,
                    payable: !prevState.payable,
                  };
                }) as any)
              }
            >
              {`${payable}`}
            </div>
            {dropDownsOpenAction.payable && (
              <div className="z-10 absolute w-full h-fit flex flex-col bg-aBlack">
                <div
                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                  id="borderLight"
                  onClick={() => {
                    setDropDownsOpen(((prevState: any) => {
                      return {
                        ...prevState,
                        payable: !prevState.payable,
                      };
                    }) as any);
                    setPayable!(true);
                  }}
                >
                  true
                </div>
                <div
                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                  id="borderLight"
                  onClick={() => {
                    setDropDownsOpen(((prevState: any) => {
                      return {
                        ...prevState,
                        payable: !prevState.payable,
                      };
                    }) as any);
                    setPayable!(false);
                  }}
                >
                  false
                </div>
              </div>
            )}
          </div>
          <div className="relative w-full h-fit flex flex-col gap-1">
            <div
              className="relative w-fit h-fit flex text-ballena font-vcr text-sm"
              id="blur"
            >
              State Mutability
            </div>
            <div
              className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
              id="borderLight"
              onClick={() =>
                setDropDownsOpen(((prevState: any) => {
                  return {
                    ...prevState,
                    stateMutability: !prevState.stateMutability,
                  };
                }) as any)
              }
            >
              {stateMutability}
            </div>
            {dropDownsOpenAction.stateMutability && (
              <div className="z-10 absolute w-full h-fit flex flex-col bg-aBlack">
                {Array.from(["pure", "view", "payable", "nonpayable"]).map(
                  (state: string, index: number) => {
                    return (
                      <div
                        key={index}
                        className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                        id="borderLight"
                        onClick={() => {
                          setDropDownsOpen(((prevState: any) => {
                            return {
                              ...prevState,
                              stateMutability: !prevState.stateMutability,
                            };
                          }) as any);
                          setStateMutability!(state);
                        }}
                      >
                        {state}
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
      );

    default:
      return (
        <div
          className="relative w-72 h-60 flex flex-col p-2 gap-3 justify-start items-center px-4 overflow-y-scroll"
          id="inputBorder"
        >
          <div
            className="relative w-fit h-fit justify-start items-start flex font-vcr text-ballena text-base"
            id="blur"
          >
            Contract ABI Inputs
          </div>
          <div className="flex flex-col relative gap-1 w-full h-fit">
            <div className="relative flex flex-row justify-start items-center gap-1.5 w-fit h-fit">
              <div
                className="relative text-ballena font-vcr text-sm flex"
                id="blur"
              >
                Inputs
              </div>
              <div
                className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
                onClick={() =>
                  setInputs!([
                    ...inputs!,
                    indexed
                      ? {
                          indexed: true,
                          internalType: "string",
                          name: "",
                          type: "string",
                        }
                      : ({
                          internalType: "string",
                          name: "",
                          type: "string",
                        } as any),
                  ])
                }
              >
                <IoMdAddCircleOutline size={15} color="#8EADB5" />
              </div>
            </div>
            <div className="relative w-full h-fit flex flex-col gap-5">
              {inputs?.map(
                (
                  input:
                    | {
                        indexed: boolean;
                        internalType: string;
                        name: string;
                        type: string;
                      }
                    | {
                        internalType: string;
                        name: string;
                        type: string;
                      },
                  index: number
                ) => {
                  return (
                    <div
                      key={index}
                      className="relative w-full h-fit flex flex-col gap-2 text-sm font-vcr text-white"
                    >
                      {indexed && (
                        <div className="relative w-full h-fit flex flex-col gap-1">
                          <div className="relative w-fit h-fit flex" id="blur">
                            Indexed
                          </div>
                          <div
                            className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
                            id="borderLight"
                            onClick={() =>
                              setDropDownsOpen(((prevState: any) => {
                                const updatedIndexed = [...prevState.indexed];
                                updatedIndexed[index] = !(dropDownsOpen as any)
                                  .indexed[index];
                                return {
                                  ...prevState,
                                  indexed: updatedIndexed,
                                };
                              }) as any)
                            }
                          >
                            {`${(input as any)?.indexed}`}
                          </div>
                          {(dropDownsOpen as any).indexed[index] && (
                            <div className="z-10 absolute w-full h-fit flex flex-col bg-aBlack">
                              <div
                                className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                                id="borderLight"
                                onClick={() => {
                                  setDropDownsOpen(((prevState: any) => {
                                    const updatedIndexed = [
                                      ...prevState.indexed,
                                    ];
                                    updatedIndexed[index] = false;
                                    return {
                                      ...prevState,
                                      indexed: updatedIndexed,
                                    };
                                  }) as any);
                                  setInputs!(((prevInputsArray: any) => {
                                    const updatedInputsArray = [
                                      ...prevInputsArray,
                                    ];
                                    const updatedObject = {
                                      ...updatedInputsArray[index],
                                      indexed: true,
                                    };
                                    updatedInputsArray[index] = updatedObject;
                                    return updatedInputsArray;
                                  }) as any);
                                }}
                              >
                                true
                              </div>
                              <div
                                className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                                id="borderLight"
                                onClick={() => {
                                  setDropDownsOpen(((prevState: any) => {
                                    const updatedIndexed = [
                                      ...prevState.indexed,
                                    ];
                                    updatedIndexed[index] = false;
                                    return {
                                      ...prevState,
                                      indexed: updatedIndexed,
                                    };
                                  }) as any);
                                  setInputs!(((prevInputsArray: any) => {
                                    const updatedInputsArray = [
                                      ...prevInputsArray,
                                    ];
                                    const updatedObject = {
                                      ...updatedInputsArray[index],
                                      indexed: false,
                                    };
                                    updatedInputsArray[index] = updatedObject;
                                    return updatedInputsArray;
                                  }) as any);
                                }}
                              >
                                false
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="relative w-full h-fit flex flex-col gap-1">
                        <div className="relative w-fit h-fit flex" id="blur">
                          Internal Type
                        </div>
                        <div
                          className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
                          id="borderLight"
                          onClick={() =>
                            setDropDownsOpen(((prevState: any) => {
                              const updatedInternalTypes = [
                                ...prevState.internalTypesInput,
                              ];
                              updatedInternalTypes[index] =
                                !dropDownsOpen.internalTypesInput[index];
                              return {
                                ...prevState,
                                internalTypesInput: updatedInternalTypes,
                              };
                            }) as any)
                          }
                        >
                          {input?.internalType}
                        </div>
                        {dropDownsOpen?.internalTypesInput[index] && (
                          <div className="z-10 absolute w-full h-fit flex flex-col bg-aBlack">
                            {Array.from([
                              "address",
                              "bool",
                              "uint256",
                              "int256",
                              "string",
                              "bytes",
                              "bytes32",
                            ]).map((type: string, indexTwo: number) => {
                              return (
                                <div
                                  key={indexTwo}
                                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                                  id="borderLight"
                                  onClick={() => {
                                    setDropDownsOpen(((prevState: any) => {
                                      const updatedInternalTypes = [
                                        ...prevState.internalTypesInput,
                                      ];
                                      updatedInternalTypes[index] =
                                        !dropDownsOpen.internalTypesInput[
                                          index
                                        ];
                                      return {
                                        ...prevState,
                                        internalTypesInput:
                                          updatedInternalTypes,
                                      };
                                    }) as any);
                                    setInputs!(((prevInputsArray: any) => {
                                      const updatedInputsArray = [
                                        ...prevInputsArray,
                                      ];
                                      const updatedObject = {
                                        ...updatedInputsArray[index],
                                        internalType: type,
                                      };
                                      updatedInputsArray[index] = updatedObject;
                                      return updatedInputsArray;
                                    }) as any);
                                  }}
                                >
                                  {type}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div className="relative w-full h-fit gap-1 flex flex-col">
                        <div
                          className="relative w-fit h-fit justify-start items-start flex font-vcr text-white text-sm"
                          id="blur"
                        >
                          Name
                        </div>
                        <input
                          value={input?.name || ""}
                          placeholder="enter function name"
                          className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                          id="borderLight"
                          onChange={(e) =>
                            setInputs!(((prevInputsArray: any) => {
                              const updatedInputsArray = [...prevInputsArray];
                              const updatedObject = {
                                ...updatedInputsArray[index],
                                name: e.target.value,
                              };
                              updatedInputsArray[index] = updatedObject;
                              return updatedInputsArray;
                            }) as any)
                          }
                        />
                      </div>
                      <div className="relative w-full h-fit flex flex-col gap-1">
                        <div className="relative w-fit h-fit flex" id="blur">
                          Type
                        </div>
                        <div
                          className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
                          id="borderLight"
                          onClick={() =>
                            setDropDownsOpen(((prevState: any) => {
                              const updatedTypes = [...prevState.typesInput];
                              updatedTypes[index] =
                                !dropDownsOpen.typesInput[index];
                              return {
                                ...prevState,
                                typesInput: updatedTypes,
                              };
                            }) as any)
                          }
                        >
                          {input?.type}
                        </div>
                        {dropDownsOpen.typesInput[index] && (
                          <div className="z-10 absolute w-full h-fit flex flex-col bg-aBlack">
                            {Array.from([
                              "address",
                              "bool",
                              "uint256",
                              "int256",
                              "string",
                              "bytes",
                              "bytes32",
                            ]).map((type: string, indexTwo: number) => {
                              return (
                                <div
                                  key={indexTwo}
                                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                                  id="borderLight"
                                  onClick={() => {
                                    setDropDownsOpen(((prevState: any) => {
                                      const updatedTypes = [
                                        ...prevState.typesInput,
                                      ];
                                      updatedTypes[index] =
                                        !dropDownsOpen.typesInput[index];
                                      return {
                                        ...prevState,
                                        typesInput: updatedTypes,
                                      };
                                    }) as any);
                                    setInputs!(((prevInputsArray: any) => {
                                      const updatedTypesArray = [
                                        ...prevInputsArray,
                                      ];
                                      const updatedObject = {
                                        ...updatedTypesArray[index],
                                        type: type,
                                      };
                                      updatedTypesArray[index] = updatedObject;
                                      return updatedTypesArray;
                                    }) as any);
                                  }}
                                >
                                  {type}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div className="relative w-full px-1 h-1 bg-ballena"></div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      );
  }
};

export default Abi;
