export interface AllEntries {
  circuitId: string;
  stringifiedLogs: string;
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
