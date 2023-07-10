import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/store";

const usePKP = () => {
  const dispatch = useDispatch();
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
  const [pkpLoading, setPkpLoading] = useState<boolean>(false);

  const handleMintGrantBurnPKP = async () => {
    setPkpLoading(true);
    try {
    } catch (err: any) {
      console.error(err.message);
    }
    setPkpLoading(false);
  };

  return {
    handleMintGrantBurnPKP,
    pkpLoading,
  };
};

export default usePKP;
