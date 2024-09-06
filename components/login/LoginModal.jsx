"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { firebase } from "@/config/firebase";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import url from "@/config/axios";
import ScaleLoader from "react-spinners/ScaleLoader";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function LoginModal({ open, setOpen, setIsUser }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [btnLoad, setBtnLoad] = useState(false);
  const history = useRouter();
  const path = usePathname();

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async () => {
    console.log(email);
    if (email === "" || password === "")
      return toast.error("Email or Password Must Be Required.");

    if (email && password) return signInWithEmailAndPasswordFirebase();
  };

  const signInWithEmailAndPasswordFirebase = async () => {
    setBtnLoad(true);
    // console.log(email);
    // console.log(password);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const idTokenResult = await firebase
        .auth()
        .currentUser.getIdTokenResult();
      console.log(idTokenResult.token);
      getlogin(idTokenResult.token);
    } catch (e) {
      console.log(e);
      setBtnLoad(false);

      Swal.fire({
        icon: "warning",
        title: "Invalid Email or Password.",
        text: "Please enter a valid email or password",
        confirmButtonColor: "#EAAB0C",
        confirmButtonText: "Back to Login",
        customClass: {
          popup: "custom-swal-bg",
        },
      });
    }
  };

  const getlogin = (t) => {
    setBtnLoad(true);

    // return console.log(ELBody);
    url
      .get("/accounts/user-info", {
        headers: {
          Authorization: "Bearer " + t,
        },
      })
      .then(async (res) => {
        // return console.log(res.data);
        setBtnLoad(false);
        setIsUser(res.data?.users[0]);
        localStorage.setItem("user", JSON.stringify(res.data?.users[0]));
        await history.push("/profile");
        toast.success("Account successfully Login.");
        handleClose();
      })
      .catch((e) => {
        console.log(e);
        setBtnLoad(false);
        // toast.success(e.response.data.data.message);
      });
  };

  //   const handleLogin = async () => {
  //     setBtnLoad(true);
  //     const formData = {
  //       email,
  //       password,
  //     };
  //     url
  //       .post(`/services/filtered-services/`, formData)
  //       .then(async (res) => {
  //         localStorage.setItem("user", JSON.stringify(res.data));
  //         Swal.fire({
  //           icon: "success",
  //           title: "Loggedin SuccessFully",
  //           text: "Account successfully Login.",
  //           confirmButtonColor: "#EAAB0C",
  //           timer: 1000, // Display for 1 second (1000 ms)
  //           showConfirmButton: false, // Hide the confirm button
  //         });
  //         setBtnLoad(false);
  //         handleClose();
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //         setBtnLoad(false);
  //         Swal.fire({
  //           icon: "warning",
  //           title: "Invalid Email or Password.",
  //           text: "Please enter a valid email or password",
  //           confirmButtonColor: "#EAAB0C",
  //           confirmButtonText: "Back to Login",
  //         });
  //       });
  //   };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Welcome Back! Please Log In to Continue
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField
            margin="dense"
            label="Email Address"
            placeholder="Enter your email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            placeholder="Enter your password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Remember me"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            fullWidth
          >
            {btnLoad ? <ScaleLoader color="#eab308" /> : "  Log In"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
