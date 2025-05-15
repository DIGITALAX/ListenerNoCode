import General from "./General";
import PreviewCondition from "./PreviewCondition";
import PurchaseFulfillment from "./PurchaseFulfillment";
import { useContext } from "react";
import { ModalContext } from "@/pages/_app";

const Modals = () => {
  const context = useContext(ModalContext);
  
  return (
    <>
      {context?.previewCondition?.open && <PreviewCondition />}
      {context?.generalModal?.open && <General />}
      {context?.purchaseModal && <PurchaseFulfillment />}
    </>
  );
};

export default Modals;
