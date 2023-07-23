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
  `Enter the response path for the value you are querying.<br/><br/> For example, if an API returns { "data": { "user": { "id": 1 } } }, the response path to get the user's ID would be data.user.id.`,
  "Do you need an API key?<br/><br/>If the API you are querying requires a key, make sure to include it here.",
  "Enter the value that you expect to be returned by the API's response path and the corresponding match operator.<br/><br/>The match operator defines the type of comparison to be made between the API's returned response and your expected value.<br/><br/>It might include equality (==, ===), inequality (!=, !==), less than (<), greater than (>), less than or equal to (<=), greater than or equal to (>=).",
  "Check over your Webhook Condition.<br/><br/>Looking good? When you're ready, add the condition to the circuit.<br/><br/>You can add more conditions or move to the next stage.",
];

export const SET_CONDITIONS_TEXT_CONTRACT: string[] = [
  "Choose Between A Webhook or Contract Condition.<br/><br/>Webhook Conditions Monitor triggers or conditions returned via webhooks or APIs.<br/><br/>Contract Conditions monitor emitted contract events on a Blockchain network.",
  "Enter the contract address that the monitored event will be emitted from.<br/><br/>The contract address should start with 0x.",
  "Choose the correct Blockchain Network where your contract address is deployed.<br/><br/>For example, if your contract is deployed on Ethereum Mainnet then choose the chain name Ethereum.<br/><br/>Chain missing? If your contract is deployed on another chain you can use the SDK directly for more extensive network support.",
  "Enter the name of the event that you are monitoring.<br/><br/>For example if you were monitoring when the 'Transfer' event is emitted from your contract, enter 'Transfer'. The event name is case sensitive.",
  `Enter the input values for your event. This will be used to build your contract ABI.<br/><br/>If you are taking a contract from Etherscan or a similar blockchain explorer, you can find your ABI under the Contract > Code tab. It should look something like this:<br/><br/>{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"parentTokenId","type":"uint256"}],"name":"ParentBurned","type":"event"}.<br/><br/>There will be a box labelled at the bottom 'Contract ABI'. Find the correct object for your monitored event and copy and paste over the input fields, adding more if required.`,
  `Enter the name of the event args that you'd like to monitor from the emitted event.<br/><br/>For example, if you are monitoring the Transfer event and it includes the data points to, from, amount, you might want to compare the data emitted by all 3 data points or just one.<br/><br/>Enter the corresponding expected value for each data point and the correct match operator. The match operator defines the type of comparison to be made between the API's returned response and your expected value.`,
  "Check over your Contract Condition.<br/><br/>Looking good? When you're ready, add the condition to the circuit.<br/><br/>You can add more conditions or move to the next stage.",
];

export const SET_CONDITIONAL_LOGIC_TEXT_EVERY: string[] = [
  "Select the condition check logic type for the circuit.<br/><br/> With EVERY your Lit Action will execute every time all conditions are met.<br/><br/>With THRESHOLD your Lit Action will execute when this number of threshold conditions are met.<br/><br/>With TARGET your Lit Action will execute as long as at least this target condition has been matched.",
  "Choose the interval (in milliseconds) for how often your conditions should be checked.<br/><br/>If left blank your conditions will be checked every 30 minutes. Note that some API endpoints and contract providers have rate limits so if a short interval period is specified the circuit may error and timeout.",
];

export const SET_CONDITIONAL_LOGIC_TEXT_THRESHOLD: string[] = [
  "Select the condition check logic type for the circuit.<br/><br/> With EVERY your Lit Action will execute every time all conditions are met.<br/><br/>With THRESHOLD your Lit Action will execute when this number of threshold conditions are met.<br/><br/>With TARGET your Lit Action will execute as long as at least this target condition has been matched.",
  "Choose the interval (in milliseconds) for how often your conditions should be checked.<br/><br/>If left blank your conditions will be checked every 30 minutes. Note that some API endpoints and contract providers have rate limits so if a short interval period is specified the circuit may error and timeout.",
  "Set the threshold number of conditions that must be matched with your expected value on each run of the circuit in order for the Lit Action to be executed.",
];

export const SET_CONDITIONAL_LOGIC_TEXT_TARGET: string[] = [
  "Select the condition check logic type for the circuit.<br/><br/>With EVERY your Lit Action will execute every time all conditions are met.<br/><br/>With THRESHOLD your Lit Action will execute when this number of threshold conditions are met.<br/><br/>With TARGET your Lit Action will execute as long as at least this target condition has been matched.",
  "Choose the interval (in milliseconds) for how often your conditions should be checked.<br/><br/>If left blank your conditions will be checked every 30 minutes. Note that some API endpoints and contract providers have rate limits so if a short interval period is specified the circuit may error and timeout.",
  "Choose the target condition that must be matched with your expected value in order for the Lit Action to execute.",
];

