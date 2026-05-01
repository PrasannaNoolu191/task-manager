import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Loader = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);

  return (
    <Backdrop open={loading} sx={{ zIndex: 9999 }}>
      <CircularProgress color="primary" size={64} />
    </Backdrop>
  );
};

export default Loader;
