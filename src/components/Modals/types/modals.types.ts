import { AnyAction, Dispatch } from "redux";

export type GeneralProps = {
  message: string;
  dispatch: Dispatch<AnyAction>;
};
