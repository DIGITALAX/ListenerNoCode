import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useSignMessage } from "wagmi";

const useServerConnect = () => {
  const { address } = useAccount();
  const [messageToSign, setMessageToSign] = useState<string>("");
  const siweMessage = new SiweMessage({
    domain: "localhost",
    address: address,
    statement: "This is an Auth Sig for LitListenerSDK",
    uri: "https://localhost/login",
    version: "1",
    chainId: 137,
  });

  const { signMessageAsync } = useSignMessage({
    message: messageToSign,
  });

  const handleServerConnect = async () => {
    try {
      const signedMessage = siweMessage.prepareMessage();
      setMessageToSign(signedMessage);

      const sig = await signMessageAsync();
      const res = await fetch("/api/azure/connect", {
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

  const writeMessage = async () => {
    try {
      const sig = await signMessageAsync();
      const res = await fetch("/api/azure/connect", {
        method: "POST",
        body: JSON.stringify({
          globalAuthSignature: {
            sig,
            derivedVia: "web3.eth.personal.sign",
            messageToSign,
            address,
          },
        }),
      });
      setMessageToSign("");
      console.log({ res });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (messageToSign !== "") {
      writeMessage();
    }
  }, [messageToSign]);

  return {
    handleServerConnect,
  };
};

export default useServerConnect;
