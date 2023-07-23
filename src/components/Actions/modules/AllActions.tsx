import { FunctionComponent } from "react";
import { AllActionsProps, AllEntries } from "../types/actions.types";
import { convertDate } from "../../../../lib/helpers/convertDate";
import Link from "next/link";

const AllActions: FunctionComponent<AllActionsProps> = ({
  allEntries,
}): JSX.Element => {
  return (
    <div
      className="relative w-full h-full justify-center items-center flex"
      id="heightAllCircuits"
    >
      <div
        className="relative w-5/6 h-5/6 justify-center items-center bg-black/50 flex flex-col p-3 gap-3 overflow-y-scroll"
        id="inputBorder"
      >
        <div className="relative w-full h-full flex overflow-y-scroll">
          <div className="relative w-full h-fit flex flex-col gap-3">
            {allEntries?.map((entry: AllEntries, index: number) => {
              return (
                <div
                  key={index}
                  className="relative flex flex-row justify-between items-center gap-2 font-vcr text-xs px-1.5 p-2 border border-white bg-black/60"
                >
                  <div className={`relative flex w-fit h-fit text-costa`}>
                    {convertDate(entry.blockTimestamp)}
                  </div>
                  <div className="relative w-fit h-fit flex flex-col gap-1.5 text-white">
                    <div className="relative w-full h-fit flex text-ballena">
                      Transaction Hash
                    </div>
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={`https://polygonscan.com/tx/${entry?.transactionHash}`}
                      className="relative w-fit h-fit flex break-words"
                    >
                      {entry?.transactionHash.slice(0, 10) +
                        "..." +
                        entry?.transactionHash.slice(-11)}
                    </Link>
                  </div>
                  <div className="relative w-fit h-fit flex flex-col gap-1.5 text-white">
                    <div className="relative w-full h-fit flex text-ballena">
                      IPFS Hash
                    </div>
                    <div className="relative w-fit h-fit flex break-words">
                      {entry?.stringifiedLogs}
                    </div>
                  </div>
                  <div className="relative w-fit h-fit flex flex-col gap-1.5 text-white">
                    <div className="relative w-full h-fit text-ballena">
                      Lit Action
                    </div>
                    <div className="relative w-fit h-fit flex break-words"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllActions;
