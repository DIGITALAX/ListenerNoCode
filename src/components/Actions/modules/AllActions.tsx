import { FunctionComponent } from "react";
import { AllActionsProps, AllEntries } from "../types/actions.types";
import { convertDate } from "../../../../lib/helpers/convertDate";
import Link from "next/link";
import { INFURA_GATEWAY } from "../../../../lib/constants";
import CodeComponent from "./CodeComponent";

const AllActions: FunctionComponent<AllActionsProps> = ({
  allEntries,
}): JSX.Element => {
  return (
    <div className="relative w-full h-full justify-center items-center flex flex-wrap overflow-auto">
      <div
        className="relative w-5/6 h-5/6 justify-center items-center bg-black/50 flex flex-col p-3 gap-3 overflow-y-scroll"
        id="inputBorder"
      >
        <div className="relative w-full h-full flex flex-wrap overflow-auto">
          <div className="relative w-full h-fit flex flex-col gap-3">
            {allEntries?.map((entry: AllEntries, index: number) => {
              return (
                <div
                  key={index}
                  className="relative flex flex-col justify-center items-start gap-5 font-vcr text-xs px-1.5 p-2 border border-white bg-black/60 whitespace-normal break-words"
                >
                  <div className="relative w-full h-fit justify-between items-center inline-flex flex-wrap break-words gap-2">
                    <div className="relative w-fit h-fit flex flex-col gap-1.5 text-white">
                      <div className="relative w-full h-fit flex text-ballena">
                        Date Added
                      </div>
                      <div className={`relative flex w-fit h-fit text-costa`}>
                        {convertDate(entry.blockTimestamp)}
                      </div>
                    </div>
                    <div className="relative w-fit h-fit flex flex-col gap-1.5 text-white">
                      <div className="relative w-full h-fit flex text-ballena">
                        Transaction Hash
                      </div>
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={`https://polygonscan.com/tx/${entry?.transactionHash}`}
                        className="relative w-full h-fit flex"
                        style={{
                          wordBreak: "break-all",
                        }}
                      >
                        {entry?.transactionHash.slice(0, 15) +
                          "..." +
                          entry?.transactionHash.slice(-11)}
                      </Link>
                    </div>
                    <div className="relative w-full h-fit flex flex-col gap-1.5 text-white">
                      <div className="relative w-full h-fit flex text-ballena">
                        IPFS Hash
                      </div>
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={`${INFURA_GATEWAY}/ipfs/${
                          entry?.stringifiedLogs?.split("ipfs://")[1]
                        }`}
                        className="relative w-full h-fit flex"
                        style={{
                          wordBreak: "break-all",
                        }}
                      >
                        {entry?.stringifiedLogs}
                      </Link>
                    </div>
                  </div>
                  <div className="relative w-full h-fit flex flex-col gap-1.5 text-white">
                    <div className="relative w-full h-fit text-ballena">
                      Lit Action
                    </div>
                    <CodeComponent code={entry.litAction} />
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
