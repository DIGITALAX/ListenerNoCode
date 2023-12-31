import { EndStartProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { FunctionComponent } from "react";
import ReactDatePicker from "react-datepicker";

const Start: FunctionComponent<EndStartProps> = ({
  time,
  setTime,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-40 flex flex-col p-2 gap-3 justify-start items-center"
      id="inputBorder"
    >
      <div className="relative w-full h-full flex flex-col gap-1 justify-center items-center">
        <div
          className="relative w-fit h-fit justify-center items-center flex font-vcr text-ballena text-sm"
          id="blur"
        >
          Start Date
        </div>
        <div className="relative w-fit h-fit">
          <ReactDatePicker
            selected={new Date(time?.startDate as any)}
            onChange={(date) =>
              setTime({
                startDate: date
                  ? date?.toString()
                  : undefined,
                endDate: new Date(time?.endDate as any) as any,
              })
            }
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
      </div>
    </div>
  );
};

export default Start;
