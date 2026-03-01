// Simple thank-you screen after creating an advertisement.

import React from "react";
import { Box, Typography } from "@mui/material";

export default function ListingCreationThankYou() {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 4,
        overflow: "auto",
      }}
    >
      <img
        // feel free to change the image later if necessary
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Yes_Check_Circle.svg/1024px-Yes_Check_Circle.svg.png"
        alt="success"
        width="140px"
        style={{ marginBottom: "20px" }}
      />

      <Typography variant="h4" fontWeight={700}>
        Thank you!
      </Typography>

      <Typography variant="body1" sx={{ mt: 1 }}>
        Your tutor posting is under review! You will receive a message within 24 hours when the post is accepted or rejected.
      </Typography>
    </Box>
  );
}
