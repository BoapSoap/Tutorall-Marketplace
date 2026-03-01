// About page of developer Zainab Abbasi - Zainab Abbasi
import logo from '../../logo.svg';
import '../../App.css';
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

import { useNavigate } from "react-router";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export function AboutZainab() {
  let navigate = useNavigate();
  return (
    <Box className="interface" sx={{ flexGrow: 1 }}>
      <div className='developer'>
        <h1>Zainab Abbasi</h1>
        <h2>Frontend Lead</h2>
        <img className='dev-image' src='https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png' alt='Developer' />
        <p>Full-stack developer. Frontend lead of the project. Versatile in Computer Science. Pursuing AI.</p>
        <a href='http://www.linkedin.com/in/zabbasi' target='_blank'>LinkedIn</a>
        <a href='https://github.com/Z-ABBASI' target='_blank'>GitHub</a>
      </div>
    </Box>
  );
}

export default AboutZainab;
