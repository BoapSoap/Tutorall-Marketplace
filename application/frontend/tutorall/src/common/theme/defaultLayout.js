/*
Default layout component for application. Provides a base layout to wrap all other components. Responsive for smaller screens.

<Outlet /> is react-router component to render nested routes.

-Matthew A. Davis
*/

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
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { Outlet, useNavigate, useParams, useLocation } from 'react-router';
import { useAnalytics } from "@keiko-app/react-google-analytics";

import {
  useQueryClient,
  useQuery
} from '@tanstack/react-query'

import { useLocalStoreContext } from "../providers/localStore";
import { useAuthContext } from "../providers/authContext";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '250',
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
      width: '20ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 64,
  },
}));

export function DefaultLayout() {

  let navigate = useNavigate();
  let location = useLocation();
  const { tracker } = useAnalytics();
  let params = useParams()
  const { categories } = useLocalStoreContext();
  const { isAuthenticated } = useAuthContext();
  const [category, setCategory] = React.useState(params.categories ? params.categories.replace("%20", " ") : "")
  const [courses, setCourses] = React.useState(params.courses ? params.courses.replace("%20", " ") : "")

  React.useEffect(() => {
    tracker.trackPageView({});
  }, [location, tracker]);

  const handleCategory = (e) => {
    setCategory(e.target.textContent);
  }

  const handelCourses = (e) => {
    setCourses(e.target.value)
  }

  //Routing for different search parameters, bypasses optional parameter problems
  const handleSearch = (e) => {
    if (e.keyCode == 13) {
      if (courses && category) {
        navigate(`/search/${category}/${courses}`)
      } else if (courses && !category ) {
        navigate(`/search/filler/${courses}`)
      } else if (!courses && category ) {
        navigate(`/search/${category}`)
      } else {
        navigate(`/search/`)
      }
    }
  }

  //Query for AppBar categories


  return(
    <Box className="interface" sx={{ flexGrow: 1, height: '100vh', display:'flex' }}>
      <AppBar position="sticky" color="secondary">
        <StyledToolbar>
          <Grid container sx={{ flexGrow: 1, justifyContent: "space-around", alignItems: "center",}}>
            <Grid size={12}>
              <Typography variant="caption" component="div" sx={{ textAlign: "center" }}>
                 SFSU Software Engineering Project CSC 648-848, Fall 2025. For Demonstration Only
              </Typography>
            </Grid>

            <Grid size={3}>
              <Link
                variant="h6"
                component="button"
                sx={{ paddingRight: "5px"}}
                color="inherit"
                underline="none"
                onClick={() => navigate(``)}
              >
                TutorAll
              </Link>
            </Grid>
            <Grid size={6}>
              <Grid container sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center",}}>
                <Grid size={3}>
                  <Autocomplete
                    disablePortal
                    options={categories.data ? categories.data.map((category) => {return category.name}) : []}
                    fullWidth
                    onChange={handleCategory}
                    renderInput={(params) => <TextField {...params} defaultValue={categories} label="Major" variant="standard" disabled={categories.isPending} />}
                    />
                </Grid>
                <Grid size={7}>
                  <Search sx={{ width: 250 }}>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="CSC 848, CSC 648..."
                      defaultValue={courses}
                      inputProps={{ 'aria-label': 'search', maxLength: 40 }}
                      onChange={handelCourses}
                      onKeyDown={handleSearch}
                    />
                </Search>
                </Grid>
                <Grid size={2}>
                  <Button
                    onClick={() => handleSearch({keyCode: 13})}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid size={3}>
              <Button color="inherit" onClick={() =>  navigate("/about")}>About</Button>
              <Button color="inherit" onClick={() =>  navigate("/listing_creation")}>Create a Listing</Button>
              {isAuthenticated() ?
                <IconButton onClick={() => navigate(`/profile`)}>
                  <AccountCircle />
                </IconButton>
                :
                <Button color="inherit" onClick={() =>  navigate("/signin")}>Sign In</Button>
              }

            </Grid>
          </Grid>
        </StyledToolbar>
      </AppBar>

      {/*Grid provides primary viewport. Forced to not overlap with AppBar to enforce consistent behavior*/}
      <Grid container style={{ flexGrow: 1, maxHeight: "calc(100vh - 64px)"  }}>
        <Grid size={12} style={{ flexGrow: 1, display: 'flex', padding: '10px',   }}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  )
};

export default DefaultLayout;
