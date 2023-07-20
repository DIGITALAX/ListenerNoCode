import { FunctionComponent } from "react";
import { ViewInAccountProps } from "../../types/circuitflow.types";
import Link from "next/link";

const ViewInAccount: FunctionComponent<ViewInAccountProps> = ({
  circuitRunning,
  handleClearCircuit,
}): JSX.Element => {
  return (
    <div
      className="relative w-60 h-40 flex flex-col p-2 gap-3 items-center justify-center"
      id="outputBorder"
    >
      {circuitRunning && (
        <div
          className={`flex flex-col w-full h-full p-1 gap-4 items-center justify-center font-vcr text-white overflow-y-scroll`}
        >
          <Link
            className={`relative w-36 px-1.5 h-10 bg-aBlack text-white font-vcr text-sm flex justify-center items-center text-center cursor-pointer uppercase`}
            id="borderLight"
            href={"/account"}
            onClick={() => handleClearCircuit()}
          >
            <div
              className={`relative w-fit h-fit items-center justify-center flex`}
            >
              view account
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ViewInAccount;
