import { FunctionComponent } from "react";
import { SelectedCircuitProps } from "../types/account.types";
import { convertDate } from "../../../../lib/helpers/convertDate";
import { AiOutlineLoading } from "react-icons/ai";
import moment from "moment";

const SelectedCircuit: FunctionComponent<SelectedCircuitProps> = ({
  selectedCircuit,
  interruptLoading,
  handleInterruptCircuit,
}): JSX.Element => {
  return (
    <div
      className="relative w-full h-full justify-center items-center flex"
      id="heightAllCircuits"
    >
      <div
        className="relative w-5/6 h-5/6 justify-center items-center bg-black/50 flex flex-col p-3 gap-3"
        id="inputBorder"
      >
        <div className="relative w-full h-fit justify-between items-center inline-flex flex-wrap gap-4 font-vcr text-sm">
          <div className="relative flex flex-row gap-3">
            <div className="relative flex items-center justify-center text-white">
              Circuit Id:
            </div>
            <div className="relative flex items-center justify-center text-ballena">
              {selectedCircuit?.circuitInformation?.id?.slice(0, 8) +
                "-" +
                selectedCircuit?.circuitInformation?.id?.slice(8, 12) +
                "-" +
                selectedCircuit?.circuitInformation?.id?.slice(12, 16) +
                "-" +
                selectedCircuit?.circuitInformation?.id?.slice(16, 20) +
                "-" +
                selectedCircuit?.circuitInformation?.id?.slice(20)}
            </div>
          </div>
          {!selectedCircuit ||
          (Object.keys(selectedCircuit?.completed).length === 0 &&
            Object.keys(selectedCircuit?.interrupted).length === 0) ? (
            <div className="relative flex flex-row h-fit w-fit">
              <div
                className={`relative flex items-center justify-center border border-white p-2 bg-ballena text-black h-8 w-36 ${
                  !interruptLoading && "cursor-pointer active:scale-95"
                }`}
                onClick={() =>
                  handleInterruptCircuit(
                    selectedCircuit?.circuitInformation?.id?.slice(0, 8) +
                      "-" +
                      selectedCircuit?.circuitInformation?.id?.slice(8, 12) +
                      "-" +
                      selectedCircuit?.circuitInformation?.id?.slice(12, 16) +
                      "-" +
                      selectedCircuit?.circuitInformation?.id?.slice(16, 20) +
                      "-" +
                      selectedCircuit?.circuitInformation?.id?.slice(20)
                  )
                }
              >
                <div
                  className={`relative w-fit h-fit flex items-center justify-center text-xs ${
                    interruptLoading && "animate-spin"
                  }`}
                >
                  {interruptLoading ? (
                    <AiOutlineLoading color="black" size={15} />
                  ) : (
                    "Interrupt Circuit"
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative flex flex-row h-fit w-fit">
              <div
                className={`relative flex items-center justify-center border border-white p-2 bg-comp text-white h-8 w-40`}
              >
                <div
                  className={`relative w-fit h-fit flex items-center justify-center text-xs`}
                >
                  {Object.keys(selectedCircuit?.interrupted).length !== 0
                    ? "Circuit Interrupted"
                    : "Circuit Completed"}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="relative bg-white h-px w-full"></div>
        <div className="relative w-full h-44 flex flex-col overflow-y-scroll">
          <div className="relative w-full h-fit inline-flex flex-wrap  justify-between items-center font-vcr pt-3 gap-3">
            <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
              <div className="relative w-fit h-fit text-white">
                Circuit Instantiated:
              </div>
              <div className="relative w-fit h-fit text-sol">
                {selectedCircuit?.blockTimestamp &&
                  convertDate(selectedCircuit?.blockTimestamp)}
              </div>
            </div>
            <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
              <div className="relative w-fit h-fit text-white">
                Circuit Block Number:
              </div>
              <div className="relative w-fit h-fit text-sol">
                {selectedCircuit?.blockNumber}
              </div>
            </div>
            <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
              <div className="relative w-fit h-fit text-white">
                Lit Action Code IPFS Hash:
              </div>
              <div className="relative w-fit h-fit text-sol">
                ipfs://{selectedCircuit?.circuitInformation?.ipfs}
              </div>
            </div>
            <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
              <div className="relative w-fit h-fit text-white">
                Action Count
              </div>
              <div className="relative w-fit h-fit text-sol">
                {selectedCircuit?.circuitInformation?.information
                  ?.circuitActions?.length || 0}
              </div>
            </div>
            <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
              <div className="relative w-fit h-fit text-white">
                Condition Count
              </div>
              <div className="relative w-fit h-fit text-sol">
                {selectedCircuit?.circuitInformation?.information
                  ?.circuitActions?.length || 0}
              </div>
            </div>
          </div>
          <div className="relative w-full h-fit inline-flex flex-wrap gap-3 justify-between items-center font-vcr pt-3">
            <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
              <div className="relative w-fit h-fit text-white">
                Assigned PKP Token Id
              </div>
              <div className="relative w-fit h-fit text-sol break-all">
                {selectedCircuit?.circuitInformation?.tokenId}
              </div>
            </div>
            <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
              <div className="relative w-fit h-fit text-white">
                Assigned PKP Address
              </div>
              <div className="relative w-fit h-fit text-sol break-all">
                {selectedCircuit?.circuitInformation?.pkpAddress}
              </div>
            </div>
          </div>
          <div className="relative w-full h-fit inline-flex flex-wrap gap-3 justify-between items-center font-vcr pt-3">
            <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
              <div className="relative w-fit h-fit text-white">
                Conditional Logic Type
              </div>
              <div className="relative w-fit h-fit text-sol">
                {
                  selectedCircuit?.circuitInformation?.information
                    ?.conditionalLogic?.type
                }
              </div>
            </div>
            <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
              <div className="relative w-fit h-fit text-white">Interval</div>
              <div className="relative w-fit h-fit text-sol">
                {
                  selectedCircuit?.circuitInformation?.information
                    ?.conditionalLogic?.interval
                }{" "}
                ms
              </div>
            </div>
            <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
              <div className="relative w-fit h-fit text-white">
                Max Monitor Executions
              </div>
              <div className="relative w-fit h-fit text-sol">
                {selectedCircuit?.logs?.monitorExecutions || 0} /{" "}
                {selectedCircuit?.circuitInformation?.information
                  ?.executionConstraints?.conditionMonitorExecutions || "∞"}
              </div>
            </div>
            <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
              <div className="relative w-fit h-fit text-white">
                Max Circuit Executions
              </div>
              <div className="relative w-fit h-fit text-sol">
                {selectedCircuit?.logs?.circuitExecutions || 0} /{" "}
                {selectedCircuit?.circuitInformation?.information
                  ?.executionConstraints?.maxLitActionCompletions || "∞"}
              </div>
            </div>
            <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
              <div className="relative w-fit h-fit text-white">Start Date</div>
              <div className="relative w-fit h-fit text-sol">
                {moment(
                  selectedCircuit?.circuitInformation?.information
                    ?.executionConstraints?.startDate
                ).calendar()}
              </div>
            </div>
            <div className="relative flex flex-col gap-1 w-fit h-fit justify-center items-start text-xs">
              <div className="relative w-fit h-fit text-white">
                Expected End Date
              </div>
              <div className="relative w-fit h-fit text-sol">
                {moment(
                  selectedCircuit?.circuitInformation?.information
                    ?.executionConstraints?.endDate
                ).calendar()}
              </div>
            </div>
          </div>
        </div>
        <div className="relative bg-white h-px w-full"></div>
        <div className="relative w-full h-fit flex flex-row justify-between items-center font-vcr pt-3">
          <div className="relative w-fit h-fit text-white text-sm">
            Circuit Logs
          </div>
        </div>
        <div className="relative w-full h-full flex overflow-y-scroll">
          <div className="relative w-full h-fit flex flex-col gap-3">
            {selectedCircuit?.logs?.stringifiedLogs?.map(
              (log, index: number) => {
                let data: string;
                if (Number(log?.category) === 0) {
                  try {
                    data = JSON.parse(log.responseObject).message;
                  } catch (error) {
                    data = log.responseObject?.split("[ See:")[0];
                  }
                } else {
                  data = log?.responseObject;
                }
                return (
                  <div
                    key={index}
                    className="relative flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 font-vcr text-xs px-1.5 p-2 border border-white bg-black/60"
                  >
                    <div
                      className={`relative flex w-36 h-fit ${
                        Number(log?.category) === 0
                          ? "text-rojo"
                          : Number(log?.category) === 1
                          ? "text-run"
                          : Number(log?.category) === 2
                          ? "text-costa"
                          : Number(log?.category) === 3
                          ? "text-comp"
                          : "text-rio"
                      }`}
                    >
                      {Number(log?.category) === 0
                        ? "ERROR >>>"
                        : Number(log?.category) === 1
                        ? "RESPONSE >>>"
                        : Number(log?.category) === 2
                        ? "CONDITION >>>"
                        : Number(log?.category) === 3
                        ? "BROADCAST >>>"
                        : "EXECUTION >>>"}
                    </div>
                    <div className="relative flex flex-col gap-1.5 text-white w-full sm:pl-10">
                      <div className="relative w-fit h-fit flex text-ballena justify-center">
                        Message
                      </div>
                      <div className="relative w-fit h-fit flex break-words justify-center">
                        {log?.message}
                      </div>
                    </div>
                    <div className="relative w-full h-fit flex flex-col gap-1.5 text-white items-start justify-center">
                      <div className="relative w-fit h-fit text-ballena items-end">
                        Data
                      </div>
                      <div className="relative w-fit h-fit flex break-words">
                        {data}
                      </div>
                    </div>
                    <div className="relative w-fit h-fit flex flex-col gap-1.5 text-white sm:ml-auto sm:items-end justify-center">
                      <div className="relative w-fit h-fit text-ballena items-end">
                        Timestamp
                      </div>
                      <div className="relative w-fit h-fit flex break-words">
                        {new Date(log?.isoDate).getDate() || 0}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCircuit;
