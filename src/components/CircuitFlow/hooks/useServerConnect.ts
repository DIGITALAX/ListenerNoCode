import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useSignMessage } from "wagmi";

const useServerConnect = () => {
  const { address } = useAccount();
  
  const siweMessage = new SiweMessage({
    domain: "localhost",
    address: address,
    statement: "This is an Auth Sig for LitListenerSDK",
    uri: "https://localhost/login",
    version: "1",
    chainId: 137,
  });

  const signedMessage = siweMessage.prepareMessage();

  const { signMessageAsync } = useSignMessage({
    message: signedMessage,
  }); 

  const handleServerConnect = async () => {
    try {
      const sig = await signMessageAsync();
      const res = await fetch("/api/render/connect", {
        method: "POST",
        body: JSON.stringify({
          globalAuthSignature: {
            sig,
            derivedVia: "web3.eth.personal.sign",
            signedMessage,
            address,
          },
        }),
      });
      console.log({ res });
    } catch (err: any) {
      console.error(err.message);
    }
  };


  return {
    handleServerConnect,
  };
};

export default useServerConnect;
