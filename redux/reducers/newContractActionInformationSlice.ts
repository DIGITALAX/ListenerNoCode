import { ContractAction } from "@/components/CircuitFlow/types/litlistener.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NewContractActionInformationState {
  value: ContractAction | undefined;
}

const initialNewContractActionInformationState: NewContractActionInformationState =
  {
    value: undefined,
  };

export const newContractActionInformationSlice = createSlice({
  name: "newContractActionInformation",
  initialState: initialNewContractActionInformationState,
  reducers: {
    setNewContractActionInformation: (
      state: NewContractActionInformationState,
      action: PayloadAction<ContractAction | undefined>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setNewContractActionInformation } =
  newContractActionInformationSlice.actions;

export default newContractActionInformationSlice.reducer;
