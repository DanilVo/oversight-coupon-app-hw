import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridRowId,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import couponService from "../../../Services/CouponService";
import notificationService from "../../../Services/NotificationService";
import CouponModal from "../CouponModal/CouponModal";
import { couponFields } from "./DataGridConfig";

/*
  Functionality that is presented in this component: 
  - Export data to CSV file.
  - Filter by all fields (including admin that created coupon)
  - CRUD functionality for coupons
  - search by all fields
*/

export default function CouponsGrid() {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<CouponModel>();
  const isEdit = Boolean(coupon?.uniqueCode);

  const userInfo = authStore.getState().user;
  const fetchCouponData = () => {
    couponService
      .getAllCoupons()
      .then((data) => {
        setCoupons(data);
      })
      .catch((err) => {
        notificationService.error(err + "coupons error");
      });
  };

  useEffect(() => {
    fetchCouponData();
  }, []);

  function CustomToolbar() {
    const handleButtonClick = () => {
      setOpenModal(true);
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

  const handleDelete = (id: GridRowId) => async () => {
    try {
      if (confirm("Are you sure?")) {
        await couponService.deleteCoupon(String(id));
        const remainingCoupons = coupons.filter((coupon) => coupon.id !== id);
        setCoupons(remainingCoupons);
        notificationService.success("Coupon has been deleted!");
      }
    } catch (error) {
      notificationService.error("Could`t delete coupon, " + error);
    }
  };

  const updateCoupon = async (updatedCoupon: CouponModel) => {
    try {
      const couponToUpdate = coupons.find(
        (c) => c.description === coupon.description
      );
      await couponService.updateCoupon(updatedCoupon, couponToUpdate.id);
      notificationService.success("Coupon was successfully updated");
      fetchCouponData();
      setOpenModal(false);
    } catch (error) {
      notificationService.error(`Can't update coupon: ${error}`);
    }
  };

  const addCoupon = async (newCoupon: CouponModel) => {
    try {
      const uuid = crypto.randomUUID();
      await couponService.addCoupon({
        ...newCoupon,
        id: uuid,
        stackable: newCoupon.stackable,
      });
      setOpenModal(false);
      fetchCouponData();
    } catch (error) {
      notificationService.error(`Can't add coupon: ${error}`);
    }
  };

  const onModalClose = () => {
    setOpenModal(false);
    setCoupon(null);
  };

  return (
    <Box sx={{ height: "80vh", width: "100wv" }}>
      <DataGrid
        rows={coupons}
        loading={!coupons || !userInfo}
        columns={couponFields(setOpenModal, setCoupon, handleDelete)}
        editMode="row"
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
      />
      <CouponModal
        openModal={openModal}
        coupon={coupon}
        isEdit={isEdit}
        onSubmit={isEdit ? updateCoupon : addCoupon}
        onModalClose={onModalClose}
      />
    </Box>
  );
}
