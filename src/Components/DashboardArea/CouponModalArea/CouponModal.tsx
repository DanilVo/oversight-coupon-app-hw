import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useForm } from "react-hook-form";
import CouponModel from "../../../Models/CouponModel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

interface Props {
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
  coupon: CouponModel;
}

export default function CouponModal(props: Props) {
  const { register, setValue, handleSubmit } = useForm<CouponModel>();

  setValue("description", props.coupon?.description);
  setValue(
    "creationDate",
    moment(props.coupon?.creationDate).format("YYYY-MM-DD")
  );
  setValue("expiryDate", moment(props.coupon?.expiryDate).format("YYYY-MM-DD"));
  setValue("createdBy", props.coupon?.createdBy);
  setValue("discountType", props.coupon?.discountType);
  setValue("stackable", props.coupon?.stackable);
  setValue("uniqueCode", props.coupon?.uniqueCode);
  setValue("valid", props.coupon?.valid);
  setValue("usageLimit", props.coupon?.usageLimit);

  const updateCoupon = (coupon: CouponModel) => {
    console.log(coupon);
  };

  return (
    <div>
      <Modal
        open={props.openModal}
        onClose={() => props.setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Coupon
          </Typography>
          <TextField
            required
            sx={{ mt: 2 }}
            type="text"
            label="Description:"
            variant="outlined"
            {...register("description")}
          />
          <TextField
            required
            sx={{ mt: 2 }}
            label="Creation Date:"
            type="date"
            variant="outlined"
            focused
            // inputProps={{
            //   min: new Date().toISOString().slice(0, 16),
            // }}
            {...register("creationDate")}
          />
          <TextField
            required
            sx={{ mt: 2 }}
            label="Expiry Date:"
            type="date"
            variant="outlined"
            focused
            {...register("expiryDate")}
          />
          <TextField
            required
            sx={{ mt: 2, maxWidth: "100%" }}
            type="text"
            label="Created By:"
            variant="outlined"
            multiline
            {...register("createdBy")}
          />
          <TextField
            required
            sx={{ mt: 2 }}
            type="text"
            label="Discount type:"
            variant="outlined"
            {...register("discountType")}
          />
          <TextField
            required
            sx={{ mt: 2 }}
            label="Usage Limit:"
            type="number"
            variant="outlined"
            {...register("usageLimit")}
          />
          <TextField
            required
            sx={{ mt: 2 }}
            label="Stackable:"
            type="text"
            variant="outlined"
            {...register("stackable")}
          />
          <TextField
            required
            sx={{ mt: 2 }}
            label="Unique Code:"
            type="text"
            variant="outlined"
            {...register("uniqueCode")}
          />
          <TextField
            required
            sx={{ mt: 2 }}
            label="Valid:"
            type="text"
            variant="outlined"
            {...register("valid")}
          />
          <Button
            sx={{ mt: 2 }}
            type="submit"
            onClick={handleSubmit(updateCoupon)}
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
