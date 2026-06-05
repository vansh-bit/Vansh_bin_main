import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { new_logo2 } from "../assets";

let pages = [
  { name: "Home", link: "/" },
  { name: "Take Food", link: "/GetFood" },
  { name: "Donate Food", link: "/DFood" },
  { name: "About", link: "/about" },
];

const settings = [];

function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    axios
      .post("/api/users/isloggedin", {}, { withCredentials: true })
      .then((response) => {
        if (response.data.data.verifiedObj.verified) {
          setIsLoggedIn(true);
          setUser(response.data.data.user);
        } else {
          console.log("Not logged In");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Add event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Cleanup by removing the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    // Set isScrolled to true when user scrolls down more than 20 pixels
    if (window.scrollY > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const handleLogout = () => {
    setAnchorElNav(null);
    axios
      .post("/api/users/logout")
      .then((response) => {
        console.log("Logout Successfull");
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
    position="sticky"
    sx={{
      transition: "background-color 0.3s, opacity 0.3s",
      backgroundColor: isScrolled ? "rgb(0,0,0,0.7)" : "#3f9e59", 
      opacity: isScrolled ? 0.7 : 1,
      borderBottom: "5px solid rgba(255, 255, 255, 0.05)",
    }}
  >
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <img src={new_logo2} alt="" className="h-10 w-10 rounded-full m-3"/>
          <Typography
            className="red"
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Bin2Bite
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link
                    to={page.link}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      transition: "color 0.3s, background-color 0.3s", // Add transition for smooth effect
                      ":hover": {
                        // Pseudo-class for hover effect
                        color: "blue", // Change color on hover
                        backgroundColor: "lightblue", // Change background color on hover
                      },
                    }}
                  >
                    {page.name}
                  </Link>
                </MenuItem>
              ))}
               {/* {!isLoggedIn && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to={"/register"}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      transition: "color 0.3s, background-color 0.3s", // Add transition for smooth effect
                    }}
                    hoverStyle={{
                      // Use hoverStyle for pseudo-class hover effect
                      color: "blue", // Change color on hover
                      backgroundColor: "lightblue", // Change background color on hover
                    }}
                  >
                    Register
                  </Link>
                </MenuItem>
              )} */}
              {!isLoggedIn && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to={"/login"}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      transition: "color 0.3s, background-color 0.3s", // Add transition for smooth effect
                    }}
                    hoverStyle={{
                      // Use hoverStyle for pseudo-class hover effect
                      color: "blue", // Change color on hover
                      backgroundColor: "lightblue", // Change background color on hover
                    }}
                  >
                    Login/Register
                  </Link>
                </MenuItem>
              )}

              {isLoggedIn && (<MenuItem onClick={handleLogout}>
                <Link
                  to={"/logout"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    transition: "color 0.3s, background-color 0.3s", // Add transition for smooth effect
                    ":hover": {
                      // Pseudo-class for hover effect
                      color: "blue", // Change color on hover
                      backgroundColor: "lightblue", // Change background color on hover
                    },
                  }}
                >
                  Logout
                </Link>
              </MenuItem>)}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box> {/* Empty Box for spacing */}
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.link}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleCloseNavMenu}
              >
                {page.name}
              </Button>
            ))}
            {/* {!isLoggedIn && (<Button
              component={Link}
              to={"/register"}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={handleCloseNavMenu}
            >
              Register
            </Button>)} */}
            {!isLoggedIn && (<Button
              component={Link}
              to={"/login"}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={handleCloseNavMenu}
            >
              Login
            </Button>)}
            {isLoggedIn && (<Button
              component={Link}
              to={"/logout"}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={handleLogout}
            >
              Logout
            </Button>)}
          </Box>
          <Box sx={{ flexGrow: 0, marginLeft: 3 }}>
            {/* <Tooltip title="Open settings"> */}
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" />
              </IconButton>
            {/* </Tooltip> */}
            {/* <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    
  );
}
export default Navbar;
