import { FunctionComponent } from "react";
import { EndStartProps } from "../../types/circuitflow.types";

import DatePicker from "react-datepicker";

const EndStart: FunctionComponent<EndStartProps> = ({
  time,
  setTime,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-72 flex flex-col p-2 gap-3"
      id="inputBorder"
    >
    
      <div className="relative w-full h-full gap-2 flex flex-col">
        <div className="relative w-full h-full flex flex-col gap-1">
          <div
            className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-sm"
            id="blur"
          >
            Start Date
          </div>
          <div className="relative w-fit h-fit">
            <DatePicker
              selected={new Date(time?.startDate as any)}
              onChange={(date) =>
                setTime({
                  startDate: date ? date : undefined,
                  endDate: new Date(time?.endDate as any),
                })
              }
              showTimeSelect
              dateFormat="Pp"
            />
          </div>
        </div>
        <div className="relative w-full h-full flex flex-col gap-1">
          <div
            className="relative w-fit h-fit justify-start items-start flex font-vcr text-sol text-sm"
            id="blur"
          >
            End Date
          </div>
          <div>
            <div className="relative flex w-fit h-fit">
              <DatePicker
                selected={new Date(time?.endDate as any)}
                onChange={(date) =>
                  setTime({
                    startDate: new Date(time?.startDate as any),
                    endDate: date ? date : undefined,
                  })
                }
                showTimeSelect
                dateFormat="Pp"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndStart;
