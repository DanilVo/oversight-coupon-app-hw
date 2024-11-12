import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useForm } from "react-hook-form";
import CouponModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";

/*
  Functionality that is presented in this component: 
  - Modal for creation and edit of the coupons 
*/

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
  coupon?: CouponModel;
  onSubmit: (c: CouponModel) => void;
  isEdit: boolean;
  onModalClose: () => void;
}

export default function CouponModal(props: Props) {
  const { openModal, coupon, onSubmit, isEdit, onModalClose } = props;
  const { register, setValue, handleSubmit, reset } = useForm<CouponModel>();

  // useEffect(() => {

  if (isEdit) {
    setValue("description", coupon?.description);
    setValue("creationDate", moment(coupon?.creationDate).format("YYYY-MM-DD"));
    setValue("expiryDate", moment(coupon?.expiryDate).format("YYYY-MM-DD"));
    setValue("createdBy", coupon?.createdBy);
    setValue("discountType", coupon?.discountType);
    setValue("stackable", coupon?.stackable);
    setValue("uniqueCode", coupon?.uniqueCode);
    setValue("valid", coupon?.valid);
    setValue("amount", coupon?.amount);
    setValue("usageLimit", coupon?.usageLimit);
  } else {
    setValue("creationDate", moment().format("YYYY-MM-DD"));
    setValue("createdBy", authStore.getState().user?.id);
    setValue("uniqueCode", crypto.randomUUID());
  }
  // }, [isEdit, coupon, setValue]);

  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => {
          reset();
          onModalClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isEdit ? "Edit Coupon" : "Add new coupon"}
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
            disabled
            sx={{ mt: 2 }}
            label="Creation Date:"
            type="date"
            variant="outlined"
            focused
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
            disabled
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
            label="Usage Limit:"
            type="number"
            variant="outlined"
            {...register("usageLimit", { setValueAs: (v) => parseInt(v) })}
          />
          <TextField
            required
            sx={{ mt: 2 }}
            label="Amount:"
            type="number"
            variant="outlined"
            {...register("amount", { setValueAs: (v) => parseInt(v) })}
          />
          <TextField
            disabled
            sx={{ mt: 2 }}
            label="Unique Code:"
            type="text"
            variant="outlined"
            {...register("uniqueCode")}
          />
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Stackable
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              defaultValue={coupon?.stackable}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Yes"
                {...register("stackable")}
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="No"
                {...register("stackable")}
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Discount type
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              defaultValue={coupon?.discountType}
            >
              <FormControlLabel
                value="percentage"
                control={<Radio />}
                label="Percentage"
                {...register("discountType")}
              />
              <FormControlLabel
                value="amount"
                control={<Radio />}
                label="Amount"
                {...register("discountType")}
              />
            </RadioGroup>
          </FormControl>
          <Button
            sx={{ mt: 2 }}
            type="submit"
            onClick={handleSubmit((c) => {
              reset();
              onSubmit(c);
            })}
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
