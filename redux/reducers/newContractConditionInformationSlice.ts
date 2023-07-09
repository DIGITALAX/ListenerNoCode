import { ContractCondition } from "@/components/CircuitFlow/types/litlistener.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NewContractConditionInformationState {
  value: ContractCondition | undefined;
}

const initialNewContractConditionInformationState: NewContractConditionInformationState =
  {
    value: undefined,
  };

export const newContractConditionInformationSlice = createSlice({
  name: "newContractConditionInformation",
  initialState: initialNewContractConditionInformationState,
  reducers: {
    setNewContractConditionInformation: (
      state: NewContractConditionInformationState,
      action: PayloadAction<ContractCondition | undefined>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setNewContractConditionInformation } =
  newContractConditionInformationSlice.actions;

export default newContractConditionInformationSlice.reducer;
