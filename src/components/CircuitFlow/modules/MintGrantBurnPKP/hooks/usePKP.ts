import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { PKP_CONTRACT } from "../../../../../../lib/constants";
import pkpNftAbi from "./../../../../../../abi/PkpNFTAbi.json";
import bs58 from "bs58";
import { useAccount } from "wagmi";
import { chronicle, ModalContext } from "@/pages/_app";
import { createPublicClient, createWalletClient, custom, http } from "viem";

const usePKP = () => {
  const context = useContext(ModalContext);
  const { isConnected, address, chainId } = useAccount();
  const [pkpLoading, setPkpLoading] = useState<boolean>(false);
  const [tokenId, setTokenId] = useState<string>("");
  const [switchNeededPKP, setSwitchNeededPKP] = useState<boolean>(false);
  const [pkpData, setPKPData] = useState<string | undefined>();
  const publicClient = createPublicClient({
    chain: chronicle,
    transport: http("https://chain-rpc.litprotocol.com/http"),
  });

  const handleMintGrantBurnPKP = async () => {
    setPkpLoading(true);
    try {
      const clientWallet = createWalletClient({
        chain: chronicle,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: PKP_CONTRACT,
        abi: pkpNftAbi,
        args: [
          2,
          `0x${Buffer.from(bs58.decode(context?.ipfsHash?.ipfs!)).toString(
            "hex"
          )}`,
        ],
        functionName: "mintGrantAndBurnNext",
        value: BigInt(1),
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      const tx = await publicClient.waitForTransactionReceipt({ hash: res });

      const mintGrantBurnLogs = tx.logs;
      const pkpTokenId = BigInt(
        mintGrantBurnLogs[0].topics[3] as string
      ).toString();

      setTokenId(pkpTokenId);
    } catch (err: any) {
      console.error(err.message);
    }
    setPkpLoading(false);
  };

  const getPKPData = async () => {
    try {
      const data = await publicClient.readContract({
        address: PKP_CONTRACT,
        abi: pkpNftAbi,
        args: [tokenId],
        functionName: "getPubkey",
      });
      setPKPData(data as string);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (pkpData) {
      getPKPData();
    }
  }, []);

  useEffect(() => {
    if (tokenId !== "" && tokenId && pkpData) {
      context?.setSignedPKP({
        tokenId: tokenId,
        publicKey: pkpData as string,
        address: ethers.computeAddress(pkpData as string),
      });
    }
  }, [tokenId, pkpData]);

  useEffect(() => {
    setSwitchNeededPKP(chainId !== 175177 ? true : false);
  }, [isConnected, chainId, address]);

  return {
    handleMintGrantBurnPKP,
    pkpLoading,
    switchNeededPKP,
  };
};

export default usePKP;
