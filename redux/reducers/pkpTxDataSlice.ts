import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PkpTxDataState {
  value:
    | {
        to: `0x${string}`;
        nonce: number;
        chainId: number;
        gasLimit: string;
        gasPrice: undefined;
        maxFeePerGas: undefined;
        maxPriorityFeePerGas: undefined;
        data: string;
        value: number;
        type: number;
      }
    | undefined;
}

const initialPkpTxDataState: PkpTxDataState = {
  value: undefined,
};

export const pkpTxDataSlice = createSlice({
  name: "pkpTxData",
  initialState: initialPkpTxDataState,
  reducers: {
    setPkpTxData: (
      state: PkpTxDataState,
      action: PayloadAction<
        | {
            to: `0x${string}`;
            nonce: number;
            chainId: number;
            gasLimit: string;
            gasPrice: undefined;
            maxFeePerGas: undefined;
            maxPriorityFeePerGas: undefined;
            data: string;
            value: number;
            type: number;
          }
        | undefined
      >
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setPkpTxData } = pkpTxDataSlice.actions;

export default pkpTxDataSlice.reducer;
