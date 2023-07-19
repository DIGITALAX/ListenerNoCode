export const INFURA_GATEWAY: string = "https://chromadin.infura-ipfs.io";

export const CHRONICLE_PROVIDER: string =
  "https://chain-rpc.litprotocol.com/http";

export const LIT_DB_CONTRACT: `0x${string}` =
  "0x659d8ddffc85d26c877701e3323ec8c6d69aea1e";

export const PKP_CONTRACT: `0x${string}` =
  "0x8F75a53F65e31DD0D2e40d0827becAaE2299D111";

export const SET_CONDITIONS_TEXT_WEBHOOK: string[] = [
  "Choose Between A Webhook or Contract Condition.<br/><br/>Webhook Conditions Monitor triggers or conditions returned via webhooks or APIs.<br/><br/>Contract Conditions monitor emitted contract events on a Blockchain network.",
  "Enter the Base URL for the API.<br/><br/>This is the main part of the API's address, usually including the scheme, host, and port (if needed), and excluding the specific endpoint or parameters.<br/><br/>For instance, in https://api.example.com/v1/users, the Base URL is https://api.example.com/v1",
  "Enter the endpoint for the API.<br/><br/>The Endpoint is the specific path or location on the API server where a certain action or resource is located. It often follows the Base URL and includes additional path segments that direct to specific resources or actions.<br/><br/>In the same example https://api.example.com/v1/users, users is the endpoint. Users should enter the specific endpoint that they want to interact with.",
  `Enter the response path for the value you are querying.<br/><br/> For example, if an API returns { "data": { "user": { "id": 1 } } }, the response path to get the user's ID would be data.user.id.<br/><br/>You need to enter the response path that leads to the specific piece of data that you want to retrieve or use from the API's response.`,
  "Do you need an API key?<br/><br/>If the API you are querying requires a key, make sure to include it here.",
  "Enter the value that you expect to be returned by the API's response path and the corresponding match operator.<br/><br/>The match operator defines the type of comparison to be made between the API's returned response and your expected value.<br/><br/>It might include equality (==, ===), inequality (!=, !==), less than (<), greater than (>), less than or equal to (<=), greater than or equal to (>=).",
];

export const SET_CONDITIONS_TEXT_CONTRACT: string[] = [
  "Choose Between A Webhook or Contract Condition.<br/><br/>Webhook Conditions Monitor triggers or conditions returned via webhooks or APIs.<br/><br/>Contract Conditions monitor emitted contract events on a Blockchain network.",
];
