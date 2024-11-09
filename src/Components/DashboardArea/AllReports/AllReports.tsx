import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import CouponModel from '../../../Models/CouponModel';
import couponService from '../../../Services/CouponService';
import notificationService from '../../../Services/NotificationService';
import useTitle from '../../../Utils/useTitle';
import BasicData from '../BasicData/BasicData';
import FilteringGrid from '../DataGrid/DataGrid';
import './AllReports.css';

function AllReports(): JSX.Element {
  useTitle('Dashboard');
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  useEffect(() => {
    couponService
      .getAllCoupons()
      .then((data) => {
        setCoupons(data);
      })
      .catch((err) => {
        notificationService.error('coupons error');
      });
  }, []);

  return (
    <Box className="AllReports" maxWidth="lg" sx={{ m: 'auto', mt: 3 }}>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <FilteringGrid />
        </Grid>
        <Grid item xs={12} sm={4}>
          <BasicData />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AllReports;
