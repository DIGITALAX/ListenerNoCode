import { FunctionComponent } from "react";
import Connector from "../Common/Connector";

const ConditionalLogic: FunctionComponent = (): JSX.Element => {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="relative w-full h-full flex flex-row items-center justify-center">
        <Connector topOnly />
      </div>
      <div className="relative flex flex-row w-full h-fit items-center">
        <div className="relative w-full h-fit flex flex-col gap-5 items-center justify-center">
          <div className="relative w-fit h-fit flex ml-auto right-16">
            <Connector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionalLogic;
