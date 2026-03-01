// Detailed tutor listing view (Use Case 2) - Anmol T

import React, { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { getPublicFetch, getBaseURL } from "../common/utils/utils";
import { getAdvertDetail, sendMessage } from "../common/utils/commonCalls";
import { useQueryContext } from "../common/providers/queryContext";
import { useAuthContext } from "../common/providers/authContext";

const defaultAvatar = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

export default function ListingDetails() {
  const { listingID, messaging } = useParams();
  const { queryClient } = useQueryContext();
  const { state } = useAuthContext();
  const navigate = useNavigate();
  const [isMessageOpen, setIsMessageOpen] = useState(messaging ? true : false);
  const client = useMemo(() => getPublicFetch(), []);

  const advertQuery = useQuery({
    queryKey: ["advert", listingID],
    queryFn: () => getAdvertDetail(client, listingID),
    enabled: Boolean(listingID),
  });

  const messageMutation = useMutation({
    mutationFn: (payload) => sendMessage(queryClient, listingID, payload),
    onSuccess: () => {
      toast.success("Message sent to tutor.");
    },
    onError: () => {
      toast.error("Unable to send your message right now.");
    },
  });

  const advert = advertQuery.data;

  const resolvedAvatar = advert?.users?.profile_picture || defaultAvatar;

  const fileUrl = useMemo(() => {
    if (!advert?.files?.file_type) {
      return null;
    }
    const link = advert.files.file_type;
    if (link.startsWith("http")) {
      return link;
    }
    const base = getBaseURL();
    if (base) {
      return `${base}${link.startsWith("/") ? "" : "/"}${link}`;
    }
    return link.startsWith("/") ? link : `/${link}`;
  }, [advert]);

  const handleOpenMessage = () => {
    if (!state?.id) {
      toast.error("Please sign in to message tutors.");
      return;
    }
    setIsMessageOpen(true);
  };

  const handleCloseMessage = () => {
    if (!messageMutation.isPending) {
      setIsMessageOpen(false);
    }
  };

  const renderProfessors = (course) => {
    if (!course?.professor || course.professor.length === 0) {
      return <Typography variant="body2">Professor info unavailable</Typography>;
    }
    return course.professor.map((prof) => (
      <Typography key={prof.id || prof.name} variant="body2">
        {prof.name}
      </Typography>
    ));
  };

  if (advertQuery.isPending) {
    return (
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography>Loading listing...</Typography>
      </Box>
    );
  }

  if (advertQuery.isError || !advert) {
    return (
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography color="error">Unable to load this listing right now.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        overflow: "auto",
        padding: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "1000px",
          padding: 4,
          borderRadius: "40px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <Box
            sx={{
              minWidth: 260,
              maxWidth: 320,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,

            }}
          >
            <Avatar
              src={resolvedAvatar}
              alt={advert?.users?.name || "Tutor avatar"}
              sx={{ width: 240, height: 240, borderRadius: "20px" }}
              variant="rounded"
            />
            <Stack spacing={1} sx={{ width: "100%", alignItems: "center" }}>
              <Typography fontWeight={700} fontSize={20}>
                {advert?.users?.account.first_name + " " + advert?.users?.account.last_name || "Tutor"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {advert?.users?.location || "Location not provided"}
              </Typography>
              <Typography fontWeight={600} color="primary.main">
                ${advert?.price_range || "--"} /hr
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h4" fontWeight={700}>
              {advert?.users?.name || "Tutor Listing"}
            </Typography>
            {advert?.users?.education && (
              <Typography color="text.secondary">{advert.users.education}</Typography>
            )}
            {advert?.users?.bio && <Typography>{advert.users.bio}</Typography>}

            <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
              {advert?.catagories?.map((category) => (
                <Chip
                  key={category.id || category.name}
                  label={category.name}
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
              ))}
              {advert?.courses?.map((course) => (
                <Chip
                  key={course.id || course.name}
                  label={course.name}
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>

            <Divider />

            <Typography variant="h6" fontWeight={700}>
              Listing Description
            </Typography>
            <Grid container spacing={2} sx={{ marginBottom: "12px" }}>
                <Grid item  size={12}>
                  <Paper
                    variant="outlined"
                    sx={{
                      padding: 2,
                      borderRadius: "12px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Typography fontWeight={400}>{advert.description}</Typography>
                  </Paper>
                </Grid>
            </Grid>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Paper
            elevation={1}
            sx={{
              minWidth: 280,
              flex: 1,
              padding: 3,
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              Attached Files
            </Typography>
            {advert.files ? (
              advert.files.map((file) => (
                  <>
                    <Typography fontWeight={600}>{file.name}</Typography>
                    {advert.files?.upload_date && (
                      <Typography variant="body2" color="text.secondary">
                        Uploaded on {new Date(file.upload_date).toLocaleDateString()}
                      </Typography>
                    )}
                    <Button
                      href={file.file_type}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      sx={{ mt: 1, alignSelf: "flex-start" }}
                    >
                      Download File
                    </Button>
                  </>
              ))
            ) : (
                <Typography>No files have been shared for this listing.</Typography>
            )}
          </Paper>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                padding: "14px 0",
                fontSize: "18px",
                borderRadius: "15px",
              }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                padding: "14px 0",
                fontSize: "18px",
                borderRadius: "15px",
              }}
              onClick={handleOpenMessage}
            >
              Message Tutor
            </Button>
          </Grid>
        </Grid>

      </Paper>

      <Dialog open={isMessageOpen} onClose={handleCloseMessage} fullWidth maxWidth="sm">
        <DialogTitle>Message {advert?.users?.name || "Tutor"}</DialogTitle>
        <Formik
          initialValues={{ message: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.message.trim()) {
              errors.message = "Please enter a message.";
            }
            return errors;
          }}
          onSubmit={async (values, helpers) => {
            if (!state.id) {
              toast.error("Login before messaging tutor.");
              return;
            }
            try {
              await messageMutation.mutateAsync({
                contents: values.message,
                sender: state.id,
                read: false,
              });
              helpers.resetForm();
              setIsMessageOpen(false);
            } catch (err) {
              // errors handled in mutation
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Keep message respectful, and be sure to include a means of contact outside of Tutorall.
                </Typography>
                <TextField
                  multiline
                  minRows={6}
                  name="message"
                  label="Message"
                  fullWidth
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.message && errors.message)}
                  helperText={(touched.message && errors.message) || " "}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseMessage} disabled={messageMutation.isPending || isSubmitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={messageMutation.isPending || isSubmitting}
                >
                  Send
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
}
