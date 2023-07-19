import { FunctionComponent } from "react";
import { ContractActionProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { setNewContractActionInformation } from "../../../../../../redux/reducers/newContractActionInformationSlice";
import { IoMdAddCircleOutline } from "react-icons/io";

const ContractAction: FunctionComponent<ContractActionProps> = ({
  newContractActionInformation,
  actionInputs,
  actionOutputs,
  setActionInputs,
  setActionOutputs,
  dropDownsOpenAction,
  setDropDownsOpenAction,
  functionArgs,
  setFunctionArgs,
  dispatch,
  setStateMutability,
  stateMutability,
  payable,
  setPayable,
}): JSX.Element => {
  return (
    <div className="relative flex flex-row items-center justify-center w-fit h-fit">
      <div
        className="relative w-60 h-60 flex flex-col p-2 gap-3"
        id="inputBorder"
      >
        <div className="flex w-full h-full border-4 border-moda overflow-y-scroll">
          <div className="relative w-full h-fit gap-6 flex flex-col px-1.5 py-2.5">
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Contract Address
              </div>
              <input
                value={newContractActionInformation?.contractAddress || ""}
                placeholder="enter contract address"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  dispatch(
                    setNewContractActionInformation({
                      ...newContractActionInformation!,
                      contractAddress: e.target.value as any,
                    })
                  )
                }
              />
            </div>
            <div className="relative w-full h-fit gap-2 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Contract ABI
              </div>
              <div className="flex flex-col relative gap-1 w-full h-fit">
                <div className="relative flex flex-row justify-start items-center gap-1.5 w-fit h-fit">
                  <div
                    className="relative text-ama font-vcr text-sm flex"
                    id="blur"
                  >
                    Inputs
                  </div>
                  <div
                    className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
                    onClick={() =>
                      setActionInputs([
                        ...actionInputs,
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
                <div className="relative w-full h-fit flex flex-col gap-3">
                  {actionInputs?.map(
                    (
                      input: {
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
                            <div
                              className="relative w-fit h-fit flex"
                              id="blur"
                            >
                              Internal Type
                            </div>
                            <div
                              className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
                              id="borderLight"
                              onClick={() =>
                                setDropDownsOpenAction(((prevState: any) => {
                                  const updatedInternalTypes = [
                                    ...prevState.internalTypesInput,
                                  ];
                                  updatedInternalTypes[index] =
                                    !dropDownsOpenAction.internalTypesInput[
                                      index
                                    ];
                                  return {
                                    ...prevState,
                                    internalTypesInput: updatedInternalTypes,
                                  };
                                }) as any)
                              }
                            >
                              {input?.internalType}
                            </div>
                            {dropDownsOpenAction.internalTypesInput[index] && (
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
                                        setDropDownsOpenAction(((
                                          prevState: any
                                        ) => {
                                          const updatedInternalTypes = [
                                            ...prevState.internalTypesInput,
                                          ];
                                          updatedInternalTypes[index] =
                                            !dropDownsOpenAction
                                              .internalTypesInput[index];
                                          return {
                                            ...prevState,
                                            internalTypesInput:
                                              updatedInternalTypes,
                                          };
                                        }) as any);
                                        setActionInputs(((
                                          prevInputsArray: any
                                        ) => {
                                          const updatedInputsArray = [
                                            ...prevInputsArray,
                                          ];
                                          const updatedObject = {
                                            ...updatedInputsArray[index],
                                            internalType: type,
                                          };
                                          updatedInputsArray[index] =
                                            updatedObject;
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
                                setActionInputs(((prevInputsArray: any) => {
                                  const updatedInputsArray = [
                                    ...prevInputsArray,
                                  ];
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
                            <div
                              className="relative w-fit h-fit flex"
                              id="blur"
                            >
                              Type
                            </div>
                            <div
                              className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
                              id="borderLight"
                              onClick={() =>
                                setDropDownsOpenAction(((prevState: any) => {
                                  const updatedInternalTypes = [
                                    ...prevState.internalTypesInput,
                                  ];
                                  updatedInternalTypes[index] =
                                    !dropDownsOpenAction.internalTypesInput[
                                      index
                                    ];
                                  return {
                                    ...prevState,
                                    internalTypesInput: updatedInternalTypes,
                                  };
                                }) as any)
                              }
                            >
                              {input?.type}
                            </div>
                            {dropDownsOpenAction.typesInput[index] && (
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
                                        setDropDownsOpenAction(((
                                          prevState: any
                                        ) => {
                                          const updatedTypes = [
                                            ...prevState.typesInput,
                                          ];
                                          updatedTypes[index] =
                                            !dropDownsOpenAction.typesInput[
                                              index
                                            ];
                                          return {
                                            ...prevState,
                                            typesInput: updatedTypes,
                                          };
                                        }) as any);
                                        setActionInputs(((
                                          prevInputsArray: any
                                        ) => {
                                          const updatedTypesArray = [
                                            ...prevInputsArray,
                                          ];
                                          const updatedObject = {
                                            ...updatedTypesArray[index],
                                            type: type,
                                          };
                                          updatedTypesArray[index] =
                                            updatedObject;
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
                </div>
              </div>
              <div className="flex flex-col relative gap-1 w-full h-fit">
                <div className="relative flex flex-row justify-start items-center gap-1.5 w-fit h-fit">
                  <div
                    className="relative text-ama font-vcr text-sm flex"
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
                <div className="relative w-full h-fit flex flex-col gap-3">
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
                            <div
                              className="relative w-fit h-fit flex"
                              id="blur"
                            >
                              Internal Type
                            </div>
                            <div
                              className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
                              id="borderLight"
                              onClick={() =>
                                setDropDownsOpenAction(((prevState: any) => {
                                  const updatedInternalTypes = [
                                    ...prevState.internalTypesOutput,
                                  ];
                                  updatedInternalTypes[index] =
                                    !dropDownsOpenAction.internalTypesOutput[
                                      index
                                    ];
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
                                        setDropDownsOpenAction(((
                                          prevState: any
                                        ) => {
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
                                          updatedInputsArray[index] =
                                            updatedObject;
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
                                  const updatedInputsArray = [
                                    ...prevInputsArray,
                                  ];
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
                            <div
                              className="relative w-fit h-fit flex"
                              id="blur"
                            >
                              Type
                            </div>
                            <div
                              className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
                              id="borderLight"
                              onClick={() =>
                                setDropDownsOpenAction(((prevState: any) => {
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
                                        setDropDownsOpenAction(((
                                          prevState: any
                                        ) => {
                                          const updatedTypes = [
                                            ...prevState.typesOutput,
                                          ];
                                          updatedTypes[index] =
                                            !dropDownsOpenAction.typesOutput[
                                              index
                                            ];
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
                                          updatedTypesArray[index] =
                                            updatedObject;
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
                </div>
              </div>
              <div className="relative w-full h-fit flex flex-col gap-1">
                <div
                  className="relative w-fit h-fit flex text-ama font-vcr text-sm"
                  id="blur"
                >
                  Payable
                </div>
                <div
                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
                  id="borderLight"
                  onClick={() =>
                    setDropDownsOpenAction(((prevState: any) => {
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
                        setDropDownsOpenAction(((prevState: any) => {
                          return {
                            ...prevState,
                            payable: !prevState.payable,
                          };
                        }) as any);
                        setPayable(true);
                      }}
                    >
                      true
                    </div>
                    <div
                      className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                      id="borderLight"
                      onClick={() => {
                        setDropDownsOpenAction(((prevState: any) => {
                          return {
                            ...prevState,
                            payable: !prevState.payable,
                          };
                        }) as any);
                        setPayable(false);
                      }}
                    >
                      false
                    </div>
                  </div>
                )}
              </div>
              <div className="relative w-full h-fit flex flex-col gap-1">
                <div
                  className="relative w-fit h-fit flex text-ama font-vcr text-sm"
                  id="blur"
                >
                  State Mutability
                </div>
                <div
                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
                  id="borderLight"
                  onClick={() =>
                    setDropDownsOpenAction(((prevState: any) => {
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
                    {Array.from([
                      "external",
                      "private",
                      "public",
                      "internal",
                    ]).map((state: string, index: number) => {
                      return (
                        <div
                          key={index}
                          className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                          id="borderLight"
                          onClick={() => {
                            setDropDownsOpenAction(((prevState: any) => {
                              return {
                                ...prevState,
                                stateMutability: !prevState.stateMutability,
                              };
                            }) as any);
                            setStateMutability(state);
                          }}
                        >
                          {state}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Function Name
              </div>
              <input
                value={newContractActionInformation?.functionName || ""}
                placeholder="enter function name"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  dispatch(
                    setNewContractActionInformation({
                      ...newContractActionInformation!,
                      functionName: e.target.value as any,
                    })
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
      
      <div
        className="relative w-60 h-60 flex flex-col p-2 gap-3"
        id="inputBorder"
      >
        <div className="flex w-full h-full border-4 border-moda overflow-y-scroll">
          <div className="relative w-full h-fit gap-6 flex flex-col px-1.5 py-2.5">
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div className="relative flex flex-row justify-start items-center gap-1.5 w-fit h-fit">
                <div
                  className="relative text-ama font-vcr text-sm flex"
                  id="blur"
                >
                  Function Name Args
                </div>
                <div
                  className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
                  onClick={() => setFunctionArgs([...functionArgs, ""])}
                >
                  <IoMdAddCircleOutline size={15} color="#8EADB5" />
                </div>
              </div>
              {functionArgs?.map((arg: string, index: number) => {
                return (
                  <input
                    key={index}
                    placeholder="enter function arg"
                    value={arg || ""}
                    className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                    id="borderLight"
                    onChange={(e) => {
                      const updatedFunctionArgs = [...functionArgs];
                      updatedFunctionArgs[index] = e.target.value;
                      setFunctionArgs(updatedFunctionArgs);
                    }}
                  />
                );
              })}
            </div>
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Chain
              </div>
              <input
                value={newContractActionInformation?.chainId || ""}
                placeholder="enter chain name"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  dispatch(
                    setNewContractActionInformation({
                      ...newContractActionInformation!,
                      chainId: e.target.value as any,
                    })
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractAction;
