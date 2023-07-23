import { useEffect, useState } from "react";
import { getDBEntriesAdded } from "../../../../graphql/queries/getDBEntriesAdded";
import { useDispatch } from "react-redux";
import { setAllEntries } from "../../../../redux/reducers/allEntriesSlice";

const useActions = () => {
  const dispatch = useDispatch();
  const [entriesLoading, setEntriesLoading] = useState<boolean>(false);

  const getDBEntries = async () => {
    setEntriesLoading(true);
    try {
      const data = await getDBEntriesAdded();
      dispatch(setAllEntries(data?.data?.dbentryAddeds));
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
