import { FunctionComponent } from "react";
import { EndStartProps } from "../../types/circuitflow.types";
import ConditionInput from "../SetConditions/modules/ConditionInput/ConditionInput";
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
      <ConditionInput
        text={
          "Should the circuit start & stop at certain dates? Leave empty if it should run immediately and there is no specific end date. Dates run in EST."
        }
      />
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
              selected={time?.startDate}
              onChange={(date) =>
                setTime({
                  startDate: date ? date : undefined,
                  endDate: time?.endDate,
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
                selected={time?.endDate}
                onChange={(date) =>
                  setTime({
                    startDate: time?.startDate,
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
