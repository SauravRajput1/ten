import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Box, IconButton, Button, Tooltip, Typography, Menu, MenuItem, Breadcrumbs, Link } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import jsPDF from 'jspdf';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleExportClick = () => {
    const token = localStorage.getItem("access_token");
    const projectId = localStorage.getItem("project_id");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/export_report_api?project_id=${projectId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    })
    .then(data => {
      generatePDF(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();

    doc.text("Project Name: " + data.project_name, 10, 10);
    
    doc.text("Scope:", 10, 20);
    data.scope.forEach((item, index) => {
      doc.text(`${index + 1}. ${item}`, 10, 30 + (index * 10));
    });

    doc.text("Problem Statement: " + data.problem_statement, 10, 70);

    doc.text("Tech Stack Recommendation:", 10, 80);
    let yOffset = 90;
    for (const [key, value] of Object.entries(data.tech_stack_recommendation)) {
      doc.text(`${key}:`, 10, yOffset);
      for (const [tech, desc] of Object.entries(value)) {
        doc.text(`- ${tech}: ${desc}`, 10, yOffset + 10);
        yOffset += 10;
      }
      yOffset += 10;
    }

    doc.text("User Groups:", 10, yOffset);
    data.user_groups.forEach((group, index) => {
      doc.text(`${index + 1}. ${group.title}: ${group.description.join(", ")}`, 10, yOffset + 10);
      yOffset += 10;
    });

    yOffset += 10;
    doc.text("Features:", 10, yOffset);
    data.features.forEach((feature, index) => {
      doc.text(`${index + 1}. ${feature.title}: ${feature.description}`, 10, yOffset + 10);
      yOffset += 10;
    });

    doc.save("report.pdf");
  };

  return (
    <>
      <Box position="relative"
        component="header"
        display="flex"
        gap={2}
        justifyContent="space-between"
        alignItems="center"
        whiteSpace="nowrap"
        className="pt-3 pb-3 bg-white relative left-0 right-0 pr-6 top-0 mb-5"
      >

        <Box role="presentation">
          <Breadcrumbs maxItems={4} aria-label="breadcrumb">
            <Link sx={{ fontSize: '0.875rem', border: '1px solid var(--grey)', padding: '5px 12px', borderRadius: '16px' }} underline="hover" color="inherit" href="#">
              <HomeOutlinedIcon sx={{ fontSize: '20px', marginRight: '5px', marginBottom: '3px' }} />
              Home
            </Link>
            <Link sx={{ fontSize: '0.875rem', border: '1px solid var(--grey)', padding: '5px 12px', borderRadius: '16px' }} underline="hover" color="inherit" href="#">
              Create Project
            </Link>
            <Link sx={{ fontSize: '0.875rem', border: '1px solid var(--grey)', padding: '5px 12px', borderRadius: '16px' }} underline="hover" color="inherit" href="#">
              User Group
            </Link>
            <Link sx={{ fontSize: '0.875rem', border: '1px solid var(--grey)', padding: '5px 12px', borderRadius: '16px' }} underline="hover" color="inherit" href="#">
              User group & features
            </Link>
            <Link sx={{ fontSize: '0.875rem', border: '1px solid var(--grey)', padding: '5px 12px', borderRadius: '16px' }} underline="hover" color="inherit" href="#">
              Tech Stack Preferences
            </Link>
            <Typography sx={{ fontSize: '0.875rem', border: '1px solid var(--grey)', padding: '5px 12px', borderRadius: '16px' }} color="text.primary">Tech Stack Recommendations</Typography>
          </Breadcrumbs>
        </Box>

        <Box gap={2} sx={{ display: 'flex' }}>
          <Button className='text-sm gap-1 normal-case text-black border-grey border-2 py-2 px-3 hover:bg-primary hover:text-white shadow-custom font-semibold hover:border-2 rounded-lg' variant="outlined" size="medium" 
          endIcon={<CloudDownloadOutlinedIcon 
            onClick={handleExportClick}
            />}>
            
            Export
          </Button>
          <Box
            display="flex"
            gap={1}
            alignItems="center"
            textAlign="center"
            color="white"
            fontSize="1rem"
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 35,
                    width: 35,
                    fontSize: '1rem',
                  }}
                  className='bg-[#12FB61]'
                >
                  A
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default Header;
