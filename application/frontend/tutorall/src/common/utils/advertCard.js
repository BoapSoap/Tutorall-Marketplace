/*
  Helper components for displaying advert cards anywhere in the application.
  Has variations for different locations.

  -Matthew A. Davis
*/

import * as React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

import ArticleIcon from '@mui/icons-material/Article';
import MapIcon from '@mui/icons-material/Map';

const AdvertContent = ({advert}) => {
  //Advert Content is a way to unify content of cards
  return (
    <>
    <CardMedia
      sx={{ height: 150 }}
      image={advert.advert.users.profile_picture}
      title="profile picture"
    />
    <CardContent sx={{minHeight: 100}}>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid size={12}>
          <Typography align='center'> Name: {advert.advert.users.account.first_name} {advert.advert.users.account.last_name} </Typography>
        </Grid>
        <Grid size={12}>
          <Typography align='center'> Price: {advert.advert.price_range}$/hr </Typography>
        </Grid>
        {advert.advert.courses.map((course) => (
          <Grid size={12} key={course.id}>
            <Typography align='center'> {course.name} </Typography>
          </Grid>
        ))}
      </Grid>
    </CardContent>
    </>
  )
};

export const AdvertItem = ({advert}) => {
  //Advert Item is for the Search screen and home page. Places for verified adverts.
  let navigate = useNavigate();
  const getDetails = () => {
    navigate(`/advert`);
  }
  const getMessage = () => {
    navigate(`/messages`);
  }
  return(
    <Card elevation={6}>
      <CardActionArea>
          <AdvertContent advert={{advert}} />
      </CardActionArea>
      <CardActions>
        <Box sx={{flexGrow: 1}} />
        <Button variant="contained" onClick={() => navigate(`/listings/${advert.id}`)}>
          Details
        </Button>
        <Button variant="contained" onClick={() => navigate(`/listings/${advert.id}/messaging`)}>
          Message Tutor
        </Button>
      </CardActions>
    </Card>
  )
}

export const AdvertProfile = ({advert, open, setOpen, setID}) => {
  //Advert Profile is for individual user's adverts.
  let navigate = useNavigate();
  const setConfirmModal = () => {
    setOpen(true);
    setID(advert.id);
    return
  }

  const verifiedHeader = (advert) => {
    if (advert.verified) {
      return (
        <CardHeader title={'Verified'} sx={{ backgroundColor: '#00cc00' }}/>
      )
    } else {
      return (
        <CardHeader title={'Pending'} sx={{ backgroundColor: '#cc0000' }}/>
      )
    }
  }

  const verifiedButtons = (advert) => {
    if (advert.verified) {
      return (
        <>
          <Button variant="contained" onClick={() => navigate(`/listings/${advert.id}`)}>
            Details
          </Button>
          <Button variant="contained" onClick={setConfirmModal}>
            Remove
          </Button>
        </>
      )
    } else {
      return (
        <>
          <Button variant="contained" onClick={() => navigate(`/listings/${advert.id}`)}>
            Details
          </Button>
          <Button variant="contained" onClick={setConfirmModal}>
            Cancel
          </Button>
        </>
      )
    }
  }

  return(
    <Card elevation={6} sx={{ margin: "2px"}}>
      {verifiedHeader(advert)}

      <AdvertContent advert={{advert}} />
      <CardActions>
        {verifiedButtons(advert)}
      </CardActions>
    </Card>
  )
}

export default AdvertItem;
