import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/store";
import { setSignedPKP } from "../../../../../../redux/reducers/signedPKPSlice";
import { ethers } from "ethers";
import { PKP_CONTRACT } from "../../../../../../lib/constants";
import pkpNftAbi from "./../../../../../../abi/PkpNFTAbi.json";
import bs58 from "bs58";
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";
import { waitForTransaction } from "@wagmi/core";

const usePKP = () => {
  const dispatch = useDispatch();
  const ipfsData = useSelector(
    (state: RootState) => state.app.ipfsHashReducer.value
  );
  const [pkpLoading, setPkpLoading] = useState<boolean>(false);
  const [tokenId, setTokenId] = useState<string>("");

  const { config } = usePrepareContractWrite({
    address: PKP_CONTRACT,
    abi: pkpNftAbi,
    args: [2, `0x${Buffer.from(bs58.decode(ipfsData)).toString("hex")}`],
    functionName: "mintGrantAndBurnNext",
    enabled: Boolean(ipfsData !== ""),
    value: BigInt(1),
  });

  const { writeAsync } = useContractWrite(config as any);

  const { data, error } = useContractRead({
    address: PKP_CONTRACT,
    abi: pkpNftAbi,
    args: [tokenId],
    functionName: "getPubkey",
    enabled: Boolean(tokenId !== ""),
  });

  const handleMintGrantBurnPKP = async () => {
    setPkpLoading(true);
    try {
      const tx = await writeAsync?.();
      const res = await waitForTransaction({
        hash: tx?.hash!,
      });

      const mintGrantBurnLogs = res.logs;
      const pkpTokenId = BigInt(
        mintGrantBurnLogs[0].topics[3] as string
      ).toString();

      setTokenId(pkpTokenId);
    } catch (err: any) {
      console.error(err.message);
    }
    setPkpLoading(false);
  };

  useEffect(() => {
    if (tokenId !== "" && tokenId && data) {
      dispatch(
        setSignedPKP({
          tokenId: tokenId,
          publicKey: data as string,
          address: ethers.utils.computeAddress(data as string),
        })
      );
    }
  }, [tokenId, data]);

  return {
    handleMintGrantBurnPKP,
    pkpLoading,
  };
};

export default usePKP;
