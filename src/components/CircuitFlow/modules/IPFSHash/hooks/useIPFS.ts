import { useState } from "react";
import { RootState } from "../../../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setIpfsHash } from "../../../../../../redux/reducers/ipfsHashSlice";

const useIPFS = () => {
  const dispatch = useDispatch();
  const litActionCode = useSelector(
    (state: RootState) => state.app.litActionCodeReducer.value
  );
  const [ipfsLoading, setIpfsLoading] = useState<boolean>(false);

  const handleHashToIPFS = async () => {
    setIpfsLoading(true);
    try {
      const response = await fetch("/api/ipfs", {
        method: "POST",
        body: litActionCode,
      });
      if (response.status !== 200) {
        return;
      } else {
        let cid = await response.json();
        dispatch(setIpfsHash(String(cid?.cid)));
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setIpfsLoading(false);
  };

  return {
    ipfsLoading,
    handleHashToIPFS,
  };
};

export default useIPFS;
