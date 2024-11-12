import { Box, Stack } from "@mui/material";
import Content from "../../UserArea/Content";
import PropCard from "../../UserArea/PropCard";
import useTitle from "../../../Utils/useTitle";

function Home(): JSX.Element {
  useTitle('Home')
  return (
    <Box className="Home">
      <Stack
        direction={{
          sm: "column-reverse",
          md: "row",
        }}
        sx={{
          justifyContent: "center",
          gap: { xs: 6, sm: 12 },
          p: { xs: 2, sm: 4 },
          m: "auto",
        }}
      >
        <Content />
        <PropCard />
      </Stack>
    </Box>
  );
}

export default Home;
