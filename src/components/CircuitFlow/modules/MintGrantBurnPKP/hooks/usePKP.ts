import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/store";
import { setSignedPKP } from "../../../../../../redux/reducers/signedPKPSlice";

const usePKP = () => {
  const dispatch = useDispatch();
  const signer = useSelector(
    (state: RootState) => state.app.connectedSignerReducer.value
  );
  const txData = useSelector(
    (state: RootState) => state.app.pkpTxDataReducer.value
  );
  const [pkpLoading, setPkpLoading] = useState<boolean>(false);

  const handleMintGrantBurnPKP = async () => {
    if (!txData) {
      return;
    }
    setPkpLoading(true);
    try {
      const signedPKPTransactionData = await signer?.signTransaction(txData);
      dispatch(setSignedPKP(signedPKPTransactionData));
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
