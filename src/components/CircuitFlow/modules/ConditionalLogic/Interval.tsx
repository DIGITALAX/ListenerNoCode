import { FunctionComponent } from "react";
import { IntervalProps } from "../../types/circuitflow.types";
import Input from "../Common/Input";

const Interval: FunctionComponent<IntervalProps> = ({
  interval,
  setInterval,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-60 flex flex-col p-2 gap-3"
      id="inputBorder"
    >
      <Input
        text={
          "How often should your conditions be checked? Enter your interval in milliseconds."
        }
      />
      <div className="relative w-full h-full gap-1 flex flex-col">
        <div
          className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-sm"
          id="blur"
        >
          Interval
        </div>
        <input
          value={interval || ""}
          placeholder="enter interval"
          className="bg-aBlack w-full h-10 p-1 text-white font-vcr text-sm justify-start items-start flex"
          id="borderLight"
          onChange={(e) => setInterval(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Interval;
