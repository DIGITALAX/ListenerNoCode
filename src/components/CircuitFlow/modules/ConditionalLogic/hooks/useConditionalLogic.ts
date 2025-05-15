import { ModalContext } from "@/pages/_app";
import { useContext, useState } from "react";

const useConditionalLogic = () => {
  const context = useContext(ModalContext);
  const [logicType, setLogicType] = useState<string>("EVERY");
  const [targetConditionOpen, setTargetConditionOpen] =
    useState<boolean>(false);
  const [interval, setInterval] = useState<number>(180000000);
  const [thresholdValue, setThresholdValue] = useState<number>(1);
  const [targetCondition, setTargetCondition] = useState<number>(1);

  const handleSetConditionalLogic = (): boolean => {
    let logicCorrect = true;

    if (!Number(interval) || (typeof interval === "number" && interval <= 0)) {
      context?.setGeneralModal({
        open: true,
        message: "Interval Invalid. Try Again.",
        image: "QmcrvQW8jQLNqGzBsmTnZooQdiqhRXGUsJyiMUR5EMdoZA",
      });

      return (logicCorrect = false);
    } else if (
      logicType === "THRESHOLD" &&
      thresholdValue > Number(context?.circuitInformation.conditions.length)
    ) {
      context?.setGeneralModal({
        open: true,
        message:
          "Threshold Number Cannot Exceed Number of Conditions. Try Again.",
        image: "QmemD9mkEusskUc8aUtdp4RF2rHJBpWQHgZUoM9DFvw8jw",
      });

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

    context?.setCircuitInformation((prev) => ({
      ...prev,
      conditionalLogic: conditionalLogic as any,
    }));

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
