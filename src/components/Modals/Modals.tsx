import { useDispatch, useSelector } from "react-redux";
import General from "./General";
import { RootState } from "../../../redux/store";

const Modals = () => {
  const dispatch = useDispatch();
  const generalModal = useSelector(
    (state: RootState) => state.app.modalOpenReducer
  );

  return (
    <>
      {generalModal?.open && (
        <General message={generalModal.message} dispatch={dispatch} />
      )}
    </>
  );
};

export default Modals;
