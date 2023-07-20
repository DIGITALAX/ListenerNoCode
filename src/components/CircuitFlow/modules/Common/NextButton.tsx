import { FunctionComponent } from "react";
import { NextButtonProps } from "@/components/CircuitFlow/types/circuitflow.types";
import { setConditionFlow } from "../../../../../redux/reducers/conditionFlowSlice";
import { setModalOpen } from "../../../../../redux/reducers/modalOpenSlice";
import { setCircuitFlow } from "../../../../../redux/reducers/circuitFlowSlice";
import { setConditionLogicFlow } from "../../../../../redux/reducers/conditionLogicFlowSlice";
import { setActionFlow } from "../../../../../redux/reducers/actionFlowSlice";
import { setExecutionConstraintFlow } from "../../../../../redux/reducers/executionConstraintFlowSlice";
import { setIpfsFlow } from "../../../../../redux/reducers/ipfsFlowSlice";

const NextButton: FunctionComponent<NextButtonProps> = ({
  conditionFlowIndex,
  circuitFlowIndex,
  dispatch,
  circuitInformation,
  ipfsHash,
  stepCount,
  conditionLogicFlowIndex,
  actionFlowIndex,
  handleSetConditionalLogic,
  executionConstraintFlowIndex,
  handleAddExecutionConstraints,
  ipfsFlowIndex,
  signedPKPTx,
  mintPKPFlowIndex,
}): JSX.Element => {
  return (
    <div
      className="relative w-full h-16 flex items-center justify-center cursor-pointer hover:opacity-50 active:scale-95 border border-ballena"
      onClick={() => {
        if (circuitFlowIndex === 0) {
          if (
            conditionFlowIndex.index === stepCount - 1 &&
            circuitInformation?.conditions?.length < 1
          ) {
            dispatch(
              setModalOpen({
                actionOpen: true,
                actionMessage: "Add Conditions Before Continuing.",
                actionImage: "Qmam45hAbVeeq4RaJ2Dz4kTw7iea42rmvrgJySJBdSJuFS",
              })
            );
          } else if (
            circuitInformation?.conditions?.length > 0 &&
            conditionFlowIndex.index === stepCount - 1
          ) {
            dispatch(setCircuitFlow(circuitFlowIndex + 1));
          } else {
            dispatch(
              setConditionFlow({
                index: conditionFlowIndex.index + 1,
                contractCount: conditionFlowIndex.contractCount,
                webhookCount: conditionFlowIndex.webhookCount,
              })
            );
          }

          return;
        } else if (circuitFlowIndex === 1) {
          if (conditionLogicFlowIndex.index === stepCount - 1) {
            const logicCorrect = handleSetConditionalLogic();
            if (logicCorrect) {
              dispatch(setCircuitFlow(circuitFlowIndex + 1));
            }
          } else {
            dispatch(
              setConditionLogicFlow({
                index: conditionLogicFlowIndex.index + 1,
                everyCount: conditionLogicFlowIndex.everyCount,
                thresholdCount: conditionLogicFlowIndex.thresholdCount,
                targetCount: conditionLogicFlowIndex.targetCount,
              })
            );
          }

          return;
        } else if (circuitFlowIndex === 2) {
          if (
            actionFlowIndex.index === stepCount - 1 &&
            circuitInformation?.actions?.length < 1
          ) {
            dispatch(
              setModalOpen({
                actionOpen: true,
                actionMessage: "Add Actions Before Continuing.",
                actionImage: "Qmam45hAbVeeq4RaJ2Dz4kTw7iea42rmvrgJySJBdSJuFS",
              })
            );
          } else if (
            circuitInformation?.actions?.length > 0 &&
            actionFlowIndex.index === stepCount - 1
          ) {
            dispatch(setCircuitFlow(circuitFlowIndex + 1));
          } else {
            dispatch(
              setActionFlow({
                index: actionFlowIndex.index + 1,
                contractCount: actionFlowIndex.contractCount,
                fetchCount: actionFlowIndex.fetchCount,
              })
            );
          }

          return;
        } else if (circuitFlowIndex === 3) {
          if (executionConstraintFlowIndex.index === stepCount - 1) {
            handleAddExecutionConstraints();
            dispatch(setCircuitFlow(circuitFlowIndex + 1));
          } else {
            dispatch(
              setExecutionConstraintFlow({
                index: executionConstraintFlowIndex.index + 1,
                executionCount: executionConstraintFlowIndex.executionCount,
              })
            );
          }

          return;
        } else if (circuitFlowIndex === 4) {
          if (ipfsHash?.trim() === "" && 0 === stepCount) {
            () =>
              dispatch(
                setModalOpen({
                  actionOpen: true,
                  actionMessage: "Hash to IPFS before continuing.",
                  actionImage: "QmSjfHHFeLfMhgdwjuvczjxqDbRhs3rW3z4kvo1Jqf9TfM",
                })
              );
          } else if (
            ipfsHash?.trim() !== "" &&
            stepCount - 1 == ipfsFlowIndex.index
          ) {
            () => dispatch(setCircuitFlow(circuitFlowIndex + 1));
          } else if (ipfsHash?.trim() !== "") {
            dispatch(
              setIpfsFlow({
                index: ipfsFlowIndex.index + 1,
                ipfsCount: ipfsFlowIndex.ipfsCount,
              })
            );
          }
          return;
        } else if (circuitFlowIndex === 5) {
          if (signedPKPTx?.publicKey === "" || signedPKPTx.address === "") {
            () =>
              dispatch(
                setModalOpen({
                  actionOpen: true,
                  actionMessage: "MintGrantBurn PKP before continuing.",
                  actionImage: "QmSjfHHFeLfMhgdwjuvczjxqDbRhs3rW3z4kvo1Jqf9TfM",
                })
              );
          } else if (
            signedPKPTx?.publicKey?.trim() !== "" &&
            signedPKPTx?.address?.trim() !== "" &&
            stepCount - 1 == mintPKPFlowIndex.index
          ) {
            () => dispatch(setCircuitFlow(circuitFlowIndex + 1));
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
