import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
import { v4 as uuidv4 } from "uuid";

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
  const { register, setValue, handleSubmit, reset, formState } =
    useForm<CouponModel>();
  const { errors } = formState;
  if (isEdit) {
    setValue("description", coupon?.description);
    setValue(
      "creationDate",
      moment(coupon?.creationDate).format("YYYY-MM-DD HH:mm:ss")
    );
    setValue("expiryDate", moment(coupon?.expiryDate).format("YYYY-MM-DD"));
    setValue("createdBy", coupon?.createdBy);
    setValue("discountType", coupon?.discountType);
    setValue("stackable", coupon?.stackable);
    setValue("uniqueCode", coupon?.uniqueCode);
    setValue("valid", coupon?.valid);
    setValue("amount", coupon?.amount);
    setValue("usageLimit", coupon?.usageLimit);
  } else {
    setValue("creationDate", moment().format("YYYY-MM-DD HH:mm:ss"));
    setValue("createdBy", authStore.getState().user?.id);
    setValue("uniqueCode", uuidv4());
  }

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
            sx={{ mt: 2 }}
            type="text"
            label="Description:"
            variant="outlined"
            helperText={errors.description?.message}
            {...register("description", {
              required: { value: true, message: "Description is required" },
              minLength: { value: 5, message: "Description is to short" },
            })}
          />
          <TextField
            disabled
            sx={{ mt: 2 }}
            label="Creation Date:"
            type="datetime-local"
            variant="outlined"
            focused
            {...register("creationDate")}
          />
          <TextField
            sx={{ mt: 2 }}
            label="Expiry Date:"
            type="date"
            variant="outlined"
            focused
            helperText={errors.expiryDate?.message}
            {...register("expiryDate", {
              required: { value: true, message: "Date is required" },
            })}
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
            sx={{ mt: 2 }}
            label="Usage Limit:"
            type="number"
            variant="outlined"
            helperText={errors.usageLimit?.message}
            {...register("usageLimit", {
              setValueAs: (v) => parseInt(v),
              required: { value: true, message: "Limit usage is required" },
              min: { value: 1, message: "Limit usage should be 1 or more" },
            })}
          />
          <TextField
            sx={{ mt: 2 }}
            label="Amount:"
            type="number"
            variant="outlined"
            helperText={errors.amount?.message}
            {...register("amount", {
              setValueAs: (v) => parseInt(v),
              required: { value: true, message: "Amount is required" },
              min: { value: 1, message: "Amount should be greater that 1" },
              max: { value: 99, message: "Amount should be less that 99" },
            })}
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
                {...register("stackable", {
                  required: "Please select an option",
                })}
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="No"
                {...register("stackable", {
                  required: "Please select an option",
                })}
              />
            </RadioGroup>
            <FormHelperText>{errors.stackable?.message}</FormHelperText>
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
                {...register("discountType", {
                  required: "Please select an option",
                })}
              />
            </RadioGroup>
            <FormHelperText>{errors.discountType?.message}</FormHelperText>
          </FormControl>
          <Button
            sx={{ mt: 2 }}
            type="submit"
            onClick={handleSubmit((c) => {
              reset();
              onSubmit(c);
              onModalClose();
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
