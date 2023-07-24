import { useEffect, useState } from "react";
import { getDBEntriesAdded } from "../../../../graphql/queries/getDBEntriesAdded";
import { useDispatch } from "react-redux";
import { setAllEntries } from "../../../../redux/reducers/allEntriesSlice";
import { fetchIpfsJson } from "../../../../lib/helpers/fetchIpfsJson";

const useActions = () => {
  const dispatch = useDispatch();
  const [entriesLoading, setEntriesLoading] = useState<boolean>(false);

  const getDBEntries = async () => {
    setEntriesLoading(true);
    try {
      const data = await getDBEntriesAdded();
      const newEntries = [];
      for (let i = 0; i < data?.data?.dbentryAddeds?.length; i++) {
        const res = await fetchIpfsJson(
          data?.data?.dbentryAddeds[i].ipfsHash
        );
        newEntries.push({
          ...data?.data?.dbentryAddeds[i],
          litAction: res,
        });
      }
      dispatch(setAllEntries(newEntries));
    } catch (err: any) {
      console.error(err.message);
    }
    setEntriesLoading(false);
  };

  useEffect(() => {
    if (!entriesLoading) {
      getDBEntries();
    }
  }, []);

  return {
    entriesLoading,
  };
};

export default useActions;
