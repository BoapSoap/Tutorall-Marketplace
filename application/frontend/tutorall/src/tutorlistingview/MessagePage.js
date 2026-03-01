// Message page placeholder - Anmol T

import React from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function MessagePage() {
  const { receiver, listingID } = useParams();
  const [message, setMessage] = React.useState("");

  const handleSend = () => {
    if (!message.trim()) {
      toast.warning("Please enter a message before sending.");
      return;
    }

    // future: send to backend here
    toast.success("Your message has been sent to the tutor.");
    setMessage("");
  };

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
          width: "800px",
          padding: 4,
          borderRadius: "30px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Message Tutor
        </Typography>

        <Typography variant="body2" color="text.secondary">
          (Placeholder) Messaging tutor ID: {receiver}, about listing: {listingID}
        </Typography>

        {/* one-way message box */}
        <TextField
          multiline
          minRows={6}
          fullWidth
          placeholder="Type your message to the tutor..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={handleSend}>
            SEND
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
