import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ps5 from "../../Assets/ps5.png";

export default function Content() {
  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignSelf: "center",
        gap: 4,
        maxWidth: 450,
      }}
    >
      <Box
        sx={{ display: { lg: "flex" } }}
        component="img"
        alt="playstation5"
        src={ps5}
      />
    </Stack>
  );
}
