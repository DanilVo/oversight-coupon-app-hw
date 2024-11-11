import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";

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
  const { register, setValue, handleSubmit, reset } = useForm<UserModel>();

  setValue("password", crypto.randomUUID().substring(0, 10));
  setValue("id", crypto.randomUUID());

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
            required
            sx={{ mt: 2 }}
            type="text"
            label="First name:"
            variant="outlined"
            {...register("firstName")}
          />
          <TextField
            sx={{ mt: 2 }}
            label="Last name:"
            type="text"
            variant="outlined"
            required
            {...register("lastName")}
          />
          <TextField
            required
            sx={{ mt: 2 }}
            label="Email:"
            type="email"
            variant="outlined"
            {...register("email")}
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
