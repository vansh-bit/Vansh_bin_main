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
  const [photo,setPhoto]=useState();
  const [description,setDescription]=useState('');
  const [title,setTitle]=useState('Title Here');

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

  // Function to handle button click event
  // const handleButtonClick = () => {
  //   // Re-fetch the geolocation
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       setLatitude(position.coords.latitude);
  //       setLongitude(position.coords.longitude);
  //       setError(null); // Clear any previous errors
  //     },
  //     (error) => {
  //       setError(error.message);
  //     }
  //   );
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //    const res =  await axios.post("api/food/getfood",
  //     {
  //       address,pincode,state,city,photo,description,organization,latitude,longitude
  //     }, 
  //     {
  //       withCredentials: true,
  //     }
  //   );
  //     console.log(res);
  //     console.log("sucess in form")
  //   } catch (e) {
  //     console.log(e);
  //     console.log("falide in posting form");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const photoUrl = await uploadToCloudinary(photo);
      const formDataToSend = new FormData();
      formDataToSend.append('address', address);
      formDataToSend.append('pincode', pincode);
      formDataToSend.append('state', state);
      formDataToSend.append('city', city);
      formDataToSend.append('organization',organization);
      formDataToSend.append('description', description);
      formDataToSend.append('photo', photoUrl);
      formDataToSend.append('latitude', latitude);
      formDataToSend.append('longitude', longitude);
      formDataToSend.append('title', title);
      const response = await axios.post('/api/food/postfood', formDataToSend,
       {
       headers: {
        'Content-Type': 'application/json' 
      }
       },
      {
        withCredentials: true,
      });
      console.log(response.data);
      toast.success('Food Donation successfully');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    // <form onSubmit={handleSubmit} action="POST">
    //   <div className='flex justify-center items-center h-[70vh] w-3/4'>
    //   <div className='bg-slate-800 border border-slate-200 rounded-md p-8 pt-4 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative w-full max-w-md '>
    //     <h1 className='text-4xl text-white font-bold text-center mb-6'>Donate Food</h1>
    //       <div className='relative my-4'>
    //         <input
    //           type="text"
    //           name="adr"
    //           onChange={(e)=>{setAddress(e.target.value)}}
    //           className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer'
    //           placeholder="Address" 
    //         />
    //       </div>
          
    //       <div className='relative my-4'>
    //         <input
    //           type="number"
    //           name="pinc"            
    //           onChange={(e)=>{setPincode(e.target.value)}}
    //           className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer'
    //           placeholder="Pincode"
    //         />
    //       </div>
          
    //       <div className='relative my-4'>
    //         <input
    //           type="text"
    //           name="stat"              
    //           onChange={(e)=>{setState(e.target.value)}}
    //           className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer'
    //           placeholder="State"
    //         />
    //       </div>
          
    //       <div className='relative my-4'>
    //         <input
    //           type="text"
    //           name="cty"
    //           onChange={(e)=>{setCity(e.target.value)}}
    //           className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer'
    //           placeholder="City"
    //         />
    //       </div>
          
    //       <div className='relative my-4'>
    //         <input
    //           type="text"
    //           name="org"
    //           onChange={(e)=>{setOrganization(e.target.value)}}
    //           className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer'
    //           placeholder="Organization (if applicable)"
    //         />
    //       </div>

    //       <div className='relative my-4'>
    //         <input
    //           type="text"
    //           name="title"
    //           onChange={(e)=>{setTitle(e.target.value)}}
    //           className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer'
    //           placeholder="title"
    //         />
    //       </div>
          
    //       <div className='relative my-7'>
    //         <input
    //           type="file"
    //           name="pic"
    //           onChange={(e)=>{setPhoto(e.target.files[0])}}
    //           className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer'
    //           placeholder=" "
    //         />
    //         <label htmlFor="photo" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3   peer-focus:scale:75 peer-focus:-translate-y-6'>Upload Photo</label>
    //       </div>
          
    //       <div className='relative my-8'>
    //         <textarea
    //           className='relative block w-full py-3.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 resize-none peer'
    //           rows="4"
    //           name="desc"
    //           onChange={(e)=>{setDescription(e.target.value)}}
    //           placeholder="Description"
    //         ></textarea>
    //         <label htmlFor="description" className='absolute text-sm text-white duration-300 transform -translate-y-8 scale-75 top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3   peer-focus:scale:75 peer-focus:-translate-y-6'>Description</label>
    //       </div>

    //       <div className='relative my-4'>
    //         <input
    //           type="text"
    //           name="lat"
    //           value={latitude}
    //           className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer'
    //           placeholder="latitude"
    //         />
    //       </div>
    //       <div className='relative my-4'>
    //         <input
    //           type="text"
    //           name="long"
    //           value={longitude}
    //           className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer'
    //           placeholder="longitude"
    //         />
    //       </div>
          
    //       <div className="flex justify-between">
    //         <button type="button" className='w-1/2 ml-2 mr-4 text-lg rounded-full bg-white text-emerald-800 hover:bg-red-600 hover:text-white py-3 transition-colors duration-300'><Link to='/'>Cancel</Link></button>
    //         <button type="submit" onSubmit={handleSubmit} className='w-1/2 mr-2 text-lg rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-3 transition-colors duration-300'>Donate Food</button>
    //       </div>

    //     <span className='mt-4 block text-center'><Link to='/RFood' className='text-white-500 hover:text-blue-500'>Request Food</Link></span>
    //   </div>
    // </div>
    // </form>

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
        name="pic"              
        onChange={(e)=>{setPhoto(e.target.files[0])}}
           margin="normal"
           required
           fullWidth
           //label="Photo"
           type='file'
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
           value={latitude}
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
        value={longitude}
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onSubmit={handleSubmit}
        >
          Donate Food
            {/*icon*/}
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
