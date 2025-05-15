import { ModalContext } from "@/pages/_app";
import { useContext, useState } from "react";

const useExecutionConstraints = () => {
  const context = useContext(ModalContext);
  const [time, setTime] = useState<{
    startDate: string | undefined;
    endDate: string | undefined;
  }>({
    startDate: new Date().toISOString(),
    endDate: new Date(
      new Date().setDate(new Date().getDate() + 7)
    ).toISOString(),
  });
  const [conditionMonitorExecutions, setConditionMonitorExecutions] = useState<
    number | undefined
  >(100);
  const [maxLitActionCompletions, setMaxLitActionCompletions] = useState<
    number | undefined
  >(5);

  const handleAddExecutionConstraints = () => {
    if (time?.endDate && time?.startDate && time?.endDate < time?.startDate) {
      context?.setGeneralModal({
        open: true,
        message: "End Date Must Follow Start Date. Try Again.",
        image: "QmV1pHXj1E6DCp8nfKfPGC9Th7goGyGDgemr5crbY9Gj2p",
      });

      return;
    } else if (
      maxLitActionCompletions !== undefined &&
      (!Number(maxLitActionCompletions) ||
        (typeof maxLitActionCompletions === "number" &&
          maxLitActionCompletions < 0))
    ) {
      context?.setGeneralModal({
        open: true,
        message: "Invalid Conditions Monitor Execution Amount. Try Again.",
        image: "QmSmfvfzuoV8ekTxnCaPVkqNkQ6TUSCtkoVk2ATTQiScTd",
      });

      return;
    } else if (
      conditionMonitorExecutions !== undefined &&
      (!Number(conditionMonitorExecutions) ||
        (typeof conditionMonitorExecutions === "number" &&
          conditionMonitorExecutions < 0))
    ) {
      context?.setGeneralModal({
        open: true,
        message: "Invalid Full Circuit Runs Amount. Try Again.",
        image: "QmeyUWjZ2Saa3gQanUYfFhSpGNNCdoZaaXoceB5SjewNe4",
      });

      return;
    }

    context?.setCircuitInformation((prev) => ({
      ...prev,
      executionConstraints: {
        maxLitActionCompletions: maxLitActionCompletions
          ? maxLitActionCompletions
          : undefined,
        conditionMonitorExecutions: conditionMonitorExecutions
          ? conditionMonitorExecutions
          : undefined,
        startDate: time?.startDate ? (time?.startDate as any) : undefined,
        endDate: time?.endDate ? (time?.endDate as any) : undefined,
      },
    }));
  };

  return {
    handleAddExecutionConstraints,
    time,
    setTime,
    maxLitActionCompletions,
    setMaxLitActionCompletions,
    conditionMonitorExecutions,
    setConditionMonitorExecutions,
  };
};

export default useExecutionConstraints;
