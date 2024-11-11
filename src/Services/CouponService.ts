import axios from "axios";
import CouponModel from "../Models/CouponModel";
import appConfig from "../Utils/AppConfig";
import moment from "moment";

class CouponService {
  public async getAllCoupons(): Promise<CouponModel[]> {
    const { data } = await axios.get(appConfig.couponsUrl);
    data.forEach((d: CouponModel) => {
      d.valid = moment().isBefore(d.expiryDate) && d.usageLimit > 0;
    });
    return data;
  }

  public async addCoupon(coupon: CouponModel): Promise<void> {
    await axios.post(appConfig.couponsUrl, coupon);
  }

  public async updateCoupon(
    coupon: CouponModel,
    couponId: number
  ): Promise<void> {
    await axios.patch(appConfig.couponsUrl + couponId, coupon);
  }

  public async updateCoupons(coupons: CouponModel[]): Promise<void> {
    for (const coupon of coupons) {
      await axios.patch(appConfig.couponsUrl + coupon.id, {
        ...coupon,
        usageLimit: coupon.usageLimit - 1,
      });
    }
  }

  public async deleteCoupon(couponId: string): Promise<void> {
    await axios.delete(appConfig.couponsUrl + couponId);
  }

  public async getCoupon(couponId: string): Promise<CouponModel> {
    const { data } = await axios.get(appConfig.couponsUrl + couponId);
    return data;
  }
}

const couponService = new CouponService();
export default couponService;
