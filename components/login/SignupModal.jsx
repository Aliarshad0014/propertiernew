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
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [btnLoad, setBtnLoad] = useState(false);
  const history = useRouter();
  const path = usePathname();

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageChange = (e) => {
    setProfilePicture(e.target.files[0]);
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
    }
  };

  const saveUserData = async (token) => {
    const formData = new FormData();
    formData.append("firebase_id", firebase.auth().currentUser.uid);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);
    formData.append("address", address);
    formData.append("about", about);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("type", "customer");

    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    try {
      const res = await url.post("/accounts/customers/", formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });

      setBtnLoad(false);
      localStorage.setItem("user", JSON.stringify(res.data));
      console.log("Signup user data: " + res.data);
      await history.push("/profile");
      toast.success("Profile Successfully Added");
      handleClose();
    } catch (e) {
      console.log(e);
      setBtnLoad(false);
      toast.error(e.response?.data?.message || "Failed to save user data.");
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Your Account
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
          <TextField
            margin="dense"
            label="Phone Number"
            placeholder="Enter your phone number"
            fullWidth
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Address"
            placeholder="Enter your address"
            fullWidth
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            margin="dense"
            label="About"
            placeholder="Tell us about yourself"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Gender"
            select
            fullWidth
            variant="outlined"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </TextField>
          <div className="flex flex-col mt-3 gap-2">
            <input
              accept="image/jpeg"
              style={{ display: "none" }}
              id="profile-picture-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="profile-picture-upload">
              <Button variant="contained" component="span">
                Upload Profile Picture
              </Button>
            </label>
            {profilePicture && (
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="Profile Picture"
                style={{ width: "150px" }}
              />
            )}
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
          </div>
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
            {btnLoad ? <ScaleLoader color="#eab308" /> : "Signup"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
