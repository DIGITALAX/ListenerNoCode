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
  "Check over your Webhook Condition.<br/><br/>Looking good? When you're ready, add the condition to the circuit.<br/><br/>You can add more conditions or move to the next stage.",
];

export const SET_CONDITIONS_TEXT_CONTRACT: string[] = [
  "Choose Between A Webhook or Contract Condition.<br/><br/>Webhook Conditions Monitor triggers or conditions returned via webhooks or APIs.<br/><br/>Contract Conditions monitor emitted contract events on a Blockchain network.",
  "Enter the contract address that the monitored event will be emitted from.<br/><br/>The contract address should start with 0x.",
  "Choose the correct Blockchain Network where your contract address is deployed.<br/><br/>For example, if your contract is deployed on Ethereum Mainnet then choose the chain name Ethereum.",
  "Enter the name of the event that you are monitoring.<br/><br/>For example if you were monitoring when the 'Transfer' event is emitted from your contract, enter 'Transfer'. The event name is case sensitive.",
  `Enter the input values for your event. This will be used to build your contract ABI.<br/><br/>If you are taking a contract from Etherscan or a similar blockchain explorer, you can find your ABI under the Contract > Code tab. It should look something like this:<br/><br/>{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"parentTokenId","type":"uint256"}],"name":"ParentBurned","type":"event"}.<br/><br/>There will be a box labelled at the bottom 'Contract ABI'. Find the correct object for your monitored event and copy and paste over the input fields, adding more if required.`,
  `Enter the name of the event args that you'd like to monitor from the emitted event.<br/><br/>For example, if you are monitoring the Transfer event and it includes the data points to, from, amount, you might want to compare the data emitted by all 3 data points or just one.<br/><br/>Enter the corresponding expected value for each data point and the correct match operator. The match operator defines the type of comparison to be made between the API's returned response and your expected value.`,
];
