// import * as React from "react"
// import { Button } from "@/components/ui/button"
// import {
//   Drawer,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
// } from "@/components/ui/drawer"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"

// export default function VisualizationModal({ isOpen, setIsOpen, title, supTitle, children }) {
//   return (
//     <Drawer shouldScaleBackground={false} open={isOpen} onClose={() => {
//       setIsOpen(false)
//     }}>
//       <DrawerContent>

// {/*         
//       </DrawerContent>
//     <Dialog className="w-full" open={isOpen} onClose={() => {
//       setIsOpen(false)
//     }}> */}
//       {/* <DialogTitle></DialogTitle>
//       <DialogContent className="w-full"> */}

//         <div className="w-full">
//             {children}
//         </div>
// {/* 
//       </DialogContent>
//     </Dialog> */}
//     </DrawerContent>
//     </Drawer>
//   )
// }

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog( {isOpen, setIsOpen,children}) {
  const [open, setOpen] = [isOpen, setIsOpen]

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative',height:"60px" }}>
      
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
              
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Project History: Double Click A Node To Get Into A Check Point.
            </Typography>
          </Toolbar>
        </AppBar>
        {children}
      </Dialog>
    </React.Fragment>
  );
}
