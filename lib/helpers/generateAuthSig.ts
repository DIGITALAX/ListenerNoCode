import { LitAuthSig } from "@/components/CircuitFlow/types/litlistener.types";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";

export const generateAuthSig = async (
    signer: ethers.Signer,
    chainId = 1,
    uri = "https://listener.irrevocable.dev",
    version = "1",
  ): Promise<LitAuthSig> => {
    try {
      const address = await signer.getAddress();
      const siweMessage = new SiweMessage({
        domain: "listener.irrevocable.dev",
        address: await signer.getAddress(),
        statement: "This is an Auth Sig for LitListenerSDK",
        uri: uri,
        version: version,
        chainId: chainId,
      });
      const signedMessage = siweMessage.prepareMessage();
      const sig = await signer.signMessage(signedMessage);
      return {
        sig,
        derivedVia: "web3.eth.personal.sign",
        signedMessage,
        address,
      };
    } catch (err) {
      throw new Error(`Error generating signed message ${err}`);
    }
  };