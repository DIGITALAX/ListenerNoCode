import { WebhookCondition } from "@/components/CircuitFlow/types/litlistener.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NewWebhookConditionInformationState {
  value: WebhookCondition | undefined;
}

const initialNewWebhookConditionInformationState: NewWebhookConditionInformationState =
  {
    value: undefined,
  };

export const newWebhookConditionInformationSlice = createSlice({
  name: "newWebhookConditionInformation",
  initialState: initialNewWebhookConditionInformationState,
  reducers: {
    setNewWebhookConditionInformation: (
      state: NewWebhookConditionInformationState,
      action: PayloadAction<WebhookCondition | undefined>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setNewWebhookConditionInformation } =
  newWebhookConditionInformationSlice.actions;

export default newWebhookConditionInformationSlice.reducer;
