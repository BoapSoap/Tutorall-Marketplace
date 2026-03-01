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

import { useLocation, useNavigate } from "react-router";
import axios from "axios";

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

export function SearchTutors() {
  let navigate = useNavigate();
  const { state } = useLocation();

  const initialTutors = Array.isArray(state?.tutors) ? state.tutors : [];
  const [tutors, setTutors] = React.useState(initialTutors);

  const [loading, setLoading] = React.useState(false);
  //const [search, setSearch] = React.useState("")

  async function getAdverts(search) {
    try {
      const response = await axios.get(`https://3.216.62.166:443/adverts/?courses=${search}&catagories=`);
      console.log(response);
      return response.data
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSearch(search) {
    setLoading(true);
    const data = await getAdverts(search);
    setTutors(data)
    setLoading(false);
    //navigate("/search_results", { state: { tutors } });
  }

  if (loading){
    return(
      <>
      </>
    )
  }

  return (
    <Box className="interface" sx={{ flexGrow: 1 }}>
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
            
            {/* Supposed to display search results */}
            {tutors.map((tutor) => (
                <Box key={tutor.id} sx={{ border: '1px solid grey', borderRadius: 2, p: 2, mb: 2 }}>
                    <h4>{tutor.users.name}</h4>
                    <ul>
                        {tutor.courses.map((course) => (
                            <li key={course.id}>{course.name}</li>
                        ))}
                    </ul>
                </Box>
            ))}

            {/* Search results placeholder */}
            <Box sx={{ display: 'flex', mt: 3 }}>
                <Box onClick={()=> {navigate("/profile")}} sx={{ border: '1px solid grey', borderRadius: 2, p: 2, mb: 2 }}>
                    <img className="pfp" src="https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png" alt="Tutor Profile" />
                    <h4>Tutor</h4>
                    <ul>
                        <li>Class1</li>
                        <li>Class2</li>
                        <li>Class3</li>
                    </ul>
                    <p>$##</p>
                </Box>
                <Box onClick={()=> {navigate("/profile")}} sx={{ border: '1px solid grey', borderRadius: 2, p: 2, mb: 2 }}>
                    <img className="pfp" src="https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png" alt="Tutor Profile" />
                    <h4>Tutor</h4>
                    <ul>
                        <li>Class1</li>
                        <li>Class2</li>
                        <li>Class3</li>
                    </ul>
                    <p>$##</p>
                </Box>
                <Box onClick={()=> {navigate("/profile")}} sx={{ border: '1px solid grey', borderRadius: 2, p: 2, mb: 2 }}>
                    <img className="pfp" src="https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png" alt="Tutor Profile" />
                    <h4>Tutor</h4>
                    <ul>
                        <li>Class1</li>
                        <li>Class2</li>
                        <li>Class3</li>
                    </ul>
                    <p>$##</p>
                </Box>
                <Box onClick={()=> {navigate("/profile")}} sx={{ border: '1px solid grey', borderRadius: 2, p: 2, mb: 2 }}>
                    <img className="pfp" src="https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png" alt="Tutor Profile" />
                    <h4>Tutor</h4>
                    <ul>
                        <li>Class1</li>
                        <li>Class2</li>
                        <li>Class3</li>
                    </ul>
                    <p>$##</p>
                </Box>
                <Box onClick={()=> {navigate("/profile")}} sx={{ border: '1px solid grey', borderRadius: 2, p: 2, mb: 2 }}>
                    <img className="pfp" src="https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png" alt="Tutor Profile" />
                    <h4>Tutor</h4>
                    <ul>
                        <li>Class1</li>
                        <li>Class2</li>
                        <li>Class3</li>
                    </ul>
                    <p>$##</p>
                </Box>
                <Box onClick={()=> {navigate("/profile")}} sx={{ border: '1px solid grey', borderRadius: 2, p: 2, mb: 2 }}>
                    <img className="pfp" src="https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png" alt="Tutor Profile" />
                    <h4>Tutor</h4>
                    <ul>
                        <li>Class1</li>
                        <li>Class2</li>
                        <li>Class3</li>
                    </ul>
                    <p>$##</p>
                </Box>
            </Box>
        </Box>
    </Box>
  );
}

export default SearchTutors;
