import { FunctionComponent } from "react";
import { AllCircuits, AllCircuitsProps } from "../types/account.types";
import { convertDate } from "../../../../lib/helpers/convertDate";
import { setSelectedUserCircuitSideBar } from "../../../../redux/reducers/selectedCircuitSideBarSlice";

const AllCircuits: FunctionComponent<AllCircuitsProps> = ({
  allUserCircuits,
  selectedCircuitSideBar,
  dispatch,
}): JSX.Element => {
  return (
    <div
      className="relative w-96 border-l-2 border-sol bg-aBlack px-4 py-6"
      id="heightAllCircuits"
    >
      <div className="flex flex-row items-center justify-center relative w-full h-full">
        <div className="relative w-1 h-full bg-moda"></div>
        <div className="relative w-full h-full flex flex-col gap-5">
          <div className="relative w-full h-fit flex flex-row items-start justify-center">
            <div className="relative h-1 w-10 bg-moda flex items-start justify-center"></div>
            <div
              className="relative h-3 w-4 flex items-center justify-center -top-0.5"
              id="boxGrad"
            ></div>
            <div
              className="uppercase text-xl font-vcr text-moda px-1 flex items-start whitespace-nowrap justify-center w-fit h-fit -top-2"
              id="blur"
            >
              All Circuits
            </div>
            <div
              className="relative h-3 w-4 flex items-center justify-center -top-0.5"
              id="boxGrad"
            ></div>
            <div className="relative h-1 w-full bg-moda flex items-center justify-center"></div>
          </div>
          <div className="relative w-full h-full flex flex-col gap-3 font-vcr px-2 items-center overflow-y-scroll">
            <div className="flex flex-col justify-start h-fit items-center gap-3">
              {allUserCircuits?.map((value: AllCircuits, index: number) => {
                return (
                  <div
                    key={index}
                    className={`relative w-full h-fit flex flex-row justify-center items-center gap-3 cursor-pointer active:scale-95 hover:text-sol active:text-sol grow text-center 
                  ${
                    value?.circuitInformation?.id === selectedCircuitSideBar
                      ? "text-sol"
                      : "text-white"
                  }  `}
                    onClick={() =>
                      dispatch(
                        setSelectedUserCircuitSideBar(
                          value?.circuitInformation?.id
                        )
                      )
                    }
                  >
                    <div className="relative flex flex-col relative w-full h-fit justify-start items-center">
                      <div
                        className="flex relative w-full h-fit uppercase items-center justify-center text-sm flex-row gap-1"
                        id="blur"
                      >
                        <div className="relative w-fit h-fit flex items-center justify-start">
                          Circuit {index}:
                        </div>
                        <div
                          className={`relative w-fit h-fit flex items-center justify-start ${
                            value?.interrupted
                              ? "text-costa"
                              : value?.completed
                              ? "text-comp"
                              : "text-run"
                          }`}
                        >
                          {value?.interrupted
                            ? `(interrupted)`
                            : value?.completed
                            ? `(completed)`
                            : `(running)`}
                        </div>
                      </div>
                      <div
                        className="flex relative w-full h-fit uppercase items-center justify-center text-xs"
                        id="blur"
                      >
                        {convertDate(value?.blockTimestamp)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative h-1 w-full bg-moda flex items-start justify-center"></div>
        </div>
        <div className="relative w-1 h-full bg-moda"></div>
      </div>
    </div>
  );
};

export default AllCircuits;