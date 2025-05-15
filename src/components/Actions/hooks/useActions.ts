import { useContext, useEffect, useState } from "react";
import { getDBEntriesAdded } from "../../../../graphql/subgraph/queries/getDBEntriesAdded";
import { fetchIpfsJson } from "../../../../lib/helpers/fetchIpfsJson";
import { ModalContext } from "@/pages/_app";

const useActions = () => {
  const context = useContext(ModalContext);
  const [entriesLoading, setEntriesLoading] = useState<boolean>(false);

  const getDBEntries = async () => {
    setEntriesLoading(true);
    try {
      const data = await getDBEntriesAdded();
      const newEntries = [];
      for (let i = 0; i < data?.data?.dbentryAddeds?.length; i++) {
        const res = await fetchIpfsJson(data?.data?.dbentryAddeds[i].ipfsHash);
        newEntries.push({
          ...data?.data?.dbentryAddeds[i],
          litAction: res,
        });
      }
      context?.setAllEntries(newEntries);
    } catch (err: any) {
      console.error(err.message);
    }
    setEntriesLoading(false);
  };

  useEffect(() => {
    getDBEntries();
  }, []);

  return {
    entriesLoading,
  };
};

export default useActions;
