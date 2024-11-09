import { Box, Container, Divider, Typography } from "@mui/material";
import "./BasicData.css";

function BasicData(): JSX.Element {
    
  return (
    <Container
      sx={{
        p: 1,
        bgcolor: "white",
        height: "100%",
        borderRadius: 1,
        boxShadow: "11px 11px 22px #acacac,-11px -11px 22px #ffffff;",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Box>
        <Typography color="primary" sx={{ typography: { md: "h4", sm: "h5" } }}>
          Currently:
        </Typography>
        <Typography component="p" variant="body1" color="text.secondary">
          <b>text</b> Vacations running
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography color="primary" sx={{ typography: { md: "h4", sm: "h5" } }}>
          Future vacations:
        </Typography>
        <Typography component="p" variant="body1" color="text.secondary">
          <b>text</b> Vacations planned this year
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography color="primary" sx={{ typography: { md: "h4", sm: "h5" } }}>
          Till today:
        </Typography>
        <Typography component="p" variant="body1" color="text.secondary">
          <b>text</b> Successfully finished vacations
        </Typography>
      </Box>
    </Container>
  );
}

export default BasicData;
