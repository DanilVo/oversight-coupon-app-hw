import { Box, Button, Grid2 } from "@mui/material";
import { useState } from "react";
import UserModel from "../../../Models/UserModel";
import userService from "../../../Services/UserService";
import useTitle from "../../../Utils/useTitle";
import CouponsGrid from "../DataGrid/CouponGrid";
import InviteAdminModal from "../InviteAdminModal/InviteAdminModal";

/*
  Functionality that is presented in this component: 
  - Create new admin user
  - View and manipulate all coupons data
*/

function AdminDashboard(): JSX.Element {
  useTitle("Dashboard");
  const [openInviteModal, setOpenInviteModal] = useState<boolean>(false);
  const onSubmit = async (values: UserModel) => {
    await userService.inviteAdmin(values);
    setOpenInviteModal(false);
  };
  return (
    <Box className="AllReports" maxWidth="lg" sx={{ m: "auto", mt: 3 }}>
      <Grid2 container>
        <Button sx={{ ml: "auto" }} onClick={() => setOpenInviteModal(true)}>
          Add admin
        </Button>
        <InviteAdminModal
          onSubmit={onSubmit}
          openInviteModal={openInviteModal}
          setOpenInviteModal={setOpenInviteModal}
        />
        <Grid2>
          <CouponsGrid />
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default AdminDashboard;
