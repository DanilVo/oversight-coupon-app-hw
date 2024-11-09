import { legacy_createStore as createStore } from "redux";
import UserModel from "../Models/UserModel";

class CouponState {
  coupons: UserModel[] = [];
}

enum CouponActionTypes {
  Login = "Login",
  Logout = "Logout",
  NewUser = "NewUser",
}

interface CouponAction {
  type: CouponActionTypes;
  payload?: unknown;
}

function couponReducer(
  currentState = new CouponState(),
  action: CouponAction
): CouponState {
  const newState = { ...currentState };

  switch (action.type) {
    case CouponActionTypes.Login:
      break;

    case CouponActionTypes.Logout:
      break;

    case CouponActionTypes.NewUser:
      break;
  }
}

export const couponStore = createStore(couponReducer);
