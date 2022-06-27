import toast from "react-hot-toast";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { red, green } from "@mui/material/colors";



const ErrorToast = (msg) =>
  toast(msg, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#FB8377",
    },
    icon: <ErrorOutlineIcon sx={{ color: red[800] }} />,
  });

  const SuccessToast = (msg) =>
  toast(msg, {
    duration: 2000,
    position: "top-right",
    style: {
      background: "#96F58E",
    },
    icon: <CheckCircleIcon sx={{ color: green[800] }} />,
  });

export {ErrorToast, SuccessToast}