import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import HowToRegIcon from "@mui/icons-material/HowToReg"; //icon in submit
import axios from "axios";
import { toast } from 'react-toastify';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .post("/api/users/isloggedin", {}, { withCredentials: true })
      .then((response) => {
        if (response.data.data.verifiedObj.verified) {
          console.log(response.data.data.user);
          setIsLoggedIn(true);
          setUser(response.data.data.user);
        } else {
          // console.log("Not logged In");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const obj = {
      fullName: data.get("fullName"),
      email: data.get("email"),
      mobileNo: data.get("mobileNo"),
      password: data.get("password"),
    };

    try {
      const response = await axios.post("/api/users/register", obj, {
        withCredentials: true,
      });
      console.log("Response:", response.data);
      toast.success("Registration Successfull ,Login to continue");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 409) {
        // Status code 409: Conflict
        toast.error("A user with the provided email already exists. Please use a different email.");
      } else {
        // For other status codes or unknown errors
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // Reset error when password changes
    setError("");
    // Update button disabled state based on match
    setIsButtonDisabled(event.target.value !== confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    // Validate on every change
    setError(event.target.value !== password ? "Passwords must match" : "");
    // Update button disabled state based on match
    setIsButtonDisabled(event.target.value !== password);
  };

  return (
    <Grid container  spacing={0} sx={{
      // mt: 2,
      // zIndex : 0,
      backgroundImage: `url("https://wallpaper-house.com/data/out/10/wallpaper2you_373651.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height:"92vh"
    }}>
  {/* <Grid
    item
    xs={12}
    md={7}
    display="flex"
    alignItems="center"
    justifyContent="center"
    sx={{
      // mt: 2,
      zIndex : 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  > */}
    {/* Add optional placeholder content if needed */}
    {/* <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <h2>Image Placeholder</h2>
        <p>Content appears here when a background image is not provided.</p>
      </Grid>
    </Grid> */}
  {/* </Grid> */}
  <Grid className='backdrop-filter backdrop-blur-sm bg-opacity-30' item xs={12} sx={{zIndex : 1, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',}}>
    <Paper variant="outlined"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          padding: 5,
        }}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
    <Box
      sx={{
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
        Sign Up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              sx={{
            // '& .MuiOutlinedInput-root fieldset': {
            // borderColor: '#000',
            // },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000",
              },
            "& .MuiOutlinedInput-root": {
            '&.Mui-focused': {
              
              bgcolor: "#FFFFFF",
              borderWidth: "3px",
              
            },   },
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0892d0",
                borderWidth: "3px",
              },
            },
            "& .MuiInputLabel-outlined": {
              "&.Mui-focused": {
                color: "#0892d0",
                fontWeigth:"bold",
              },
            },
          }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              type="email"
              name="email"
              autoComplete="email"
              sx={{
            // '& .MuiOutlinedInput-root fieldset': {
            // borderColor: '#000',
            // },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000",
              },
            "& .MuiOutlinedInput-root": {
            '&.Mui-focused': {
              
              bgcolor: "#FFFFFF",
              borderWidth: "3px",
              
            },   },
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0892d0",
                borderWidth: "3px",
              },
            },
            "& .MuiInputLabel-outlined": {
              "&.Mui-focused": {
                color: "#0892d0",
                fontWeigth:"bold",
              },
            },
          }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={handlePasswordChange}
              sx={{
            // '& .MuiOutlinedInput-root fieldset': {
            // borderColor: '#000',
            // },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000",
              },
            "& .MuiOutlinedInput-root": {
            '&.Mui-focused': {
              
              bgcolor: "#FFFFFF",
              borderWidth: "3px",
              
            },   },
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0892d0",
                borderWidth: "3px",
              },
            },
            "& .MuiInputLabel-outlined": {
              "&.Mui-focused": {
                color: "#0892d0",
                fontWeigth:"bold",
              },
            },
          }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              sx={{
            // '& .MuiOutlinedInput-root fieldset': {
            // borderColor: '#000',
            // },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000",
              },
            "& .MuiOutlinedInput-root": {
            '&.Mui-focused': {
              
              bgcolor: "#FFFFFF",
              borderWidth: "3px",
              
            },   },
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0892d0",
                borderWidth: "3px",
              },
            },
            "& .MuiInputLabel-outlined": {
              "&.Mui-focused": {
                color: "#0892d0",
                fontWeigth:"bold",
              },
            },
          }}
              onChange={handleConfirmPasswordChange} //password match check
              error={!!error} 
              helperText={error}  
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="mobileNo"
              label="Mobile No."
              type="tel"
              id="mobileNo"
              sx={{
            // '& .MuiOutlinedInput-root fieldset': {
            // borderColor: '#000',
            // },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000",
              },
            "& .MuiOutlinedInput-root": {
            '&.Mui-focused': {
              
              bgcolor: "#FFFFFF",
              borderWidth: "3px",
              
            },   },
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0892d0",
                borderWidth: "3px",
              },
            },
            "& .MuiInputLabel-outlined": {
              "&.Mui-focused": {
                color: "#0892d0",
                fontWeigth:"bold",
              },
            },
          }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color = "success"
          sx={{ mt: 3, mb: 2 }}
          disabled={isButtonDisabled}
        >
         Sign Up <HowToRegIcon sx={{marginLeft: 0.5,}}/> {/*icon*/}
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
    {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </Paper>
  </Grid>
</Grid>





//     <Paper
       
//           >
//     <ThemeProvider theme={defaultTheme}>
//       <Container  maxWidth="xs">
    
//       </Container>
//     </ThemeProvider>
// </Paper>
);
}
