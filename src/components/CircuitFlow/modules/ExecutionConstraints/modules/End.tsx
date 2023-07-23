import { EndStartProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { FunctionComponent } from "react";
import ReactDatePicker from "react-datepicker";

const End: FunctionComponent<EndStartProps> = ({
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
          End Date
        </div>
        <div className="relative w-fit h-fit">
          <ReactDatePicker
            selected={new Date(time?.endDate as any)}
            onChange={(date) =>
              setTime({
                endDate: date ? date?.toString() : undefined,
                startDate: new Date(time?.startDate as any) as any,
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

export default End;
