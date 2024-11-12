import axios from "axios";
import CouponModel from "../Models/CouponModel";
import appConfig from "../Utils/AppConfig";
import moment from "moment";

class CouponService {
  public async getAllCoupons(): Promise<CouponModel[]> {
    const { data } = await axios.get(appConfig.couponsUrl);
    data.forEach((d: CouponModel) => {
      const expiryDate = moment(d.expiryDate, moment.ISO_8601, true);
      d.valid =
        expiryDate.isValid() &&
        expiryDate.isAfter(moment()) &&
        d.usageLimit > 0;
    });
    return data;
  }

  public async addCoupon(coupon: CouponModel): Promise<void> {
    await axios.post(appConfig.couponsUrl, coupon);
  }

  public async updateCoupon(
    coupon: CouponModel,
    couponId: string
  ): Promise<void> {
    await axios.patch(appConfig.couponsUrl + couponId, coupon);
  }

  // Because of json-server limitation we can’t perform updateMany operation at once, so we have to do loop
  public async updateCoupons(coupons: CouponModel[]): Promise<void> {
    for (const coupon of coupons) {
      await axios.patch(appConfig.couponsUrl + coupon.id, {
        ...coupon,
        usageLimit: coupon.usageLimit - 1,
      });
    }
  }

  public async deleteCoupon(couponId: string): Promise<void> {
    console.log(appConfig.couponsUrl + couponId);
    
    await axios.delete(appConfig.couponsUrl + couponId);
  }

  public async getCoupon(uniqueCode: string): Promise<CouponModel> {
    const { data } = await axios.get(
      appConfig.couponsUrl + `?uniqueCode=${uniqueCode}`
    );
    return data[0];
  }
}

const couponService = new CouponService();
export default couponService;
