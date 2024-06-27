"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { Box, IconButton, List, ListItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoIcon from "../../../public/assets/images/logo.svg";

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const Menus = [
      { title: "Dashboard", icon: <HomeOutlinedIcon />,  size: 'large' },
      { title: "Notification", icon: <NotificationsNoneIcon /> },
      { title: "Logout", icon: <LogoutIcon /> },
    ];
    return (
    <Box
        className={` ${
          open ? "w-44 max-md:w-32 openSidebar" : "w-14 max-md:w-12 closeSidebar"
        } relative left-0 top-0 bottom-0 bg-primary-400 h-screen p-5 pt-8 z-30 duration-300 px-3 pb-10 max-md:px-1 shadow-[10px_0px_50px_#E8F1FF]`}
      >
        <IconButton aria-label="menu" className={`absolute cursor-pointer -right-3 max-md:-right-4 top-9 w-8 h-8 border-primary-400 bg-primary hover:bg-primary focus:bg-primary text-white border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}>
            <MenuIcon />
        </IconButton>
        <Box className="flex gap-x-4 items-center justify-center">

          <Image
            loading="lazy"
            src={LogoIcon}
            width="100"
            height="100"
            className={` max-md:-mt-7 cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            alt="logo"
          />
          {/* <h1
            className={`origin-left text-3xl font-medium text-black duration-200 max-md:hidden ${
              !open && "scale-0"
            }`} 
          >
            Logo
          </h1> */}
        </Box>
        <List sx={{ paddingTop: 6 }} className='sideMenu'>
          {Menus.map((Menu, index) => (
            <ListItem
              key={index}
              sx={{
                borderRadius: 'md',
                padding: 1,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'lightwhite'
                },
                marginTop: Menu.gap ? 9 : 2,
                ...(index === 0 && { backgroundColor: 'lightwhite' })
              }}
              className="flex items-center text-2xl gap-2 text-grey-200 hover:bg-primary hover:text-white rounded-lg max-md:flex-col"
            >
              {Menu.icon}
              <Typography
                component="span"
                sx={{
                  visibility: open ? 'visible' : 'hidden',
                  transition: 'transform 0.3s'
                }}
                className={`${open ? 'block' : 'hidden'}`}
              >
                {Menu.title}
              </Typography>
            </ListItem>
          ))}
        </List>
        
      </Box>
    );
}