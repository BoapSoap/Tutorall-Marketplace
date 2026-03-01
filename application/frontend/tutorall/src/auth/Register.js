// Register screen for TutorAll.
// Static M3 placeholder version, just UI for now.
// Basically the create account box that sits in the white area.
// Route: /register

import React from "react";
import { Box, TextField, Button, Typography, Paper, Link as MuiLink } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import { Link, useNavigate } from "react-router-dom";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { useAuthContext } from "../common/providers/authContext";

import { getPublicFetch } from "../common/utils/utils";
import { usePostRegister } from "../common/utils/commonCalls";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email().required("Email is required.").matches(/\@sfsu.edu$/, "Must be SFSU email."),
  password1: Yup.string().required("Password is required."),
  password2: Yup.string().oneOf([Yup.ref('password1'), null], "Password must match.").required("Password must match."),
})

export default function Register() {

  const queryClient = getPublicFetch();
  const navigate = useNavigate();

  const { dispatch, isAuthenticated } = useAuthContext();

  const { mutateAsync: submitPostRegister } = usePostRegister()

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
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password1: "",
            password2: "",
            eula: false,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, helpers) => {
            try {
              const data = await submitPostRegister({
                queryClient,
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                password: values.password1
              })

              toast.success(`Thank you for registering ${values.first_name} ${values.last_name}!`)

              await dispatch({ type: "LOGIN_SUCCESS", payload: data})

              navigate("/profile");
            } catch (e) {
              toast.error(`Registration failed. Error: ${e}`)
            }
          }}
        >
          {({ values, errors, touched, dirty, handleChange, handleBlur, setFieldValue, isSubmitting, isValid }) => {

            return(
              <Form>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  textAlign="center"
                  sx={{ mb: 2 }}
                >
                  Create Account
                </Typography>

                <TextField
                  name="first_name"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.first_name && errors.first_name)}
                  helperText={(touched.first_name && errors.first_name) || " "}
                />

                <TextField
                  name="last_name"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.last_name && errors.last_name)}
                  helperText={(touched.last_name && errors.last_name) || " "}
                />

                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.email && errors.email)}
                  helperText={(touched.email && errors.email) || " "}
                />

                <TextField
                  name="password1"
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  value={values.password1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.password1 && errors.password1)}
                  helperText={(touched.password1 && errors.password1) || " "}
                />

                <TextField
                  name="password2"
                  label="Re-Enter Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  value={values.password2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.password2 && errors.password2)}
                  helperText={(touched.password2 && errors.password2) || " "}
                />

                <Typography variant="body2">
                  <Checkbox
                    name="eula"
                    style={{ marginRight: "6px" }}
                    value={values.eula}
                    onChange={handleChange}
                  />
                  I have read and understand the{" "}
                  <MuiLink
                    href="#"
                    underline="none"
                    color="primary.main"
                    sx={{ fontWeight: 600 }}
                  >
                    Terms of Service
                  </MuiLink>
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!(isValid && dirty && values.eula)}
                  type="submit"
                >
                  Create Account
                </Button>

                <Typography
                  variant="body2"
                  textAlign="center"
                  sx={{
                    "& .purple-link": {
                      color: "primary.main",
                    }
                  }}
                >
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="purple-link"
                    style={{
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Sign in instead.
                  </Link>
                </Typography>
              </Form>
            )
          }}
        </Formik>

      </Paper>
    </Box>
  );
}
