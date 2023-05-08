import React from "react";
import FeatherIcon from "feather-icons-react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import PropTypes from "prop-types";
import SearchDD from "./SearchDD";
import ProfileDD from "./ProfileDD";

const Header = () => {

  return (
    <AppBar sx={{ backgroundColor:"#FBFBFB",
     right:0 ,
     left:'20%',
     width:'80%'}} position='fixed' left='800' elevation={0}    >
   <Toolbar>
   
<Box flexGrow={1} />
<ProfileDD />
    </Toolbar>     
    </AppBar>
  )
}

export default Header
