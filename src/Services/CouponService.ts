import axios from 'axios';
import appConfig from '../Utils/AppConfig';
import {
  CouponAction,
  CouponActionTypes,
  couponStore,
} from '../Redux/CouponsState';
import CouponModel from '../Models/CouponModel';

class CouponService {
  public async getAllCoupons(): Promise<CouponModel[]> {
    const { data } = await axios.get(appConfig.couponsUrl);
    const action: CouponAction = {
      type: CouponActionTypes.SetCoupons,
      payload: data,
    };
    couponStore.dispatch(action);
    return data;
  }

  public async addCoupon(coupon: CouponModel): Promise<void> {
    const { data } = await axios.post(appConfig.couponsUrl, coupon);
    const action: CouponAction = {
      type: CouponActionTypes.AddCoupon,
      payload: data,
    };
    couponStore.dispatch(action);
  }

  public async updateCoupon(coupon: CouponModel): Promise<void> {
    const { data } = await axios.put(appConfig.couponsUrl, coupon);
    const action: CouponAction = {
      type: CouponActionTypes.UpdateCoupon,
      payload: data,
    };
    couponStore.dispatch(action);
  }
  
  public async deleteCoupon(couponId: number): Promise<void> {
    await axios.delete(appConfig.couponsUrl + couponId);
      const action: CouponAction = {
        type: CouponActionTypes.DeleteCoupon,
        payload: couponId,
      };   
      couponStore.dispatch(action);
  }
}

const couponService = new CouponService();
export default couponService;
