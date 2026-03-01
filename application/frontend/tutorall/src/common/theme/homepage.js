/*
  Homepage for user to land on initially. Provides mission statement, important buttons, and most recent adverts.

  -Matthew A. Davis
*/
import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {
  useQueryClient,
  useQuery
} from '@tanstack/react-query'

import { getPublicFetch } from "../utils/utils";
import { getAdvertsFiltered } from "../utils/commonCalls";

import AdvertItem from "../utils/advertCard";

export const HomePage = () => {

  const client = getPublicFetch();

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['adverts'],
    queryFn: () => getAdvertsFiltered(client, "", "", "", ""),

  })

  //Render only the last three adverts
  const recentAdverts = (adverts) => {
    const ads = []
    for (var i = 0; i < 5; i++) {
      ads.push(
      <Grid size={{ sm: 2 }}>
        <AdvertItem advert={adverts[(adverts.length - 1 - i)]} />
      </Grid>
      )
    }
    return ads;
  }

  if (isPending) {
    return(
      <>
      </>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ justifyContent: "space-around" }}>
        <Grid size={{ sm: 6 }} >
          {/*This will be Text and Button*/}
          <Box sx={{height: '50%', justifyContent: "center" }} >
            <Stack>
              <Typography variant="h3"> Welcome to Tutorall! </Typography>
              <Typography variant="h6"> We pride ourselves on the ability to bring SFSU students together as both avid learners and active teachers! Whether you need to study for a test, want to learn more, or wish to help others, we have you covered. </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid size={{ sm: 6 }}>
          {/*This will be static image*/}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center"}}>
            <Box component="img" sx={{height:"100%", width: "100%", maxHeight: 650, maxWidth: 600, borderRadius: '16px' }}
            alt="Study Together"
            src="https://images.pexels.com/photos/7516283/pexels-photo-7516283.jpeg?_gl=1*198690y*_ga*NzA4NzgwOTc5LjE3NjAzMDU3MDA.*_ga_8JE65Q40S6*czE3NjM0MzA4NzEkbzMkZzEkdDE3NjM0MzE2MTEkajU5JGwwJGgw" />
          </Box>
        </Grid>
        <Grid size={{ sm: 12}}>
          {/*This will be break banner*/}
          <Paper sx={{ width: '100%', height:50, bgcolor: 'secondary.main', justifyContent: "center", display: "flex", alignItems: "center"}}>
            <Typography variant="h4"> Recent Tutors </Typography>
          </Paper>
        </Grid>
        {/*Render only the last three verified adverts*/}
        {recentAdverts(data)}
      </Grid>
    </Box>
  );
}

export default HomePage;
