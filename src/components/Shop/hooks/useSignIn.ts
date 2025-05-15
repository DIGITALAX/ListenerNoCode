import { ModalContext } from "@/pages/_app";
import { chains } from "@lens-chain/sdk/viem";
import { Account, evmAddress } from "@lens-protocol/client";
import {
  fetchAccountsAvailable,
  revokeAuthentication,
} from "@lens-protocol/client/actions";
import { useContext, useEffect, useState } from "react";
import { createWalletClient, custom } from "viem";
import { getOracle } from "../../../../graphql/subgraph/queries/getOracle";
import { useAccount } from "wagmi";

const useSignIn = () => {
  const context = useContext(ModalContext);
  const { address } = useAccount();
  const [lensLoading, setLensLoading] = useState<boolean>(false);

  const handleLensConnect = async () => {
    if (!address || !context?.lensClient) return;
    setLensLoading(true);
    try {
      const signer = createWalletClient({
        chain: chains.mainnet,
        transport: custom(window.ethereum!),
        account: address,
      });
      const accounts = await fetchAccountsAvailable(context?.lensClient!, {
        managedBy: evmAddress(signer.account.address),
        includeOwned: true,
      });

      if (accounts.isErr()) {
        setLensLoading(false);
        return;
      }

      if (accounts.value.items?.[0]?.account?.address) {
        const authenticated = await context?.lensClient?.login({
          accountOwner: {
            account: evmAddress(accounts.value.items?.[0]?.account?.address),
            owner: signer.account.address?.toLowerCase(),
          },
          signMessage: (message) => signer.signMessage({ message }),
        });

        if (!authenticated?.isOk()) {
          console.error((authenticated as any)?.error);

          context?.setGeneralModal({
            open: true,
            message: "There was an error signing into Lens. Try Again.",
            image: "QmSUH38BqmfPci9NEvmC2KRQEJeoyxdebHiZi1FABbtueg",
          });
          setLensLoading(false);
          return;
        }

        const sessionClient = authenticated.value;
        context?.setLensConectado?.({
          sessionClient,
          profile: accounts.value.items?.[0]?.account as Account,
        });
      } else {
        const authenticatedOnboarding = await context?.lensClient?.login({
          onboardingUser: {
            wallet: signer.account.address,
          },
          signMessage: (message) => signer.signMessage({ message }),
        });

        if (!authenticatedOnboarding?.isOk()) {
          console.error((authenticatedOnboarding as any).error);
          context?.setGeneralModal({
            open: true,
            message: "There was an error signing into Lens. Try Again.",
            image: "QmSUH38BqmfPci9NEvmC2KRQEJeoyxdebHiZi1FABbtueg",
          });

          setLensLoading(false);
          return;
        }

        const sessionClient = authenticatedOnboarding.value;

        context?.setLensConectado?.({
          sessionClient,
        });

        context?.setGeneralModal({
          open: true,
          message: "Looks like you don't have a Lens Account? Try Again.",
          image: "QmSUH38BqmfPci9NEvmC2KRQEJeoyxdebHiZi1FABbtueg",
        });
      }
    } catch (err: any) {
      console.error(err.message);
    }

    setLensLoading(false);
  };

  const resumeLensSession = async () => {
    try {
      const resumed = await context?.lensClient?.resumeSession();

      if (resumed?.isOk()) {
        const accounts = await fetchAccountsAvailable(context?.lensClient!, {
          managedBy: evmAddress(address!),
          includeOwned: true,
        });

        if (accounts.isErr()) {
          return;
        }

        context?.setLensConectado?.({
          profile: accounts.value.items?.[0]?.account as Account,
          sessionClient: resumed?.value,
        });
      }
    } catch (err) {
      console.error("Error al reanudar la sesión:", err);
      return null;
    }
  };

  const logout = async () => {
    setLensLoading(true);
    try {
      const auth =
        context?.lensConectado?.sessionClient?.getAuthenticatedUser();

      if (auth?.isOk()) {
        await revokeAuthentication(context?.lensConectado?.sessionClient!, {
          authenticationId: auth.value?.authenticationId,
        });

        context?.setLensConectado?.(undefined);
        window.localStorage.removeItem("lens.mainnet.credentials");
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setLensLoading(false);
  };

  const handleOracles = async (): Promise<void> => {
    try {
      const data = await getOracle();

      context?.setOracleData(data?.data?.currencyAddeds);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (address && context?.lensClient && !context?.lensConectado?.profile) {
      resumeLensSession();
    }
  }, [address, context?.lensClient]);

  useEffect(() => {
    if (!address && context?.lensConectado?.profile && context?.lensClient) {
      logout();
    }
  }, [address]);

  useEffect(() => {
    if (!context?.oracleData || context?.oracleData?.length < 1) {
      handleOracles();
    }
  }, []);

  return {
    handleLensConnect,
    lensLoading,
    logout,
  };
};

export default useSignIn;
