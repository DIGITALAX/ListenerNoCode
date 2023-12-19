import { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { setOracleData } from "../../../../redux/reducers/oracleDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setWalletConnected } from "../../../../redux/reducers/walletConnectedSlice";
import { setLensConnected } from "../../../../redux/reducers/lensConnectedSlice";
import { getOracle } from "../../../../graphql/subgraph/queries/getOracle";
import getDefaultProfile from "../../../../graphql/lens/queries/default";
import {
  getAuthenticationToken,
  isAuthExpired,
  refreshAuth,
  removeAuthenticationToken,
  setAuthenticationToken,
} from "../../../../lib/utils";
import { Profile } from "../../../../graphql/generated";
import generateChallenge from "../../../../graphql/lens/queries/challenge";
import authenticate from "../../../../graphql/lens/mutations/authenticate";
import { useAccountModal } from "@rainbow-me/rainbowkit";

const useSignIn = () => {
  const dispatch = useDispatch();
  const lensConnected = useSelector(
    (state: RootState) => state.app.lensConnectedReducer?.profile
  );
  const oracleData = useSelector(
    (state: RootState) => state.app.oracleDataReducer?.data
  );
  const { openAccountModal } = useAccountModal();
  const { signMessageAsync } = useSignMessage();
  const { address, isConnected } = useAccount();
  const [signInLoading, setSignInLoading] = useState<boolean>(false);

  const handleLensConnect = async () => {
    setSignInLoading(true);
    try {
      // await createProfile({
      //   handle: "anotherp",
      //   to: address,
      // });

      const profile = await getDefaultProfile(
        {
          for: address,
        },
        lensConnected?.id
      );
      const challengeResponse = await generateChallenge({
        for: profile?.data?.defaultProfile?.id,
        signedBy: address,
      });
      const signature = await signMessageAsync({
        message: challengeResponse.data?.challenge.text!,
      });
      const accessTokens = await authenticate({
        id: challengeResponse.data?.challenge.id,
        signature: signature,
      });
      if (accessTokens) {
        setAuthenticationToken({ token: accessTokens.data?.authenticate! });
        dispatch(setLensConnected(profile?.data?.defaultProfile as Profile));
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setSignInLoading(false);
  };

  const handleRefreshProfile = async (): Promise<void> => {
    try {
      const profile = await getDefaultProfile(
        {
          for: address,
        },
        lensConnected?.id
      );
      if (profile?.data?.defaultProfile) {
        dispatch(setLensConnected(profile?.data?.defaultProfile as Profile));
      } else {
        removeAuthenticationToken();
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const handleAuthentication = async () => {
      const token = getAuthenticationToken();
      if (isConnected && !token) {
        dispatch(setLensConnected(undefined));
        removeAuthenticationToken();
      } else if (isConnected && token) {
        if (isAuthExpired(token?.exp)) {
          const refreshedAccessToken = await refreshAuth();
          if (!refreshedAccessToken) {
            removeAuthenticationToken();
          }
        }
        await handleRefreshProfile();
      }
    };

    handleAuthentication();
    dispatch(setWalletConnected(isConnected));
  }, [isConnected, address]);

  const handleOracles = async (): Promise<void> => {
    try {
      const data = await getOracle();

      dispatch(setOracleData(data?.data?.currencyAddeds));
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleLogout = () => {
    if (openAccountModal) {
      openAccountModal();
    }
    dispatch(setLensConnected(undefined));
    removeAuthenticationToken();
  };

  useEffect(() => {
    if (!oracleData || oracleData?.length < 1) {
      handleOracles();
    }
  }, []);

  useEffect(() => {
    if (!isConnected) {
      dispatch(setLensConnected(undefined));
    }
  }, [isConnected]);

  return {
    handleLensConnect,
    signInLoading,
    handleLogout,
  };
};

export default useSignIn;
