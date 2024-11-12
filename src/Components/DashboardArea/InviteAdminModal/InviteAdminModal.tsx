import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import { v4 as uuidv4 } from "uuid";
 
/*
  Functionality that is presented in this component: 
  - Modal for admin creation
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
  onSubmit: (c: UserModel) => void;
  openInviteModal: boolean;
  setOpenInviteModal: (x: boolean) => void;
}

export default function InviteAdminModal(props: Props) {
  const { onSubmit, openInviteModal, setOpenInviteModal } = props;
  const { register, setValue, handleSubmit, reset, formState } =
    useForm<UserModel>();
  const { errors } = formState;

  setValue("password", uuidv4().substring(0, 8));
  setValue("id", uuidv4());

  return (
    <div>
      <Modal
        open={openInviteModal}
        onClose={() => {
          reset();
          setOpenInviteModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create admin
          </Typography>
          <TextField
            sx={{ mt: 2 }}
            type="text"
            label="First name:"
            variant="outlined"
            {...register("firstName", {
              required: { value: true, message: "First name is required" },
              minLength: { value: 2, message: "First name is to short" },
              pattern: {
                value: /^[A-Za-z]+$/,
                message:
                  "First name can not contain numbers or special characters",
              },
            })}
            helperText={errors.firstName?.message}
          />
          <TextField
            sx={{ mt: 2 }}
            label="Last name:"
            type="text"
            variant="outlined"
            {...register("lastName", {
              required: { value: true, message: "Last name is required" },
              minLength: { value: 2, message: "Last name is to short" },
              pattern: {
                value: /^[A-Za-z]+$/,
                message:
                  "Last name can not contain numbers or special characters",
              },
            })}
            helperText={errors.lastName?.message}
          />
          <TextField
            sx={{ mt: 2 }}
            label="Email:"
            type="email"
            variant="outlined"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter valid email",
              },
            })}
            helperText={errors.email?.message}
          />
          <TextField
            disabled
            sx={{ mt: 2, maxWidth: "100%" }}
            type="text"
            label="Password:"
            variant="outlined"
            {...register("password")}
          />
          <Button
            sx={{ mt: 2 }}
            type="submit"
            onClick={handleSubmit((c) => {
              reset();
              onSubmit(c);
            })}
            variant="contained"
          >
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
