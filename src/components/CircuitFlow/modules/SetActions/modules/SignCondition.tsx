import { SignConditionProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { FunctionComponent } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import Input from "../../Common/Input";
import DropDown from "../../Common/DropDown";

const SignCondition: FunctionComponent<SignConditionProps> = ({
  signConditions,
  setToSign,
  toSignValue,
  setAddSignConditions,
  dropDownsOpen,
  setSignType,
  setSignOperator,
  setSignValue,
  setSignTypeDropDown,
  setSignValueType,
  setSignValueTypeDropDown,
}): JSX.Element => {
  return (
    <div className="relative flex flex-row items-center justify-center w-fit h-fit">
      <div
        className="relative w-fit h-60 flex flex-col p-2 gap-3"
        id="inputBorder"
      >
        <div className="flex w-full h-full overflow-y-scroll">
          <div className="relative w-full h-fit gap-6 flex flex-col px-1.5 py-2.5">
            <Input
              text={["To Sign"]}
              onChangeFunction={[(e) => setToSign(e)]}
              changedValue={[toSignValue || ""]}
              count={1}
              placeholderText={["enter the value to sign"]}
            />
            <div className="flex flex-col relative gap-1 w-full h-fit ">
              <div className="relative flex flex-row justify-start items-center gap-1.5 w-fit h-fit p-2">
                <div
                  className="relative text-ballena font-vcr text-sm flex"
                  id="blur"
                >
                  Sign Conditions
                </div>
                <div
                  className="relative w-fit h-fit flex items-center justify-center cursor-pointer active:scale-95"
                  onClick={() => setAddSignConditions()}
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
                        <DropDown
                          setDropDownOpenIndex={(type) =>
                            setSignTypeDropDown(index, type)
                          }
                          setDropDownOpen={() => setSignType(index)}
                          inputChosen={sign?.type}
                          dropDownOpen={dropDownsOpen?.signType[index]}
                          title={"Type"}
                          inputArray={Array.from(["&&", "||"])}
                          top={"10px"}
                          border={true}
                        />
                        <Input
                          text={["Operator"]}
                          onChangeFunction={[(e) => setSignOperator(index, e)]}
                          changedValue={[sign?.operator]}
                          count={1}
                          placeholderText={["== >= <= != !== < > ==="]}
                          border={true}
                        />
                        <Input
                          text={["Value To Match"]}
                          onChangeFunction={[(e) => setSignValue(index, e)]}
                          changedValue={[String(sign?.value) || ""]}
                          count={1}
                          placeholderText={["enter the value to be matched"]}
                          border={true}
                        />
                        <DropDown
                          setDropDownOpenIndex={(type) =>
                            setSignValueType(index, type)
                          }
                          setDropDownOpen={() =>
                            setSignValueTypeDropDown(index)
                          }
                          inputChosen={sign?.valueType}
                          dropDownOpen={dropDownsOpen?.valueType[index]}
                          title={"Value Type"}
                          inputArray={Array.from([
                            "boolean",
                            "number",
                            "string",
                          ])}
                          top={"10px"}
                          border={true}
                        />
                        <div className="relative w-full px-1 h-1 bg-ballena"></div>
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

export default SignCondition;
