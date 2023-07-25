import { useAccount } from "wagmi";
import {
  getUserCircuitsUser,
  getUserCircuitsUserById,
} from "../../../../graphql/queries/getUserCircuits";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setAllUserCircuits } from "../../../../redux/reducers/allUserCircuits";
import {
  getUserCircuitsCompleted,
  getUserCircuitsCompletedById,
} from "../../../../graphql/queries/getUserCircuitsCompleted";
import { AllCircuits } from "../types/account.types";
import {
  getUserCircuitsInterrupted,
  getUserCircuitsInterruptedById,
} from "../../../../graphql/queries/getUserCircuitsInterrupted";
import { setSelectedUserCircuit } from "../../../../redux/reducers/selectedCircuitSlice";
import { getUserLogs } from "../../../../graphql/queries/getUserLogs";
import { fetchIpfsJson } from "../../../../lib/helpers/fetchIpfsJson";
import { setModalOpen } from "../../../../redux/reducers/modalOpenSlice";
import { ILogEntry } from "@/components/CircuitFlow/types/litlistener.types";

const useAccountPage = () => {
  const { address } = useAccount();
  const dispatch = useDispatch();
  const [addressExists, setAddressExists] = useState<boolean>(false);
  const [allCircuitsLoading, setAllCircuitsLoading] = useState<boolean>(false);
  const [circuitsOpen, setCircuitsOpen] = useState<boolean>(true);
  const [circuitLogsLoading, setCircuitLogsLoading] = useState<boolean>(false);
  const [interruptLoading, setInterruptLoading] = useState<boolean>(false);
  const circuitRunning = useSelector(
    (state: RootState) => state.app.circuitRunningReducer.value
  );
  const selectedCircuit = useSelector(
    (state: RootState) => state.app.selectedCircuitReducer.value
  );
  const selectedCircuitSideBar = useSelector(
    (state: RootState) => state.app.selectedCircuitSideBarReudcer.value
  );

  const getAllCircuits = async () => {
    setAllCircuitsLoading(true);
    try {
      const dataCircuits = await getUserCircuitsUser(address as string);
      const dataCompleted = await getUserCircuitsCompleted(address as string);
      const dataLogs = await getUserLogs(address as string);
      const dataInterrupted = await getUserCircuitsInterrupted(
        address as string
      );

      const circuitAddeds: AllCircuits[] =
        dataCircuits?.data?.circuitAddeds || [];

      const completedCircuitHashedIds = new Map();
      const interruptedCircuitHashedIds = new Map();

      for (let circuit of dataCompleted?.data?.circuitCompleteds || []) {
        const completedResponse = await fetchIpfsJson(circuit?.hashedId);
        completedCircuitHashedIds.set(completedResponse, circuit?.hashedId);
      }

      for (let circuit of dataInterrupted?.data?.circuitInterrupteds || []) {
        const interruptedResponse = await fetchIpfsJson(circuit?.hashedId);
        interruptedCircuitHashedIds.set(interruptedResponse, circuit?.hashedId);
      }

      const newAllCircuits = [];

      for (let circuit of circuitAddeds) {
        const circuitResponse = await fetchIpfsJson(
          circuit?.circuitInformation as any,
          true
        );
        const circuitId = circuitResponse?.circuitInformation?.id;

        circuit.completed = completedCircuitHashedIds.has(circuitId);
        circuit.interrupted = interruptedCircuitHashedIds.has(circuitId);
        if (dataLogs?.data?.logAddeds.length < 1) {
          newAllCircuits.push({
            ...circuit,
            circuitInformation: circuitResponse?.circuitInformation,
            monitorExecutions: 0,
            circuitExecutions: 0,
          });
        } else {
          for (let i = 0; i < dataLogs?.data?.logAddeds?.length; i++) {
            const res = await fetchIpfsJson(
              dataLogs?.data?.logAddeds[i].hashedId
            );

            if (res === circuitId) {
              let parsedLogs = await fetchIpfsJson(
                dataLogs?.data?.logAddeds[i]?.stringifiedLogs,
                true
              );

              if (
                !parsedLogs?.every(
                  (item: any) =>
                    typeof item === "object" &&
                    item !== null &&
                    !Array.isArray(item)
                )
              ) {
                parsedLogs = parsedLogs?.map((stringLog: any) =>
                  JSON.parse(stringLog)
                );
              }

              const filteredLogsCondition = parsedLogs.filter((log: any) =>
                log.message.includes("Condition Monitor Count Increased")
              );
              const filteredLogsExecution = parsedLogs.filter((log: any) =>
                log.message.includes("Lit Action Completion Increased")
              );
              newAllCircuits.push({
                ...circuit,
                circuitInformation: circuitResponse?.circuitInformation,
                monitorExecutions:
                  Number(
                    filteredLogsCondition?.[filteredLogsCondition?.length - 1]
                      ?.responseObject
                  ) || 0,
                circuitExecutions:
                  Number(
                    filteredLogsExecution?.[filteredLogsExecution?.length - 1]
                      ?.responseObject
                  ) || 0,
              });
              break;
            }
          }
        }
      }

      if (selectedCircuitSideBar === "" || !selectedCircuitSideBar) {
        await getSelectedCircuitLogs(newAllCircuits[0]?.circuitInformation?.id);
      }

      dispatch(setAllUserCircuits(newAllCircuits));
    } catch (err: any) {
      console.error(err.message);
    }
    setAllCircuitsLoading(false);
  };

  const getSelectedCircuitLogs = async (circuitId: string) => {
    setCircuitLogsLoading(true);
    try {
      const circuitLogs = await getUserLogs(address as string);
      const circuitAddedId = await getUserCircuitsUserById(address as string);
      const dataCompleted = await getUserCircuitsCompletedById(
        address as string
      );
      const dataInterrupted = await getUserCircuitsInterruptedById(
        address as string
      );

      let newLogs = {};
      let newInterrupted = {};
      let newCompleted = {};
      let newAdded = {};

      for (let i = 0; i < circuitAddedId?.data?.circuitAddeds?.length; i++) {
        const returnedInfo = await fetchIpfsJson(
          circuitAddedId?.data?.circuitAddeds[i]?.circuitInformation,
          true
        );

        if (circuitId === returnedInfo?.circuitInformation?.id) {
          newAdded = {
            ...circuitAddedId?.data?.circuitAddeds[i],
            circuitInformation: {
              ...returnedInfo.circuitInformation,
              information: {
                circuitActions: JSON.parse(
                  JSON.parse(returnedInfo?.circuitInformation.information)
                    .circuitActions
                ),
                executionConstraints: JSON.parse(
                  JSON.parse(returnedInfo?.circuitInformation.information)
                    .executionConstraints
                ),
                conditionalLogic: JSON.parse(
                  JSON.parse(returnedInfo?.circuitInformation.information)
                    .conditionalLogic
                ),
                circuitConditions: JSON.parse(
                  JSON.parse(returnedInfo?.circuitInformation.information)
                    .circuitConditions
                ),
              },
            },
          };
          break;
        }
      }

      for (let i = 0; i < circuitLogs?.data?.logAddeds?.length; i++) {
        const res = await fetchIpfsJson(
          circuitLogs?.data?.logAddeds[i].hashedId
        );

        if (res === circuitId) {
          let parsedLogs = await fetchIpfsJson(
            circuitLogs?.data?.logAddeds[i]?.stringifiedLogs,
            true
          );

          if (
            !parsedLogs.every(
              (item: any) =>
                typeof item === "object" &&
                item !== null &&
                !Array.isArray(item)
            )
          ) {
            parsedLogs = parsedLogs?.map((stringLog: any) =>
              JSON.parse(stringLog)
            );
          }

          const filteredLogsCondition = parsedLogs.filter((log: any) =>
            log.message.includes("Condition Monitor Count Increased")
          );
          const filteredLogsExecution = parsedLogs.filter((log: any) =>
            log.message.includes("Lit Action Completion Increased")
          );

          newLogs = {
            ...circuitLogs?.data?.logAddeds[i],
            hashedId: res,
            stringifiedLogs: parsedLogs.sort(
              (a: ILogEntry, b: ILogEntry) =>
                new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime()
            ),
            monitorExecutions:
              Number(
                filteredLogsCondition?.[filteredLogsCondition?.length - 1]
                  ?.responseObject
              ) || 0,
            circuitExecutions:
              Number(
                filteredLogsExecution?.[filteredLogsExecution?.length - 1]
                  ?.responseObject
              ) || 0,
          };
          break;
        }
      }

      for (let i = 0; i < dataCompleted?.data?.circuitCompleteds?.length; i++) {
        const res = await fetchIpfsJson(
          dataCompleted?.data?.circuitCompleteds[i].hashedId
        );

        if (res === circuitId) {
          newCompleted = {
            ...dataCompleted?.data?.circuitCompleteds[i],
            hashedId: res,
          };
          break;
        }
      }

      for (
        let i = 0;
        i < dataInterrupted?.data?.circuitInterrupteds?.length;
        i++
      ) {
        const res = await fetchIpfsJson(
          dataInterrupted?.data?.circuitInterrupteds[i].hashedId
        );
        if (res === circuitId) {
          newInterrupted = {
            ...dataInterrupted?.data?.circuitInterrupteds[i],
            hashedId: res,
          };
          break;
        }
      }

      const combinedObject = {
        ...newAdded,
        logs: newLogs,
        completed: newCompleted,
        interrupted: newInterrupted,
      };

      dispatch(setSelectedUserCircuit(combinedObject as any));
    } catch (err: any) {
      console.error(err.message);
    }
    setCircuitLogsLoading(false);
  };

  useEffect(() => {
    if (address) {
      getAllCircuits();
    }
  }, [circuitRunning, address]);

  useEffect(() => {
    if (selectedCircuitSideBar !== "" && address) {
      getSelectedCircuitLogs(selectedCircuitSideBar);
    }
  }, [selectedCircuitSideBar]);

  useEffect(() => {
    setAddressExists(Boolean(address));
  }, [address]);

  const handleInterruptCircuit = async (id: string) => {
    setInterruptLoading(true);
    try {
      const res = await fetch("/api/render/interrupt", {
        method: "POST",
        body: JSON.stringify({
          id,
          instantiatorAddress: selectedCircuit?.instantiatorAddress,
        }),
      });
      if (res.status === 200) {
        setTimeout(async () => {
          await getAllCircuits();
          await getSelectedCircuitLogs(id?.replace(/-/g, ""));
          setInterruptLoading(false);
        }, 6000);
      } else if (res.status === 500) {
        dispatch(
          setModalOpen({
            actionOpen: true,
            actionMessage:
              "There was an error interrupting your circuit. Try Again.",
            actionImage: "QmSUH38BqmfPci9NEvmC2KRQEJeoyxdebHiZi1FABbtueg",
          })
        );
      }
    } catch (err: any) {
      console.error(err.message);
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage:
            "There was an error interrupting your circuit. Try Again.",
          actionImage: "QmSUH38BqmfPci9NEvmC2KRQEJeoyxdebHiZi1FABbtueg",
        })
      );
    }
    setInterruptLoading(false);
  };

  return {
    allCircuitsLoading,
    circuitLogsLoading,
    addressExists,
    handleInterruptCircuit,
    interruptLoading,
    circuitsOpen,
    setCircuitsOpen,
  };
};

export default useAccountPage;
