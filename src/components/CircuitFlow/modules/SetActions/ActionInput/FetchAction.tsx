import { FunctionComponent } from "react";
import Input from "../../Common/Input";
import { FetchActionProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { setNewFetchActionInformation } from "../../../../../../redux/reducers/newFetchActionInformationSlice";
import { IoMdAddCircleOutline } from "react-icons/io";

const FetchAction: FunctionComponent<FetchActionProps> = ({
  newFetchActionInformation,
  dispatch,
  signConditions,
  setSignConditions,
  setDropDownsOpenAction,
  dropDownsOpenAction,
}): JSX.Element => {
  return (
    <div className="relative flex flex-row items-center justify-center w-fit h-fit">
      <div
        className="relative w-60 h-60 flex flex-col p-2 gap-3"
        id="inputBorder"
      >
        <Input text="Enter API base URL, endpoint, value path and an API Key if required." />
        <div className="flex w-full h-full border-4 border-moda overflow-y-scroll">
          <div className="relative w-full h-fit gap-6 flex flex-col px-1.5 py-2.5">
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Base URL
              </div>
              <input
                value={newFetchActionInformation?.baseUrl || ""}
                placeholder="enter base URL"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  dispatch(
                    setNewFetchActionInformation({
                      ...newFetchActionInformation!,
                      baseUrl: e.target.value as any,
                    })
                  )
                }
              />
            </div>
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Endpoint
              </div>
              <input
                value={newFetchActionInformation?.endpoint || ""}
                placeholder="enter endpoint"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  dispatch(
                    setNewFetchActionInformation({
                      ...newFetchActionInformation!,
                      endpoint: e.target.value as any,
                    })
                  )
                }
              />
            </div>
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                Event Response Path
              </div>
              <input
                value={newFetchActionInformation?.responsePath || ""}
                placeholder="enter.response.path.like.this"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  dispatch(
                    setNewFetchActionInformation({
                      ...newFetchActionInformation!,
                      responsePath: e.target.value as any,
                    })
                  )
                }
              />
            </div>
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                API Key
              </div>
              <input
                type="password"
                value={newFetchActionInformation?.apiKey || ""}
                placeholder="if you need an api key"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  dispatch(
                    setNewFetchActionInformation({
                      ...newFetchActionInformation!,
                      apiKey: e.target.value as any,
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
        <Input text="Enter what you'd like to be signed on-chain, the sign condition and it's priority with other actions." />
        <div className="flex w-full h-full border-4 border-moda overflow-y-scroll">
          <div className="relative w-full h-fit gap-6 flex flex-col px-1.5 py-2.5">
            <div className="relative w-full h-fit gap-1 flex flex-col">
              <div
                className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-base"
                id="blur"
              >
                To Sign
              </div>
              <input
                value={newFetchActionInformation?.toSign?.toString() || ""}
                placeholder="enter value to sign"
                className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                id="borderLight"
                onChange={(e) =>
                  dispatch(
                    setNewFetchActionInformation({
                      ...newFetchActionInformation!,
                      toSign: e.target.value as any,
                    })
                  )
                }
              />
            </div>
            <div className="flex flex-col relative gap-1 w-full h-fit">
              <div className="relative flex flex-row justify-start items-center gap-1.5 w-fit h-fit">
                <div
                  className="relative text-ama font-vcr text-sm flex"
                  id="blur"
                >
                  Sign Conditions
                </div>
                <div
                  className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
                  onClick={() =>
                    setSignConditions([
                      ...signConditions,
                      {
                        type: "&&",
                        operator: "==",
                        value: "",
                        valueType: "string",
                      },
                    ])
                  }
                >
                  <IoMdAddCircleOutline size={15} color="#8EADB5" />
                </div>
              </div>
              <div className="relative w-full h-fit flex flex-col gap-3">
                {signConditions?.map(
                  (
                    sign: {
                      type: string;
                      operator: string;
                      value: boolean | number | string;
                      valueType: any;
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
                            Type
                          </div>
                          <div
                            className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
                            id="borderLight"
                            onClick={() =>
                              setDropDownsOpenAction(((prevState: any) => {
                                const updatedSignTypes = [
                                  ...prevState?.signType,
                                ];
                                updatedSignTypes[index] =
                                  !dropDownsOpenAction?.signType[index];
                                return {
                                  ...prevState,
                                  signType: updatedSignTypes,
                                };
                              }) as any)
                            }
                          >
                            {sign?.type}
                          </div>
                          {dropDownsOpenAction?.signType[index] && (
                            <div className="z-10 absolute w-full h-fit flex flex-col bg-aBlack">
                              {Array.from(["&&", "||"]).map(
                                (type: string, indexTwo: number) => {
                                  return (
                                    <div
                                      key={indexTwo}
                                      className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                                      id="borderLight"
                                      onClick={() => {
                                        setDropDownsOpenAction(((
                                          prevState: any
                                        ) => {
                                          const updatedSignTypes = [
                                            ...prevState?.signType,
                                          ];
                                          updatedSignTypes[index] =
                                            !dropDownsOpenAction?.signType[
                                              index
                                            ];
                                          return {
                                            ...prevState,
                                            signType: updatedSignTypes,
                                          };
                                        }) as any);
                                        setSignConditions(((
                                          prevInputsArray: any
                                        ) => {
                                          const updatedSignsArray = [
                                            ...prevInputsArray,
                                          ];
                                          const updatedObject = {
                                            ...updatedSignsArray[index],
                                            type: type,
                                          };
                                          updatedSignsArray[index] =
                                            updatedObject;
                                          return updatedSignsArray;
                                        }) as any);
                                      }}
                                    >
                                      {type}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          )}
                        </div>
                        <div className="relative w-full h-fit gap-1 flex flex-col">
                          <div
                            className="relative w-fit h-fit justify-start items-start flex font-vcr text-white text-sm"
                            id="blur"
                          >
                            Operator
                          </div>
                          <input
                            value={sign?.operator || ""}
                            placeholder="< > == != >= <= !== ==="
                            className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                            id="borderLight"
                            onChange={(e) =>
                              setSignConditions(((prevInputsArray: any) => {
                                const updatedOperatorArray = [
                                  ...prevInputsArray,
                                ];
                                const updatedObject = {
                                  ...updatedOperatorArray[index],
                                  operator: e.target.value,
                                };
                                updatedOperatorArray[index] = updatedObject;
                                return updatedOperatorArray;
                              }) as any)
                            }
                          />
                        </div>
                        <div className="relative w-full h-fit gap-1 flex flex-col">
                          <div
                            className="relative w-fit h-fit justify-start items-start flex font-vcr text-white text-sm"
                            id="blur"
                          >
                            Operator
                          </div>
                          <input
                            value={sign?.value?.toString() || ""}
                            placeholder="enter value to match"
                            className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
                            id="borderLight"
                            onChange={(e) =>
                              setSignConditions(((prevInputsArray: any) => {
                                const updatedValueArray = [...prevInputsArray];
                                const updatedObject = {
                                  ...updatedValueArray[index],
                                  value: e.target.value,
                                };
                                updatedValueArray[index] = updatedObject;
                                return updatedValueArray;
                              }) as any)
                            }
                          />
                        </div>
                        <div className="relative w-full h-fit flex flex-col gap-1">
                          <div className="relative w-fit h-fit flex" id="blur">
                            Value Type
                          </div>
                          <div
                            className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer"
                            id="borderLight"
                            onClick={() =>
                              setDropDownsOpenAction(((prevState: any) => {
                                const updatedValueTypes = [
                                  ...prevState?.valueType,
                                ];
                                updatedValueTypes[index] =
                                  !dropDownsOpenAction?.valueType[index];
                                return {
                                  ...prevState,
                                  valueType: updatedValueTypes,
                                };
                              }) as any)
                            }
                          >
                            {sign?.valueType}
                          </div>
                          {dropDownsOpenAction?.valueType[index] && (
                            <div className="z-10 absolute w-full h-fit flex flex-col bg-aBlack">
                              {Array.from(["boolean", "number", "string"]).map(
                                (type: string, indexTwo: number) => {
                                  return (
                                    <div
                                      key={indexTwo}
                                      className="relative w-full h-10 bg-aBlack text-white font-vcr text-sm cursor-pointer hover:bg-sol flex items-center justify-center text-center hover:text-black"
                                      id="borderLight"
                                      onClick={() => {
                                        setDropDownsOpenAction(((
                                          prevState: any
                                        ) => {
                                          const updatedValueTypes = [
                                            ...prevState?.valueType,
                                          ];
                                          updatedValueTypes[index] =
                                            !dropDownsOpenAction?.valueType[
                                              index
                                            ];
                                          return {
                                            ...prevState,
                                            valueType: updatedValueTypes,
                                          };
                                        }) as any);
                                        setSignConditions(((
                                          prevInputsArray: any
                                        ) => {
                                          const updatedValueTypesArray = [
                                            ...prevInputsArray,
                                          ];
                                          const updatedObject = {
                                            ...updatedValueTypesArray[index],
                                            valueType: type,
                                          };
                                          updatedValueTypesArray[index] =
                                            updatedObject;
                                          return updatedValueTypesArray;
                                        }) as any);
                                      }}
                                    >
                                      {type}
                                    </div>
                                  );
                                }
                              )}
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
        </div>
      </div>
    </div>
  );
};

export default FetchAction;
