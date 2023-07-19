import { FunctionComponent } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { setNewContractConditionInformation } from "../../../../../../../redux/reducers/newContractConditionInformationSlice";

const ContractCondition: FunctionComponent<ContractConditionProps> = ({
  newContractConditionInformation,
  inputs,
  outputs,
  setInputs,
  setOutputs,
  dropDownsOpenContract,
  setDropDownsOpenContract,
  eventArgs,
  setEventArgs,
  expectedValues,
  setExpectedValues,
  dispatch,
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
                value={newContractConditionInformation?.contractAddress || ""}
                placeholder="enter contract address"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  dispatch(
                    setNewContractConditionInformation({
                      ...newContractConditionInformation!,
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
                      setInputs([
                        ...inputs,
                        {
                          indexed: true,
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
                  {inputs?.map(
                    (
                      input: {
                        indexed: boolean;
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
                              Indexed
                            </div>
                            <div
                              className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
                              id="borderLight"
                              onClick={() =>
                                setDropDownsOpenContract(((prevState: any) => {
                                  const updatedIndexed = [...prevState.indexed];
                                  updatedIndexed[index] =
                                    !dropDownsOpenContract.indexed[index];
                                  return {
                                    ...prevState,
                                    indexed: updatedIndexed,
                                  };
                                }) as any)
                              }
                            >
                              {`${input?.indexed}`}
                            </div>
                            {dropDownsOpenContract.indexed[index] && (
                              <div className="z-10 absolute w-full h-fit flex flex-col bg-aBlack">
                                <div
                                  className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                                  id="borderLight"
                                  onClick={() => {
                                    setDropDownsOpenContract(((
                                      prevState: any
                                    ) => {
                                      const updatedIndexed = [
                                        ...prevState.indexed,
                                      ];
                                      updatedIndexed[index] = false;
                                      return {
                                        ...prevState,
                                        indexed: updatedIndexed,
                                      };
                                    }) as any);
                                    setInputs(((prevInputsArray: any) => {
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
                                    setDropDownsOpenContract(((
                                      prevState: any
                                    ) => {
                                      const updatedIndexed = [
                                        ...prevState.indexed,
                                      ];
                                      updatedIndexed[index] = false;
                                      return {
                                        ...prevState,
                                        indexed: updatedIndexed,
                                      };
                                    }) as any);
                                    setInputs(((prevInputsArray: any) => {
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
                                setDropDownsOpenContract(((prevState: any) => {
                                  const updatedInternalTypes = [
                                    ...prevState.internalTypesInput,
                                  ];
                                  updatedInternalTypes[index] =
                                    !dropDownsOpenContract.internalTypesInput[
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
                            {dropDownsOpenContract.internalTypesInput[
                              index
                            ] && (
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
                                        setDropDownsOpenContract(((
                                          prevState: any
                                        ) => {
                                          const updatedInternalTypes = [
                                            ...prevState.internalTypesInput,
                                          ];
                                          updatedInternalTypes[index] =
                                            !dropDownsOpenContract
                                              .internalTypesInput[index];
                                          return {
                                            ...prevState,
                                            internalTypesInput:
                                              updatedInternalTypes,
                                          };
                                        }) as any);
                                        setInputs(((prevInputsArray: any) => {
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
                                setInputs(((prevInputsArray: any) => {
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
                                setDropDownsOpenContract(((prevState: any) => {
                                  const updatedInternalTypes = [
                                    ...prevState.internalTypesInput,
                                  ];
                                  updatedInternalTypes[index] =
                                    !dropDownsOpenContract.internalTypesInput[
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
                            {dropDownsOpenContract.typesInput[index] && (
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
                                        setDropDownsOpenContract(((
                                          prevState: any
                                        ) => {
                                          const updatedTypes = [
                                            ...prevState.typesInput,
                                          ];
                                          updatedTypes[index] =
                                            !dropDownsOpenContract.typesInput[
                                              index
                                            ];
                                          return {
                                            ...prevState,
                                            typesInput: updatedTypes,
                                          };
                                        }) as any);
                                        setInputs(((prevInputsArray: any) => {
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
                      setOutputs([
                        ...outputs,
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
                  {outputs?.map(
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
                                setDropDownsOpenContract(((prevState: any) => {
                                  const updatedInternalTypes = [
                                    ...prevState.internalTypesOutput,
                                  ];
                                  updatedInternalTypes[index] =
                                    !dropDownsOpenContract.internalTypesOutput[
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
                            {dropDownsOpenContract.internalTypesOutput[
                              index
                            ] && (
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
                                        setDropDownsOpenContract(((
                                          prevState: any
                                        ) => {
                                          const updatedInternalTypes = [
                                            ...prevState.internalTypesOutput,
                                          ];
                                          updatedInternalTypes[index] =
                                            !dropDownsOpenContract
                                              .internalTypesOutput[index];
                                          return {
                                            ...prevState,
                                            internalTypesOutput:
                                              updatedInternalTypes,
                                          };
                                        }) as any);
                                        setOutputs(((prevInputsArray: any) => {
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
                                setOutputs(((prevInputsArray: any) => {
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
                                setDropDownsOpenContract(((prevState: any) => {
                                  const updatedInternalTypes = [
                                    ...prevState.typesOutput,
                                  ];
                                  updatedInternalTypes[index] =
                                    !dropDownsOpenContract.typesOutput[index];
                                  return {
                                    ...prevState,
                                    typesOutput: updatedInternalTypes,
                                  };
                                }) as any)
                              }
                            >
                              {output?.type}
                            </div>
                            {dropDownsOpenContract.typesOutput[index] && (
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
                                        setDropDownsOpenContract(((
                                          prevState: any
                                        ) => {
                                          const updatedTypes = [
                                            ...prevState.typesOutput,
                                          ];
                                          updatedTypes[index] =
                                            !dropDownsOpenContract.typesOutput[
                                              index
                                            ];
                                          return {
                                            ...prevState,
                                            typesOutput: updatedTypes,
                                          };
                                        }) as any);
                                        setOutputs(((prevInputsArray: any) => {
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
            </div>
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Event Name
              </div>
              <input
                value={newContractConditionInformation?.eventName || ""}
                placeholder="enter event name"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  dispatch(
                    setNewContractConditionInformation({
                      ...newContractConditionInformation!,
                      eventName: e.target.value as any,
                    })
                  )
                }
              />
            </div>
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div className="relative flex flex-row justify-start items-center gap-1.5 w-fit h-fit">
                <div
                  className="relative text-ama font-vcr text-sm flex"
                  id="blur"
                >
                  Event Name Args
                </div>
                <div
                  className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
                  onClick={() => setEventArgs([...eventArgs, ""])}
                >
                  <IoMdAddCircleOutline size={15} color="#8EADB5" />
                </div>
              </div>
              {eventArgs?.map((arg: string, index: number) => {
                return (
                  <input
                    key={index}
                    placeholder="enter event name arg"
                    value={arg || ""}
                    className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                    id="borderLight"
                    onChange={(e) => {
                      const updatedEventArgs = [...eventArgs];
                      updatedEventArgs[index] = e.target.value;
                      setEventArgs(updatedEventArgs);
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
                value={newContractConditionInformation?.chainId || ""}
                placeholder="enter chain name"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  dispatch(
                    setNewContractConditionInformation({
                      ...newContractConditionInformation!,
                      chainId: e.target.value as any,
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
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Match Operator
              </div>
              <input
                value={newContractConditionInformation?.matchOperator || ""}
                placeholder="== > < != >= <= === !=="
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  dispatch(
                    setNewContractConditionInformation({
                      ...newContractConditionInformation!,
                      matchOperator: e.target.value as any,
                    })
                  )
                }
              />
            </div>
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div className="relative flex flex-row justify-start items-center gap-1.5 w-fit h-fit">
                <div
                  className="relative text-ama font-vcr text-sm flex"
                  id="blur"
                >
                  Expected Values
                </div>
                <div
                  className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
                  onClick={() => setExpectedValues([...expectedValues, ""])}
                >
                  <IoMdAddCircleOutline size={15} color="#8EADB5" />
                </div>
              </div>
              {expectedValues?.map((valueExpected: any, index: number) => {
                return (
                  <input
                    key={index}
                    placeholder="object, number, array, bigint, bytes, string"
                    value={valueExpected || ""}
                    className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                    id="borderLight"
                    onChange={(e) => {
                      const updatedExpectedValues = [...expectedValues];
                      updatedExpectedValues[index] = e.target.value;
                      setExpectedValues(updatedExpectedValues);
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
                Matched, UnMatched, Error Functions
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractCondition;
