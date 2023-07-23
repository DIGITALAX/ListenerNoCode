import { INFURA_GATEWAY } from "../constants";

export const fetchIpfsJson = async (
  uri: string,
  jsonBool?: boolean
): Promise<any> => {
  const response = await fetch(
    `${INFURA_GATEWAY}/ipfs/${
      uri?.includes("ipfs://") ? uri?.split("ipfs://")[1] : uri
    }`
  );
  if (jsonBool) {
    return await response.json();
  } else {
    return await response.text();
  }
};
