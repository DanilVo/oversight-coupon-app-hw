import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import { couponStore } from "../../../Redux/CouponsState";
import couponService from "../../../Services/CouponService";
import notificationService from "../../../Services/NotificationService";
import CouponModal from "../CouponModalArea/CouponModal";
import { couponFields } from "./DataGridConfig";

export default function CouponsGrid() {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<CouponModel>();

  useEffect(() => { 
    couponService  
      .getAllCoupons() 
      .then(() => {
        setCoupons(couponStore.getState().coupons); 
      })
      .catch((err) => {
        notificationService.error(err + "coupons error");
      });
  }, []);

  function CustomToolbar() {
    const handleButtonClick = () => {
      console.log("Add New Coupon button clicked");
    };
    return (
      <GridToolbarContainer>
        <GridToolbarQuickFilter />
        <GridToolbarExport />
        <Button variant="text" color="primary" onClick={handleButtonClick}>
          Add New Coupon
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        rows={coupons}
        columns={couponFields(setOpenModal, setCoupon)}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        editMode="row"
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
      <CouponModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        coupon={coupon}
      />
    </Box>
  );
}
