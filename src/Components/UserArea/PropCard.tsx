import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

import { Divider, Stack, Tooltip } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CouponModel from "../../Models/CouponModel";
import couponService from "../../Services/CouponService";
import notificationService from "../../Services/NotificationService";
import moment from "moment";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  borderRadius: "10px",
}));

export default function PropCard() {
  const originalPrice = 100;
  const [updatedPriceState, setUpdatedPriceState] =
    useState<number>(originalPrice);
  const { register, handleSubmit, resetField } = useForm();
  const [appliedCoupons, setAppliedCoupons] = useState<CouponModel[]>([]);
  const [priceBeforeCoupon, setPriceBeforeCoupon] =
    useState<number>(originalPrice);

  const applyCoupon = async (values: { [uniqueCode: string]: string }) => {
    try {
      const couponData = await fetchCouponData(values.uniqueCode);
      if (!validateCoupon(couponData)) return;

      const updatedPrice = calculateUpdatedPrice(couponData);
      updateStateWithNewCoupon(couponData, updatedPrice);
    } catch (error) {
      notificationService.error("An error occurred while applying the coupon.");
      console.error(error);
    }
  };

  const fetchCouponData = async (uniqueCode: string) => {
    const couponData: CouponModel = await couponService.getCoupon(uniqueCode);
    return couponData;
  };

  const validateCoupon = (couponData: CouponModel): boolean => {
    const isCouponValid =
      moment().isBefore(couponData?.expiryDate) && couponData?.usageLimit > 0;
    if (!isCouponValid) {
      notificationService.error("Coupon is not valid!");
      return false;
    }
    if (appliedCoupons.length > 1 && !couponData.stackable) {
      notificationService.error("Coupon is not stackable!");
      return false;
    }
    if (isCouponAlreadyApplied(couponData)) {
      notificationService.error("Coupon was already applied!");
      return false;
    }
    return true;
  };

  const isCouponAlreadyApplied = (couponData: CouponModel): boolean => {
    return appliedCoupons.some(
      (coupon) => coupon.uniqueCode === couponData.uniqueCode
    );
  };

  const calculateUpdatedPrice = (couponData: CouponModel): number => {
    const { discountType, amount } = couponData;
    return discountType === "amount"
      ? priceBeforeCoupon - amount
      : priceBeforeCoupon - (amount / 100) * priceBeforeCoupon;
  };

  const updateStateWithNewCoupon = (
    couponData: CouponModel,
    updatedPrice: number
  ) => {
    setPriceBeforeCoupon(updatedPrice);
    setUpdatedPriceState(updatedPrice);
    setAppliedCoupons([...appliedCoupons, couponData]);
    notificationService.success("Coupon has successfully applied!");
    resetField("uniqueCode");
  };

  const onBuyClick = async () => {
    try {
      couponService.updateCoupons(appliedCoupons);
      setPriceBeforeCoupon(originalPrice);
      setUpdatedPriceState(originalPrice);
      setAppliedCoupons([]);
      alert("JK it`s only hw project 🤣");
    } catch (error) {
      notificationService.error("Something went wrong");
      console.error(error);
    }
  };

  const isApplyCouponDisabled =
    appliedCoupons.length === 1 && !appliedCoupons[0].stackable;

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Playstation 5 Disc Version PS5 Console - 4K-TV Gaming.120Hz 8K Output,
        16GB GDDR6, 825GB SSD, WiFi 6, Bluetooth 5.1
      </Typography>
      <Divider />
      <Box
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {originalPrice !== updatedPriceState && (
            <Typography variant="h5">{updatedPriceState}$</Typography>
          )}

          <Typography
            color={
              originalPrice !== updatedPriceState ? "textDisabled" : "inherit"
            }
            sx={{
              textDecoration:
                originalPrice !== updatedPriceState ? "line-through" : "none",
            }}
          >
            {originalPrice}$
          </Typography>
        </Box>
        <Tooltip
          title={
            isApplyCouponDisabled ? "Non stackable coupon was applied" : ""
          }
        >
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "left" }}>
              <FormLabel htmlFor="coupon">Coupon Code</FormLabel>
            </Box>
            <Stack direction="row" spacing={1}>
              <TextField
                name="Coupon"
                placeholder="••••••"
                type="coupon"
                id="coupon"
                autoComplete="current-password"
                autoFocus
                required
                disabled={isApplyCouponDisabled}
                fullWidth
                variant="outlined"
                {...register("uniqueCode")}
              />
              <Button
                sx={{
                  color: "white",
                  bgcolor: "orange",
                  whiteSpace: "nowrap",
                  padding: "0px 25px",
                }}
                disabled={isApplyCouponDisabled}
                onClick={handleSubmit(applyCoupon)}
              >
                Apply Coupon
              </Button>
            </Stack>
          </FormControl>
        </Tooltip>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={onBuyClick}
        >
          Buy Now
        </Button>
      </Box>
    </Card>
  );
}
