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
  const [interval, setInterval] = useState<number>(180000000);
  const [thresholdValue, setThresholdValue] = useState<number>(1);
  const [targetCondition, setTargetCondition] = useState<number>(1);

  const handleSetConditionalLogic = (): boolean => {
    let logicCorrect = true;

    if (!Number(interval) || (typeof interval === "number" && interval <= 0)) {
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Interval Invalid. Try Again.",
          actionImage: "QmcrvQW8jQLNqGzBsmTnZooQdiqhRXGUsJyiMUR5EMdoZA",
        })
      );
      return (logicCorrect = false);
    } else if (
      logicType === "THRESHOLD" &&
      thresholdValue > circuitInformation.conditions.length
    ) {
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage:
            "Threshold Number Cannot Exceed Number of Conditions. Try Again.",
          actionImage: "QmemD9mkEusskUc8aUtdp4RF2rHJBpWQHgZUoM9DFvw8jw",
        })
      );
      return (logicCorrect = false);
    }

    let conditionalLogic: any = {
      type: logicType,
      interval: interval ? interval : 180000000,
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

    dispatch(
      setCircuitInformation({
        ...circuitInformation,
        conditionalLogic: conditionalLogic as any,
      })
    );

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
