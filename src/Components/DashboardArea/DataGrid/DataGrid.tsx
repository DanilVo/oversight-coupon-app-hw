import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import CouponModel from '../../../Models/CouponModel';
import couponService from '../../../Services/CouponService';
import notificationService from '../../../Services/NotificationService';
import dataGridStructure from './DataGridStructure';

export default function FilteringGrid() {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  useEffect(() => {
    couponService
      .getAllCoupons()
      .then((data) => {
        setCoupons(data);
        console.log(data);
      })
      .catch((err) => {
        notificationService.error('coupons error');
      });
  }, []);

  return (
    <Box sx={{ height: 400, width: 1 }}>
      <DataGrid
        rows={coupons}
        columns={dataGridStructure.addNewCoupon}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        editMode='row'
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true, 
          },
        }}
      />
    </Box>
  );
}
