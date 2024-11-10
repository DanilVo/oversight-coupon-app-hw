import { legacy_createStore as createStore } from 'redux';
import CouponModel from '../Models/CouponModel';

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
      if (Array.isArray(action.payload)) {
        newState.coupons = newState.coupons.concat(action.payload);
      } else {
        newState.coupons.push(action.payload);
      }
      break;

    case CouponActionTypes.UpdateCoupon:
      const couponToUpdate = newState.coupons.findIndex(
        (c) => c.id === action.payload.id
      );
      newState.coupons[couponToUpdate] = action.payload;
      break;

    case CouponActionTypes.DeleteCoupon:
      const couponToDelete = newState.coupons.findIndex(
        (c) => c.id === action.payload
      );
      newState.coupons.splice(couponToDelete, 1);
      break;
  }
  return newState;
}

export const couponStore = createStore(couponReducer);
