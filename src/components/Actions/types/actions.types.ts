export interface AllEntries {
  circuitId: string;
  ipfsHash: string;
  blockTimestamp: string;
  transactionHash: string;
  litAction: string;
}

export type AllActionsProps = {
  allEntries: AllEntries[];
};

export type CodeComponentProps = {
  code: string;
};
