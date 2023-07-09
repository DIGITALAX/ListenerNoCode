import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/store";
import { setCircuitInformation } from "../../../../../../redux/reducers/circuitInformationSlice";
import { setModalOpen } from "../../../../../../redux/reducers/modalOpenSlice";

const useConditionalLogic = () => {
  const dispatch = useDispatch();
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
  const [logicType, setLogicType] = useState<string>("EVERY");
  const [targetConditionOpen, setTargetConditionOpen] =
    useState<boolean>(false);
  const [interval, setInterval] = useState<string>("120000");
  const [thresholdValue, setThresholdValue] = useState<number>(1);
  const [targetCondition, setTargetCondition] = useState<number>(1);

  const handleSetConditionalLogic = (): boolean => {
    let logicCorrect = true;
    let conditionalLogic: any = {
      type: logicType,
      interval: Number(interval),
    };

    if (logicType === "THRESHOLD") {
      conditionalLogic = {
        type: logicType,
        interval,
        value: thresholdValue,
      };
    } else if (logicType === "TARGET") {
      conditionalLogic = {
        type: logicType,
        interval,
        targetCondition,
      };
    }

    if (
      logicType === "THRESHOLD" &&
      thresholdValue > circuitInformation.conditions.length
    ) {
      console.log("here")
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage:
            "Threshold Number Cannot Exceed Number of Conditions. Try Again.",
          actionImage: "",
        })
      );
      logicCorrect = false;
    } else {
      dispatch(
        setCircuitInformation({
          ...circuitInformation,
          conditionalLogic: conditionalLogic as any,
        })
      );
    }

    return logicCorrect;
  };

  return {
    logicType,
    setLogicType,
    handleSetConditionalLogic,
    thresholdValue,
    setThresholdValue,
    targetCondition,
    setTargetCondition,
    interval,
    setInterval,
    targetConditionOpen,
    setTargetConditionOpen,
  };
};

export default useConditionalLogic;
