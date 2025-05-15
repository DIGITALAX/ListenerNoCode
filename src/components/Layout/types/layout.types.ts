import { SessionClient, Account } from "@lens-protocol/client";

export type LensConectado = {
  sessionClient?: SessionClient;
  profile?: Account;
};
