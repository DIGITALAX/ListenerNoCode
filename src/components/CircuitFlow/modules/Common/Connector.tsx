import { FunctionComponent } from "react";
import { ConnectorProps } from "../../types/circuitflow.types";

const Connector: FunctionComponent<ConnectorProps> = ({
  topOnly,
}): JSX.Element => {
  return (
    <div className="relative w-fit h-fit flex flex-row items-center justify-center">
      {!topOnly && (
        <div className="relative flex flex-col gap-3 left-1.5 top-5">
          {Array.from({ length: 1 }).map((_, index: number) => {
            return (
              <div
                key={index}
                className="relative h-2.5 w-1.5 flex items-center justify-center -top-0.5"
                id="boxGrad"
              ></div>
            );
          })}
        </div>
      )}
      <div className="relative flex flex-row gap-3">
        {Array.from({ length: topOnly ? 5 : 20 }).map((_, index: number) => {
          return (
            <div
              key={index}
              className="relative h-2.5 w-1.5 flex items-center justify-center -top-0.5"
              id="boxGrad"
            ></div>
          );
        })}
      </div>
      {!topOnly && (
        <div className="relative flex flex-col gap-3 left-2.5 bottom-3">
          {Array.from({ length: 2 }).map((_, index: number) => {
            return (
              <div
                key={index}
                className="relative h-2.5 w-1.5 flex items-center justify-center -top-0.5"
                id="boxGrad"
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Connector;
