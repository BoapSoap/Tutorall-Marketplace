// About page of developer Justine Tenorio - Zainab Abbasi
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

export function AboutJustine() {
  let navigate = useNavigate();
  return (
    <Box className="interface" sx={{ flexGrow: 1 }}>
      <div className='developer'>
        <h1>Justine Tenorio</h1>
        <h2>AWS Manager</h2>
        <img className='dev-image' src='https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png' alt='Developer' />
        <p>
      Senior Comp Sci Student @ SFSU with a strong background in C/C++, Lua, Java, Python and
      Linux. I enjoy working on hands-on projects with Raspberry Pi, Arduino, and 3D printing.
      Passionate low-level programming and embedded Linux systems, I'm always looking for
      more opportunities to expand my skillset and knowledge in order to be a more effective
      developer.
      </p>
        <a href='https://www.linkedin.com/in/jtenorio22/' target='_blank'>LinkedIn</a>
        <a href='https://github.com/tatinCode' target='_blank'>GitHub</a>
      </div>
    </Box>
  );
}

export default AboutJustine;
