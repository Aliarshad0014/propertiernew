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

export default function SignupModal({ open, setOpen, setIsUser }) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [btnLoad, setBtnLoad] = useState(false);
  const history = useRouter();
  const path = usePathname();

  const handleClose = () => {
    setOpen(false);
  };

  const signupWithEmailAndPasswordFirebase = async () => {
    setBtnLoad(true);
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const currentUser = firebase.auth().currentUser;
      const idTokenResult = await currentUser.getIdTokenResult();
      // Call your backend API to store user data
      await saveUserData(idTokenResult.token);
      setBtnLoad(false);
    } catch (error) {
      console.log(error.message);
      setBtnLoad(false);
      if (error.code === "auth/email-already-in-use") {
        toast.error(
          "The email address is already in use by another account. Please sign in or use a different email address."
        );
      } else if (error.code === "auth/weak-password") {
        toast.error(
          "Password should be at least 6 characters long. Please choose a stronger password."
        );
      } else {
        toast.error("Failed to sign up. Please try again later.");
      }
      // Handle error, display appropriate message to the user
    }
  };

  const saveUserData = async (token) => {
    const body = {
      firebase_id: firebase.auth().currentUser.uid,
      name: name,
      email: email,
      type: "customer",
    };

    url
      .post("/accounts/customers/", body, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(async (res) => {
        // return console.log(res.data);
        setBtnLoad(false);
        await history.push("/profile");
        toast.success("Profile Successfully Added");
        handleClose();
      })
      .catch((e) => {
        console.log(e);
        setBtnLoad(false);
        toast.success(e.response.data.data.message);
      });
  };

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
            label="Name"
            placeholder="Enter your Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            onClick={() => {
              signupWithEmailAndPasswordFirebase();
            }}
            variant="contained"
            color="primary"
            fullWidth
          >
            {btnLoad ? <ScaleLoader color="#eab308" /> : "  Signup"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
