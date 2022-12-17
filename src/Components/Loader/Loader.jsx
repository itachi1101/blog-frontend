import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
export default function Loader() {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <CircularProgress style={{ color: "white", size: "25px" }} />
    </Backdrop>
  );
}