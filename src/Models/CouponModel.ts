export default class CouponModel {
  public id: string;
  public amount: number;
  public description: string;
  public usageLimit: number;
  public stackable: boolean;
  public discountType: string;
  public expiryDate: Date | string;
  public creationDate: Date | string;
  public createdBy: string;
  public uniqueCode: string;
  public valid: boolean;
}
