/*
  Helper component for userProfile to display all messages attached to a given user.

  -Matthew A. Davis
*/

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import {
  useQuery
} from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../common/providers/authContext";
import { useQueryContext } from "../common/providers/queryContext";

import messages from "../common/utils/testMessages";
import { getUserMessages } from "./profileCalls";

//Helper function to display message contents.
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export const UserMessages = () => {
  //index of tab that's open
  const [value, setValue] = React.useState(0);

  const { state, isAuthenticated } = useAuthContext();
  const { queryClient } = useQueryContext();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['messages', state.id],
    queryFn: () => getUserMessages(queryClient, state.id),
  })

  if ( isPending ) {
    console.log(state)
    return(
      <>
      </>
    )
  }

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "75vh" }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {data?.map((message, key) => (
          <Tab label={`Message from ${message.sender.account.first_name} ${message.sender.account.last_name}`} key={key} {...a11yProps(key)} />
        ))}
      </Tabs>
      {data?.map((message, key) => (
        <TabPanel value={value} index={key} sx={{ flexGrow: 1 }}>
          <Box >
            <Typography variant="h4" sx={{padding: "6px"}}>
              {`Message from ${message.sender.account.first_name} ${message.sender.account.last_name} on ${new Date(message.timestamp).toLocaleDateString()}`}
            </Typography>
            <Button variant="contained" onClick={() => navigate(`/listings/${message.advert.id}`)} >
              Go to Listing
            </Button>

            <Divider sx={{padding: "6px"}} sx={{padding: "6px"}} />

            <Typography variant="h6" sx={{padding: "6px"}}>
              {message.contents}
            </Typography>
          </Box>
        </TabPanel>
      ))}
    </Box>
  );
}

export default UserMessages;
