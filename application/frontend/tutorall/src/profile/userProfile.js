/*
  Primary component for user profiles. Imports components UserAdverts and UserMessages to display within the webpage without having to change route.

  -Matthew A. Davis
*/
import * as React from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import UserAdverts from "./userAdverts";
import UserMessages from "./userMessages";

import { useNavigate } from 'react-router';

import { useAuthContext } from "../common/providers/authContext"
import { useLogout } from "../common/utils/utils";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2, maxHeight: "100%", height: "100%", flexGrow: 1 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const ProfilePage = () => {
  //Index for currently open tab
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();
  const { logout } = useLogout();
  const { state } = useAuthContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: "column" }}>
      <Box sx={{ backgroundColor: 'secondary.main' }}>
        <Grid container sx={{ flexGrow: 1, justifyContent: "space-around", alignItems: "center",}}>
          <Grid size={12}>
            <Typography variant="h4" component="div" sx={{ textAlign: "center" }}>
               {`Welcome ${state?.first_name} ${state?.last_name}`}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
              <Tab label="My Listings" {...a11yProps(0)} />
              <Tab label="My Messages" {...a11yProps(1)} />
              <Tab label="Create a Listing" onClick={() =>  navigate("/listing_creation")} />
              <Tab label="Logout" onClick={logout} />
            </Tabs>
          </Grid>
        </Grid>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/*UserAdverts displays this user's pending and approved listings*/}
        <UserAdverts />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/*UserMessages displays this user's messages*/}
        <UserMessages />
      </CustomTabPanel>
    </Box>
  );

}

export default ProfilePage;
