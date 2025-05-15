import { FunctionComponent } from "react";
import { ShippingInfoProps } from "../types/shop.types";

const ShippingInfo: FunctionComponent<ShippingInfoProps> = ({
  fulfillmentDetails,
  setFulfillmentDetails,
}): JSX.Element => {
  return (
    <div className="relative w-full h-fit flex flex-col gap-3 items-center justify-center text-white">
      <div className="relative flex w-full h-full overflow-y-scroll">
        <div className="relative w-full h-fit inline-flex flex-wrap gap-1.5 items-center justify-center">
        
          <input
            placeholder="address"
            className="bg-black border border-moda p-1.5 font-vcr text-white w-full h-8 text-xs"
            value={fulfillmentDetails.address}
            onChange={(e) =>
              setFulfillmentDetails({
                ...fulfillmentDetails,
                address: e.target.value,
              })
            }
          />
          <input
            placeholder="zip"
            className="bg-black border border-moda p-1.5 font-vcr w-16 text-white text-xs h-8"
            value={fulfillmentDetails.zip}
            onChange={(e) =>
              setFulfillmentDetails({
                ...fulfillmentDetails,
                zip: e.target.value,
              })
            }
          />
          <input
            placeholder="city"
            className="bg-black border border-moda p-1.5 font-vcr w-20 text-white text-xs h-8"
            value={fulfillmentDetails.city}
            onChange={(e) =>
              setFulfillmentDetails({
                ...fulfillmentDetails,
                city: e.target.value,
              })
            }
          />
          <input
            placeholder="state"
            className="bg-black border border-moda p-1.5 font-vcr w-16 text-white text-xs h-8"
            value={fulfillmentDetails.state}
            onChange={(e) =>
              setFulfillmentDetails({
                ...fulfillmentDetails,
                state: e.target.value,
              })
            }
          />
          <input
            placeholder="country"
            className="bg-black border border-moda p-1.5 font-vcr w-full text-white text-xs h-8"
            value={fulfillmentDetails.country}
            onChange={(e) =>
              setFulfillmentDetails({
                ...fulfillmentDetails,
                country: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
