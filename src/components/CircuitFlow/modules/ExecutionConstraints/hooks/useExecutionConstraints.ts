import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/store";
import { useState } from "react";
import { setModalOpen } from "../../../../../../redux/reducers/modalOpenSlice";
import { setCircuitInformation } from "../../../../../../redux/reducers/circuitInformationSlice";

const useExecutionConstraints = () => {
  const dispatch = useDispatch();
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
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
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "End Date Must Follow Start Date. Try Again.",
          actionImage: "QmV1pHXj1E6DCp8nfKfPGC9Th7goGyGDgemr5crbY9Gj2p",
        })
      );
      return;
    } else if (
      maxLitActionCompletions !== undefined &&
      (!Number(maxLitActionCompletions) ||
        (typeof maxLitActionCompletions === "number" &&
          maxLitActionCompletions < 0))
    ) {
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage:
            "Invalid Conditions Monitor Execution Amount. Try Again.",
          actionImage: "QmSmfvfzuoV8ekTxnCaPVkqNkQ6TUSCtkoVk2ATTQiScTd",
        })
      );
      return;
    } else if (
      conditionMonitorExecutions !== undefined &&
      (!Number(conditionMonitorExecutions) ||
        (typeof conditionMonitorExecutions === "number" &&
          conditionMonitorExecutions < 0))
    ) {
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Invalid Full Circuit Runs Amount. Try Again.",
          actionImage: "QmeyUWjZ2Saa3gQanUYfFhSpGNNCdoZaaXoceB5SjewNe4",
        })
      );
      return;
    }

    dispatch(
      setCircuitInformation({
        ...circuitInformation,
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
      })
    );
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
