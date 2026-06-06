import React, { useState,useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import './ui/responsive.css';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { to } from 'react-spring';
import { toast } from 'react-toastify'



const DfoodForm = () => {

  const defaultTheme = createTheme();
  const navigate = useNavigate();

  const [address,setAddress]=useState('');
  const [pincode,setPincode]=useState('');
  const [state,setState]=useState('');
  const [city,setCity]=useState('');
  const [organization,setOrganization]=useState('');
  const [description,setDescription]=useState('');
  const [title,setTitle]=useState('Title Here');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET); 
    formData.append('cloud_name', import.meta.env.VITE_CLOUD_NAME); 
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        formData
      );
      return res.data.secure_url;
    } catch (error) {
      console.error('Error uploading image: ', error);
      throw new Error('Error uploading image');
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      toast.error('Geolocation is not supported by this browser.');
    }
  }, []); // Empty dependency array ensures this effect runs only once



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let photoUrl = "";
      if (photo) {
        const cloudName = import.meta.env.VITE_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
        
        if (!cloudName || !uploadPreset) {
          toast.error("Cloudinary config (VITE_CLOUD_NAME or VITE_UPLOAD_PRESET) is missing in client/.env. Configure them or submit without selecting a photo.");
          setLoading(false);
          return;
        }

        toast.info("Uploading food photo...");
        photoUrl = await uploadToCloudinary(photo);
      }

      const payload = {
        address,
        pincode,
        state,
        city,
        organization,
        description,
        photo: photoUrl,
        latitude: String(latitude),
        longitude: String(longitude),
        title
      };

      const response = await axios.post('/api/food/postfood', payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      toast.success('Food Donation successfully');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  return (


  <form onSubmit={handleSubmit}  className='bg-slate-500 border border-slate-200 rounded-md p-8 pt-4 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative w-full max-w-md '>
<ThemeProvider theme={defaultTheme}>
  <Container component="main" maxWidth="s">
    <CssBaseline />
    {/* <Box
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
      > */}
      <Grid container justifyContent="center">
          <Grid item>
            <Typography component="h1" variant="h5" sx={{textAlign:"center", color:"white"}}>
              Donate Food
              </Typography>
              </Grid>
             </Grid>
           <TextField
           onChange={(e)=>{setAddress(e.target.value)}}
           margin="normal"
           required
           fullWidth
           label="Address"
           name="adr"
           autoFocus
           sx={{
            // '& .MuiOutlinedInput-root fieldset': {
            // borderColor: '#FFF',
            // },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFF",
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
        name="pinc"            
          onChange={(e)=>{setPincode(e.target.value)}}
          margin="normal"
          required
          fullWidth
          label="Pincode"
          type="number"
          sx={{
            // '& .MuiOutlinedInput-root fieldset': {
            // borderColor: '#FFF',
            // },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFF",
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
        name="stat"              
        onChange={(e)=>{setState(e.target.value)}}
           margin="normal"
           required
           fullWidth
           label="State"
          //  autoFocus
           sx={{
            // '& .MuiOutlinedInput-root fieldset': {
            // borderColor: '#FFF',
            // },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFF",
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
        name="cty"              
        onChange={(e)=>{setCity(e.target.value)}}
           margin="normal"
           required
           fullWidth
           label="City"
          //  autoFocus
           sx={{
            // '& .MuiOutlinedInput-root fieldset': {
            // borderColor: '#FFF',
            // },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFF",
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
        name="org"              
        onChange={(e)=>{setOrganization(e.target.value)}}
           margin="normal"
           required
           fullWidth
           label="Organization"
          //  autoFocus
           sx={{
            // '& .MuiOutlinedInput-root fieldset': {
            // borderColor: '#FFF',
            // },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFF",
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
         name="desc"              
         onChange={(e)=>{setDescription(e.target.value)}}
           margin="normal"
           required
           fullWidth 
           label="Description"
           type='text'
          //  autoFocus
           sx={{
            // '& .MuiOutlinedInput-root fieldset': {
            // borderColor: '#FFF',
            // },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFF",
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
        name="heading"              
        onChange={(e)=>{setTitle(e.target.value)}}
           margin="normal"
           required
           fullWidth
           
           label="Title"
           type='text'
          //  autoFocus
           sx={{
            // '& .MuiOutlinedInput-root fieldset': {
            // borderColor: '#FFF',
            // },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFF",
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
        name="lat"              
        onChange={(e)=>{setLatitude(e.target.value)}}
           value={latitude || ''}
           margin="normal"
           required
           fullWidth
           label="Latitude"
          //  autoFocus
           sx={{
            // '& .MuiOutlinedInput-root fieldset': {
            // borderColor: '#FFF',
            // },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFF",
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
        value={longitude || ''}
        name="long"              
        onChange={(e)=>{setLongitude(e.target.value)}}
           margin="normal"
           required
           fullWidth
           label="Longitude"
          //  autoFocus
           sx={{
            // '& .MuiOutlinedInput-root fieldset': {
            // borderColor: '#FFF',
            // },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFF",
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
          name="pic"              
          onChange={(e)=>{setPhoto(e.target.files[0])}}
          margin="normal"
          fullWidth
          type='file'
          InputLabelProps={{ shrink: true }}
          label="Food Photo (Optional)"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFF",
              },
            "& .MuiOutlinedInput-root": {
              '&.Mui-focused': {
                bgcolor: "#FFFFFF",
                borderWidth: "3px",
              },
            },
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0892d0",
                borderWidth: "3px",
              },
            },
            "& .MuiInputLabel-outlined": {
              "&.Mui-focused": {
                color: "#0892d0",
                fontWeight: "bold",
              },
              color: "#FFF",
            },
            "& .MuiInputBase-input": {
              color: "#FFF",
            }
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? "Donating..." : "Donate Food"}
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link to="/GetFood" variant="body2">
              {"Get food"}
            </Link>
          </Grid>
        </Grid>
      {/* </Box>
    </Box> */}
    {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
  </Container>
</ThemeProvider>
</form>

  );
};

export default DfoodForm;
