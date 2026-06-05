import React,{useState,useEffect} from 'react'
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
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import LoginIcon from '@mui/icons-material/Login'; 
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

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.post('/api/users/isloggedin',{},{withCredentials: true})
    .then(response => {
      if(response.data.data.verifiedObj.verified)
      { 
        // console.log(response.data.data.user);
        setIsLoggedIn(true);
        setUser(response.data.data.user);
      }
      else{
        console.log("Not logged In");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [])
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
      email: data.get("email"),
      password: data.get("password")
    };

    try {
      const response = await axios.post('/api/users/login', obj, { withCredentials: true });
      console.log(response);
      toast.success("Logged In Successfully");
      navigate('/');
    } catch (error) {
      console.error('Error:', error.message);
      toast.error("Invalid credentials");
    }    
  }
  return (
    <Paper
        sx={{
          backgroundImage: `url("https://wallpaper-house.com/data/out/10/wallpaper2you_373651.jpg")`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: "none", //white to none
          boxShadow: "none",
          height: "92vh"
        }}
      >
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "transparent",
              "& .MuiPaper-root": {
                backgroundColor: "transparent", 
                boxShadow: "none",
              },
            }}
          >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{mt: "17vh" }}
          >
          <Grid container justifyContent="center">
              <Grid item>
                <Avatar sx={{ml:2.3,mb:1, bgcolor: "green" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{textAlign:"center" , fontWeight: 'bold'}} >
                  Sign In
                </Typography>
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In <LoginIcon sx={{marginLeft: 1,}}/> {/*icon*/}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  </Paper>
  );
}
