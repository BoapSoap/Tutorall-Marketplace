// Login screen for TutorAll. Just a static M3 version, no axios or backend yet.
// Renders inside the white content box. Route: /signin
// Keeping it simple and using MUI's theme colors instead of custom hex codes.

import React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../common/providers/authContext";
import { useQueryContext } from "../common/providers/queryContext";
import { toast } from 'react-toastify';
import { publicLogin } from "../common/utils/utils";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { dispatch, isAuthenticated } = useAuthContext();
  const { refreshQuery } = useQueryContext();

  const navigate = useNavigate();

  const onEnter = async (e) => {
    if (e === 13) {
        onSubmit();
    }
  }

  const onSubmit = async (bEvent) => {

    //toast.success(`Login with email: ${email} password: ${password}`)
    //return

    try {
      dispatch({ type: "LOGIN_PENDING"});
      const data = await publicLogin(email, password);
      await dispatch({ type: "LOGIN_SUCCESS", payload: data})

      navigate("/profile");


    } catch (e) {
      console.log(e)
      toast.error(`Error Logging In`)
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        overflow: "auto",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 6,
          width: "600px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          borderRadius: "60px",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
          sx={{ mb: 2 }}
        >
          Sign In
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          onChange={(e) => setPassword(e.currentTarget.value)}
          onKeyDown={(e) => onEnter(e.keyCode)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onSubmit}
        >
          Sign In
        </Button>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            "& .purple-link": {
              color: "primary.main",
            },
          }}
        >
          <Link
            to="#"
            className="purple-link"
            style={{
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Forgot password?
          </Link>
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            "& .purple-link": {
              color: "primary.main",
            },
          }}
        >
          Not a member?{" "}
          <Link
            to="/register"
            className="purple-link"
            style={{
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Register here.
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
