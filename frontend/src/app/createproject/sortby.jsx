import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SwapVertIcon from '@mui/icons-material/SwapVert';

export default function SortProject() {
  return (

    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)} className='flex-shrink-0 w-24 rounded-lg border border-solid border-grey bg-white text-black-200 font-bold text-sm hover:bg-primary-200 hover:text-white m-r shadow-none normal-case h-[40px]'>
            <SwapVertIcon /> Sort
          </Button>
          <Menu {...bindMenu(popupState)} className="w-36 text-sm">
            <MenuItem>Project 1</MenuItem>
            <MenuItem>Project 2</MenuItem>
            <MenuItem>Project 3</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}