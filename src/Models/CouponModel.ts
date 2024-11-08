export default class CouponModel {
  public id: number;
  public description: string
  public usageLimit: number
  public stackable: boolean
  public discountType: string
  public expiryDate: Date
  public creationDate: Date
  public uniqueCode: string
}