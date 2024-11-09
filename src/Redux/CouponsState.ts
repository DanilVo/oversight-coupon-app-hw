import { legacy_createStore as createStore } from "redux";
import CouponModel from "../Models/CouponModel";

class CouponState {
  coupons: CouponModel[] = [];
}

export enum CouponActionTypes {
  SetCoupons = 'SetCoupons',
  AddCoupon = 'AddCoupon',
  UpdateCoupon = 'UpdateCoupon',
  DeleteCoupon = 'DeleteCoupon',
}

export interface CouponAction {
  type: CouponActionTypes;
  payload?: any;
}

function couponReducer(
  currentState = new CouponState(),
  action: CouponAction
): CouponState {
  const newState = { ...currentState };

  switch (action.type) {
    case CouponActionTypes.SetCoupons:
      newState.coupons = action.payload;
      break;

    case CouponActionTypes.AddCoupon:
      break;

    case CouponActionTypes.UpdateCoupon:
      break;

    case CouponActionTypes.DeleteCoupon:
      break;
  }
  return newState
}

export const couponStore = createStore(couponReducer);
