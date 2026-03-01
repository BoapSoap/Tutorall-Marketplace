/*
Primary component for advert search. Uses filters from App Bar and header bar to narrow search and sort by price.

Advert items are rendered in rows of 3, so long as spacing allows.

- Matthew A. Davis
*/
import * as React from 'react';

import {
  useQueryClient,
  useQuery
} from '@tanstack/react-query'

import { useParams } from "react-router";

import { getPublicFetch } from "../utils/utils";

import {getAdvertsFiltered} from "../utils/commonCalls";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import ArticleIcon from '@mui/icons-material/Article';
import MapIcon from '@mui/icons-material/Map';

import AdvertItem from "../utils/advertCard";

export const SearchAdverts = () => {
  const queryClient = useQueryClient()
  const client = getPublicFetch()
  let params = useParams()

  //Search and sort parameters
  const [categories, setCategories] = React.useState(params.categories ? params.categories : "")
  const [courses, setCourses] = React.useState(params.courses ? params.courses : "")
  const [professors, setProfessors] = React.useState("")
  const [sort, setSort] = React.useState("")
  const priceSort = ["Ascending", "Descending"]

  //internal order value using static price sort requirements
  const handlePrice = (e) => {
    if (e.target.textContent == "Ascending") {
      setSort("")
    } else if (e.target.textContent == "Descending") {
      setSort("-")
    } else {
      setSort("")
    }
  }

  const handleProfessors = (e) => {
    setProfessors(e.target.value)
  }

  //Render option if sort/search returns no adverts
  const noProfessors = (data) => {
    if (data.length == 0) {
      return(
        <Grid size={12}
          sx={{
            flexGrow: 1,
            justifyContent: 'flex-start',
            alignItems: "center",
            display: "flex"
        }}>
          <Box sx={{
            flexGrow: 1,
            justifyContent: 'flex-start',
            alignItems: "center",
            display: "flex"
          }}>
            <Typography variant="body1"> It looks like we can't find any tutors that match your search! Please try again at a later time, or perhaps consider applying as a tutor yourself! </Typography>
          </Box>
        </Grid>
      )
    }
  }

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['adverts', categories, courses],
    queryFn: () => getAdvertsFiltered(client, categories, courses, professors, sort),
  })

  //Updates the parameters whenever the url is changed.
  React.useEffect(() => {
    setCategories(params.categories ? params.categories.replace("%20", " ") : "")
    setCourses(params.courses ? params.courses.replace("%20", " ") : "")
  }, [params])

  //Render nothing while waiting for initial request
  if (isPending){
    return (
      <>
      </>
    )
  }

  //Render error
  if (isError) {
    return(
      <>
        <Typography variant="h4"> Sorry! We've encountered an error: {error.code} </Typography>
      </>
    )
  }

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
      <Grid container spacing={3}   sx={{
      justifyContent: "space-around",
      alignItems: "flex-start",
      flexGrow: 1
    }} >
      <Grid size={12} >
        {/*Paper provides a top bar with additional sort/order requirements*/}
        <Paper sx={{ width: 'calc(100% - 10px)', height:75, bgcolor: 'secondary.main', display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: "5px", paddingRight: "5px", }}>
          <Grid container spacing={3} sx={{
            justifyContent: "space-around",
            alignItems: "center",
            flexGrow: 1
          }}>
            <Grid size={3}>
              <Typography> Showing {data.length} results. </Typography>
            </Grid>
            <Grid size={3}>
              <TextField
                onChange={handleProfessors}
                defaultValue={professors}
                placeholder="Search by Professors"
                label="Professors"
                />
            </Grid>
            <Grid size={3}>
              <Autocomplete
                disablePortal
                options={priceSort}
                sx={{ width: 200 }}
                onChange={handlePrice}
                renderInput={(params) => <TextField {...params} defaultValue={sort} label="Sort by Price Range" variant="standard" />}
                />
            </Grid>
            <Grid size={3}>
              <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['adverts']})} >
                Apply
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {/*Render all returned adverts*/}
      {data?.map((advert) => (
        <Grid size={{ sm: 4, md: 2 }}>
          <AdvertItem advert={advert} />
        </Grid>
      ))}
      {noProfessors(data)}
      </Grid>
    </Box>
  )
}

export default SearchAdverts;
