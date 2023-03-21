import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Box,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  FormControl,
} from "@mui/material";
import * as Yup from "yup";

const Form = (props) => {
  const { addUser } = props;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    acceptTerms: false,
  });

  const [formErrorData, setFormErrorData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    acceptTerms: "",
  });

  const formDataSchema = Yup.object().shape({
    firstName: Yup.string().required("Lutfen isminizi giriniz"),
    lastName: Yup.string().required("Lutfen soyisminizi giriniz"),
    email: Yup.string()
      .email("Lutfen gecerli bir mail adresi giriniz")
      .required("Lutfen mail adresinizi giriniz"),
    password: Yup.string()
      .required("Lutfen sifrenizi giriniz")
      .min(6, "Lutfen en az 6 karakterden olusan sifrenizi giriniz"),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      "Lutfen kullanim sartlarini kabul ediniz"
    ),
  });

  const handleChange = (e) => {
    Yup.reach(formDataSchema, e.target.name)
      .validate(e.target.value)
      .then(setFormErrorData({ ...formErrorData, [e.target.name]: "" }))
      .catch((err) => {
        setFormErrorData({ ...formErrorData, [e.target.name]: err.errors[0] });
      });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTerms = (e) => {
    Yup.reach(formDataSchema, e.target.name)
      .validate(e.target.checked)
      .then(setFormErrorData({ ...formErrorData, [e.target.name]: "" }))
      .catch((err) => {
        setFormErrorData({ ...formErrorData, [e.target.name]: err.errors[0] });
      });
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => addUser(res.data));

    // const data = new FormData(event.currentTarget);
    // console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        User Create Form
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoFocus
            onChange={handleChange}
            value={formData.firstName}
            helperText={formErrorData.firstName}
            error={Boolean(formErrorData.firstName)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            onChange={handleChange}
            value={formData.lastName}
            helperText={formErrorData.lastName}
            error={Boolean(formErrorData.lastName)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email adress"
            fullWidth
            onChange={handleChange}
            value={formData.email}
            helperText={formErrorData.email}
            error={Boolean(formErrorData.email)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            onChange={handleChange}
            value={formData.password}
            helperText={formErrorData.password}
            error={Boolean(formErrorData.password)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl
            onChange={handleTerms}
            error={Boolean(formErrorData.acceptTerms)}
          >
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  name="acceptTerms"
                  id="acceptTerms"
                  value={formData.acceptTerms}
                />
              }
              required
              label="Accept Terms of Services"
            />
            <FormHelperText>{formErrorData.acceptTerms}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained">
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
