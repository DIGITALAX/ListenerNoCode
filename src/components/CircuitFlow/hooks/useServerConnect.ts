import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useSignMessage } from "wagmi";
import {
  checkAndSignAuthMessage,
  LitNodeClient,
  decryptString,
} from "@lit-protocol/lit-node-client";

const useServerConnect = () => {
  const { address } = useAccount();

  // const siweMessage = new SiweMessage({
  //   domain: "localhost",
  //   address: address || process.env.SERVER_ADDRESS,
  //   statement: "This is an Auth Sig for LitListenerSDK",
  //   uri: "https://localhost/login",
  //   version: "1",
  //   chainId: 137,
  // });

  // const signedMessage = siweMessage.prepareMessage();

  // const { signMessageAsync } = useSignMessage({
  //   message: signedMessage,
  // });

  // const handleServerConnect = async () => {
  //   try {
  //     const sig = await signMessageAsync();
  //     const res = await fetch("/api/render/connect", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         globalAuthSignature: {
  //           sig,
  //           derivedVia: "web3.eth.personal.sign",
  //           signedMessage,
  //           address,
  //         },
  //       }),
  //     });
  //   } catch (err: any) {
  //     console.error(err.message);
  //   }
  // };

  const decryptLitKey = async (): Promise<void> => {
    try {
      const client = new LitNodeClient({ debug: false });
      await client.connect();
      const authSig = await checkAndSignAuthMessage({
        chain: "polygon",
      });
      const symmetricKey = await client.getEncryptionKey({
        accessControlConditions: [
          {
            contractAddress: "",
            standardContractType: "",
            chain: "polygon",
            method: "",
            parameters: [":userAddress"],
            returnValueTest: {
              comparator: "=",
              value: "0x09e0ba2596677a84cc3b419c648ed42d47a42d6f".toLowerCase(),
            },
          },
          { operator: "or" } as any,
          {
            contractAddress: "",
            standardContractType: "",
            chain: "polygon",
            method: "",
            parameters: [":userAddress"],
            returnValueTest: {
              comparator: "=",
              value: "0xfa3fea500eeDAa120f7EeC2E4309Fe094F854E61",
            },
          },
        ],
        toDecrypt:
          "68b36f72e391dd2360df72d37b84491e1c7062c40a1b74e62a1c47f4cfdd471f48de2273a2ef3344ac98adb56b36dc106578b1afcbd348da2ba28f75e33ad3df640c5ae8a29f4d5a44356a40799f5338804c677f71031cf751d48bede5674a9180028b3f63daa3dc889805738c7416351c9d1c2f9166244ab1d5666fbb03e8ae0000000000000020eb3fd3e432b816a9838f5f17ae7f2745b7249efb515c747a25a0c673d2198c415dcab54a349975a72f7da0e170b4efa5",
        chain: "polygon",
        authSig,
      });
      const uintString = new Uint8Array([
        167, 143, 48, 201, 79, 193, 237, 90, 250, 92, 125, 253, 182, 196, 152,
        177, 205, 2, 23, 144, 236, 247, 174, 102, 31, 155, 6, 155, 185, 187, 42,
        133, 98, 150, 207, 58, 144, 197, 102, 97, 4, 115, 43, 116, 61, 37, 44,
        217, 92, 220, 137, 194, 217, 249, 54, 21, 152, 160, 163, 184, 66, 74,
        95, 249, 244, 212, 106, 81, 147, 236, 117, 204, 78, 97, 75, 40, 209, 90,
        76, 120, 225, 150, 173, 215, 203, 49, 56, 46, 12, 65, 46, 93, 179, 177,
        100, 243, 14, 158, 204, 178, 179, 15, 27, 227, 187, 228, 1, 232, 114,
        160, 251, 213, 31, 63, 204, 70, 173, 140, 155, 15, 210, 253, 237, 128,
        38, 102, 128, 241,
      ]).buffer;
      const blob = new Blob([uintString], { type: "text/plain" });
      const decryptedString = await decryptString(blob, symmetricKey);
      console.log({ decryptedString });
    } catch (err: any) {
      console.error(err);
    }
  };

  return {
    // handleServerConnect,
    decryptLitKey,
  };
};

export default useServerConnect;
