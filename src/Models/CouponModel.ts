export default class CouponModel {
  public id: number;
  public description: string;
  public usageLimit: number;
  public stackable: boolean;
  public discountType: string;
  public expiryDate: Date | string;
  public creationDate: Date | string;
  public createdBy: number;
  public uniqueCode: string;
  public valid: boolean;
}
