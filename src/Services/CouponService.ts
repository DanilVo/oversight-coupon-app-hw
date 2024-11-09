import axios from 'axios';
import appConfig from '../Utils/AppConfig';
import {
  CouponAction,
  CouponActionTypes,
  couponStore,
} from '../Redux/CouponsState';

class CouponService {
  public async getAllCoupons() {
    const { data } = await axios.get(appConfig.couponsUrl);
    const action: CouponAction = {
      type: CouponActionTypes.SetCoupons,
      payload: data,
    };
    couponStore.dispatch(action);
    return data;
  }
}

const couponService = new CouponService();
export default couponService;
