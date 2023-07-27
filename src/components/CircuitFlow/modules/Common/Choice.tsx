import { ChoiceProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { FunctionComponent } from "react";

const Choice: FunctionComponent<ChoiceProps> = ({
  setChoiceType,
  choiceType,
  editingState,
  arrayValues,
  titleValues,
}): JSX.Element => {
  return (
    <div className="relative w-fit h-fit flex items-center justify-start flex-col gap-4 overflow-y-scroll">
      {choiceType.includes("web") && (
        <div className="text-white relative w-3/4 text-center h-fit font-vcr text-xs items-center justify-center">{`(Note that the no-code instance is still in beta mode and uses an experimental PKP backend infrastructure for greater decentralisation, your circuit may be interrupted or reset at anytime). Use the SDK for more fine grained control.`}</div>
      )}
      <div
        className="relative w-80 h-60 flex flex-col p-2 gap-3 justify-center items-center"
        id="inputBorder"
      >
        <div className="flex flex-col w-full h-full p-1">
          {Array.from(arrayValues).map((value: string, index: number) => {
            return (
              <div
                className="relative w-full h-full flex flex-col gap-1.5"
                key={index}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <div
                    className={`relative w-full h-16 flex items-center justify-center ${
                      !editingState &&
                      "cursor-pointer hover:opacity-50 active:scale-95"
                    } ${
                      choiceType === value
                        ? "bg-white"
                        : "border-ballena border-2"
                    }`}
                    id={choiceType === value ? "borderLight" : ""}
                    onClick={() => !editingState && setChoiceType(value)}
                  >
                    <div
                      className={`relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-xl ${
                        choiceType === value ? "text-black" : "text-ballena"
                      }`}
                    >
                      {titleValues[index]}
                    </div>
                  </div>
                </div>
                {index !== arrayValues?.length - 1 && (
                  <div className="relative w-full h-fit font-vcr text-ballena text-xl items-center justify-center text-center flex flex-col pb-1.5">
                    <div className="relative w-fit h-fit items-center justify-center">
                      -or-
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Choice;
