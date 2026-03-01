// Profile page. The profile of tutors. View, manage, see status of adverts - Zainab Abbasi
// import 'App.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function Profile() {
    let navigate = useNavigate();
    // Visibility state
    const [visible, setVisible] = useState(false);

    // Toggle visibility via clicking
    const handleClick = () => {
        setVisible(!visible);
    };

    return (
        <Box className="interface" sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" color="secondary">
            {/* Bar to see profile and messages */}
            <Toolbar>
                <Button color="inherit" onClick={() => navigate("/profile")}>View Posts</Button>
            </Toolbar>
            <Toolbar>
                <Button color="inherit" onClick={() => navigate("/messages")}>Messages</Button>
            </Toolbar>
        </AppBar>
        <Box className="interface" sx={{ flexGrow: 1, p: 2 }}>
          <Typography variant="h4" gutterBottom>
              SITE FOR CLASS CSC 648/848 PURPOSES ONLY. NOT FOR COMMERCIAL USE.
          </Typography>
          <Typography variant="h4" gutterBottom>
              TEAM 04 SUBMISSION
          </Typography>
            <Typography variant="h4" gutterBottom>
                Search Results
            </Typography>

            {/* Adverts placeholder */}
            <Box onClick={handleClick} sx={{ display: 'flex', mt: 3 }}>
                <Box sx={{ border: '1px solid grey', borderRadius: 2, p: 2, mb: 2 }}>
                    <h4>Approved</h4>
                    <img className="pfp" src="https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png" alt="Tutor Profile" />
                    <h4>Tutor</h4>
                    <ul>
                        <li>Class1</li>
                        <li>Class2</li>
                        <li>Class3</li>
                    </ul>
                    <p>$##</p>
                    {/* Toggle buttons */}
                    {visible && <Button>View</Button>}
                    {visible && <Button>Remove</Button>}
                </Box>
                <Box sx={{ border: '1px solid grey', borderRadius: 2, p: 2, mb: 2 }}>
                    <h4>Pending Approval</h4>
                    <img className="pfp" src="https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png" alt="Tutor Profile" />
                    <h4>Tutor</h4>
                    <ul>
                        <li>Class1</li>
                        <li>Class2</li>
                        <li>Class3</li>
                    </ul>
                    <p>$##</p>
                    {/* Toggle buttons */}
                    {visible && <Button>View</Button>}
                    {visible && <Button>Cancel</Button>}
                </Box>
            </Box>
        </Box>
    </Box>
  );
}

export default Profile;
