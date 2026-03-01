/*
  UserAdverts is a helper function to userProfile to display a user's pending and approved adverts. Uses a common component from advertCard to display consistent information.

  -Matthew A. Davis
*/
import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import { toast } from "react-toastify";

import { useAuthContext } from "../common/providers/authContext";
import { useQueryContext } from "../common/providers/queryContext";
import { getUserAdverts, useDeleteAdvert } from "./profileCalls";

import { AdvertProfile } from "../common/utils/advertCard";
import { adverts } from "../common/utils/testAdverts";

export const UserAdverts = () => {

  const { state, isAuthenticated } = useAuthContext();
  const { queryClient } = useQueryContext();
  const invalidator = useQueryClient();
  const { mutateAsync: postDeleteAdvert } = useDeleteAdvert();

  const [ open, setOpen ] = React.useState(false);
  const [ id, setID ] = React.useState(null);

  const handleClose = () => {
    setOpen(false);
  }

  const deleteAdvert = async () => {
    try {
      await postDeleteAdvert({
        queryClient,
        id
      })
      toast.success("Advert deleted.")
      invalidator.invalidateQueries({ queryKey: ['user_adverts'] });
      handleClose();
    } catch (e) {
      toast.error(`Advert could not be deleted. Reason: ${e}`)
    }
    return
  }

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['user_adverts', state.id],
    queryFn: () => getUserAdverts(queryClient, state.id),
  })

  if ( isPending ) {
    console.log(state)
    return(
      <>
      </>
    )
  }

  return (
    <Box sx={{
      height: "75vh",
      maxHeight: "98%",
      overflow: "hidden",
      overflowY: "scroll",
      flexGrow: 1,
      padding: "10px"
    }}>
      <Grid container spacing={3} sx={{
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
        maxHeight: "100%",
      }}>
        {data?.map((advert) => (
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <AdvertProfile advert={advert} open={open} setOpen={setOpen} setID={setID} />
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Remove Advert
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this advert? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={deleteAdvert} variant="contained">
            Confirm
          </Button>
        </DialogActions>

      </Dialog>

    </Box>
  );
}



export default UserAdverts;
