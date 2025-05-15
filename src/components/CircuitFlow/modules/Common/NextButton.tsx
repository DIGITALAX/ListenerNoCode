import { FunctionComponent, useContext } from "react";
import { ModalContext } from "@/pages/_app";
import { useRouter } from "next/router";
import { NextButtonProps } from "../../types/circuitflow.types";

const NextButton: FunctionComponent<NextButtonProps> = ({
  stepCount,
  handleSetConditionalLogic,
  handleAddExecutionConstraints,
  handleClearCircuit,
}): JSX.Element => {
  const context = useContext(ModalContext);
  const router = useRouter();
  return (
    <div
      className="relative w-full h-16 flex items-center justify-center cursor-pointer hover:opacity-50 active:scale-95 border border-ballena"
      onClick={() => {
        if (context?.circuitFlow === 0) {
          if (
            context?.conditionFlow.index === stepCount - 1 &&
            context?.circuitInformation?.conditions?.length < 1
          ) {
            context?.setGeneralModal({
              open: true,
              message: "Add Conditions Before Continuing.",
              image: "Qmam45hAbVeeq4RaJ2Dz4kTw7iea42rmvrgJySJBdSJuFS",
            });
          } else if (
            context?.circuitInformation?.conditions?.length > 0 &&
            context?.conditionFlow.index === stepCount - 1
          ) {
            context?.setCircuitFlow(context?.circuitFlow + 1);
          } else {
            context?.setConditionFlow((prev) => ({
              ...prev,
              index: prev.index + 1,
            }));
          }

          return;
        } else if (context?.circuitFlow === 1) {
          if (context?.conditionLogicFlow.index === stepCount - 1) {
            const logicCorrect = handleSetConditionalLogic();
            if (logicCorrect) {
              context?.setCircuitFlow(context?.circuitFlow + 1);
            }
          } else {
            context?.setConditionLogicFlow((prev) => ({
              ...prev,
              index: prev.index + 1,
            }));
          }

          return;
        } else if (context?.circuitFlow === 2) {
          if (
            context?.actionFlow.index === stepCount - 1 &&
            context?.circuitInformation?.actions?.length < 1
          ) {
            context?.setGeneralModal({
              open: true,
              message: "Add Actions Before Continuing.",
              image: "Qmam45hAbVeeq4RaJ2Dz4kTw7iea42rmvrgJySJBdSJuFS",
            });
          } else if (
            context?.circuitInformation?.actions?.length > 0 &&
            context?.actionFlow.index === stepCount - 1
          ) {
            context?.setCircuitFlow(context?.circuitFlow + 1);
          } else {
            context?.setActionFlow((prev) => ({
              ...prev,
              index: prev.index + 1,
            }));
          }

          return;
        } else if (context?.circuitFlow === 3) {
          if (context?.executionConstraintFlow.index === stepCount - 1) {
            handleAddExecutionConstraints();
            context?.setCircuitFlow(context?.circuitFlow + 1);
          } else {
            context?.setExecutionConstraintFlow((prev) => ({
              ...prev,
              index: prev.index + 1,
            }));
          }

          return;
        } else if (context?.circuitFlow === 4) {
          if (
            context?.ipfsHash?.ipfs?.trim() === "" &&
            0 === context?.ipfsFlow.index
          ) {
            context?.setGeneralModal({
              open: true,
              message: "Hash to IPFS before continuing.",
              image: "QmSjfHHFeLfMhgdwjuvczjxqDbRhs3rW3z4kvo1Jqf9TfM",
            });
          } else if (
            context?.ipfsHash?.ipfs?.trim() !== "" &&
            stepCount - 1 == context?.ipfsFlow.index
          ) {
            context?.setCircuitFlow(context?.circuitFlow + 1);
          } else if (context?.ipfsHash?.ipfs?.trim() !== "") {
            context?.setIpfsFlow((prev) => ({
              ...prev,
              index: prev.index + 1,
            }));
          }
          return;
        } else if (context?.circuitFlow === 5) {
          if (
            context?.signedPKP?.publicKey === "" ||
            context?.signedPKP.address === ""
          ) {
            context?.setGeneralModal({
              open: true,
              message: "MintGrantBurn PKP before continuing.",
              image: "QmSjfHHFeLfMhgdwjuvczjxqDbRhs3rW3z4kvo1Jqf9TfM",
            });
          } else if (
            context?.signedPKP?.publicKey?.trim() !== "" &&
            context?.signedPKP?.address?.trim() !== "" &&
            stepCount - 1 == context?.mintPKPFlow.index
          ) {
            context?.setCircuitFlow(context?.circuitFlow + 1);
          }
          return;
        } else if (context?.circuitFlow === 6) {
          if (context?.circuitRunning) {
            router.push("/account");
            handleClearCircuit();
          }

          return;
        }
      }}
    >
      <div
        className="relative w-fit h-fit flex items-center justify-center font-vcr uppercase text-moda text-lg"
        id="blur"
      >
        {`>>> CONTINUE`}
      </div>
    </div>
  );
};

export default NextButton;