export const SET_ACTIONS_TEXT_CONTRACT: string[] = [
  "Choose Between A Fetch or Contract Action.<br/><br/>Fetch Actions retrieve data from external APIs and then sign a message of your choice.<br/><br/>Contract Actions sign a transaction for a contract function.<br/><br/>Once signed each action can then be broadcast to the blockchain network.",
  "Enter the contract address that you'd like to interact with and create signed data for.<br/><br/>The contract address should start with 0x.",
  "Choose the correct Blockchain Network where your contract address is deployed.<br/><br/>For example, if your contract is deployed on Ethereum Mainnet then choose the chain name Ethereum.<br/><br/>Chain missing? If your contract is deployed on another chain you can use the SDK directly for more extensive network support.",
  "Enter the name of the function that you want to use.<br/><br/>For example if you wanted to Transfer tokens from your ERC20 contract then choose the function name 'transferFrom'.",
  `Enter the input values for your function. This will be used to build your contract ABI.<br/><br/>If you are taking a contract from Etherscan or a similar blockchain explorer, you can find your ABI under the Contract > Code tab. It should look something like this:<br/><br/>{"internalType":"uint256","name":"amount","type":"uint256"}.<br/><br/>There will be a box labelled at the bottom 'Contract ABI'. Find the correct object for your chosen function and copy and paste over the input fields, adding more if required.`,
  `Enter the output values for your function. This will be used to build your contract ABI.<br/><br/>If you are taking a contract from Etherscan or a similar blockchain explorer, you can find your ABI under the Contract > Code tab. It should look something like this:<br/><br/>{"internalType":"address","name":"","type":"address"}.<br/><br/>There will be a box labelled at the bottom 'Contract ABI'. Find the correct object for your chosen function and copy and paste over the output fields, adding more if required. Also specify whether your function is payable and its state mutability. You can also find these values in the same object.`,
  `Enter any arguments required by your function.<br/><br/>For example, if you are executing a transferFrom then your function requires the _to, _from and _amount arguments.<br/><br/>Add more arguments as required.`,
  "Check over your Contract Action.<br/><br/>Looking good? When you're ready, add the action to the circuit.<br/><br/>You can add more actions or move to the next stage.",
];

export const SET_ACTIONS_TEXT_FETCH: string[] = [
  "Choose Between A Fetch or Contract Action.<br/><br/>Fetch Actions retrieve data from external APIs and then sign a message of your choice.<br/><br/>Contract Actions sign a transaction for a contract function.<br/><br/>Once signed each action can then be broadcast to the blockchain network.",
  "Enter the Base URL for the API.<br/><br/>This is the main part of the API's address, usually including the scheme, host, and port (if needed), and excluding the specific endpoint or parameters.<br/><br/>For instance, in https://api.example.com/v1/users, the Base URL is https://api.example.com/v1",
  "Enter the endpoint for the API.<br/><br/>The Endpoint is the specific path or location on the API server where a certain action or resource is located. It often follows the Base URL and includes additional path segments that direct to specific resources or actions.<br/><br/>In the same example https://api.example.com/v1/users, users is the endpoint. Users should enter the specific endpoint that they want to interact with.",
  `Enter the response path for the value you are querying.<br/><br/> For example, if an API returns { "data": { "user": { "id": 1 } } }, the response path to get the user's ID would be data.user.id."`,
  "Do you need an API key?<br/><br/>If the API you are querying requires a key, make sure to include it here.",
  "Enter the value that the PKP will sign. If left blank the response returned from the API will be signed.<br/><br/>Also specify any signed conditions, i.e. the PKP will also sign if the response path matches a certain value or values. You can combine sign conditions with && or || operators.<br/><br/>For example if you only want to sign if the returned response is greater than or equal to 60 then set sign conditions with the '&&' type, '>=' operator, '60' value and 'number' value type.",
  "Check over your Fetch Action.<br/><br/>Looking good? When you're ready, add the action to the circuit.<br/><br/>You can add more actions or move to the next stage.",
];

export const EXECUTION_CONSTRAINTS_TEXT: string[] = [
  "Select the date and time that your circuit should start running.",
  "Select the date and time that your circuit should complete running.",
  "This sets the maximum number of times that the circuit will run a full loop before stopping.<br/><br/>This count includes instances when the conditions are met (matched), when the conditions aren't met (unmatched), and when the conditional logic fails (such as syntax errors or logic issues).",
  "This sets the maximum number of times that the main Lit Action code will be executed before the circuit stops running.<br/><br/>This includes the entire run of the circuit, regardless of whether the conditions were met or not.<br/><br/>It's a way to limit the overall PKP signing activity of your circuit.",
];

export const IPFS_TEXT: string[] = [
  "Hash your Lit Action Code to IPFS.<br/><br/>This IPFS CID is used when minting your PKP to assign the correct Lit Action Code.",
  "Would you like to contribute your Lit Action Code to the public Lit Action Code database?<br/><br/>This allows for other users to assign the same actions to their minted PKP.",
];

export const MINT_BURN_TEXT: string[] = [
  "Mint your PKP on the Chronicle Network.<br/><br/>This PKP can only be used with the Lit Action Code you generated in the previous step, ensuring that you always know what you are signing.<br/><br/>Need LIT test token to mint? Grab some from https://faucet.litprotocol.com/",
];

export const RUN_CIRCUIT_TEXT: string[] = [
  "Your circuit is ready to start running!<br/><br/>If you have set Contract Actions make sure that you have correctly funded your PKP on the network/s you specified so that your signed transactions can be successfully broadcast to the blockchain.<br/><br/>Click to start.",
  "Wait a moment while your circuit is starting up.",
  "Your circuit is running!<br/><br/>View logs and details on your account page."
];
