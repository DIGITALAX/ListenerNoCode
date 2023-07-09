import { useDispatch, useSelector } from "react-redux";
import General from "./General";
import { RootState } from "../../../redux/store";
import PreviewCondition from "./PreviewCondition";

const Modals = () => {
  const dispatch = useDispatch();
  const generalModal = useSelector(
    (state: RootState) => state.app.modalOpenReducer
  );
  const previewCondition = useSelector(
    (state: RootState) => state.app.previewConditionModalReducer
  );
  const circuitInformation = useSelector(
    (state: RootState) => state.app.circuitInformationReducer.value
  );
  const newContractConditionInformation = useSelector(
    (state: RootState) => state.app.newContractConditionInformationReducer.value
  );
  const newWebhookConditionInformation = useSelector(
    (state: RootState) => state.app.newWebhookConditionInformationReducer.value
  );
  return (
    <>
      {previewCondition?.open && (
        <PreviewCondition
          message={previewCondition.message}
          dispatch={dispatch}
          circuitInformation={circuitInformation}
          newWebhookConditionInformation={newWebhookConditionInformation}
          newContractConditionInformation={newContractConditionInformation}
        />
      )}
      {generalModal?.open && (
        <General
          message={generalModal.message}
          dispatch={dispatch}
          image={generalModal.image}
        />
      )}
    </>
  );
};

export default Modals;
