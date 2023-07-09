import { FunctionComponent } from "react";

const ConnectorRect: FunctionComponent = (): JSX.Element => {
  return (
    <div className="relative w-fit h-fit flex flex-row items-center justify-center top-20">
      <div className="relative flex flex-col gap-3 left-1.5 top-5">
        {Array.from({ length: 10 }).map((_, index: number) => {
          return (
            <div
              key={index}
              className="relative h-2.5 w-1.5 flex items-center justify-center -top-0.5"
              id="boxGrad"
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default ConnectorRect;
