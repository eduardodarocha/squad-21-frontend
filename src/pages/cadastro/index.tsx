import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import { useState } from "react";
import "./styles.css";
import createNewAccount from "./validate";
import "../../components/LoginRegisterCss/export";
import AlertComponent from "../../components/Alert";
// import api from "../../api/api";
import { Api } from "../../services/api";
import { AxiosError, AxiosResponse } from "axios";

const Cadastro = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isActionSuccessful, setIsActionSuccessful] = useState<boolean | null>(
    null
  );
  const [messageError, setMessageError] = useState("");
  const [user, setUser] = useState();
  const initialValues = {
    name: "",
    lastname: "",
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      createUser(values);
    },
  });

  async function createUser(values: any) {
    try {
      const response: AxiosResponse = await Api.post("/users", values);
      setUser(response.data);
      setIsActionSuccessful(true);
      setMessageError("");
    } catch (error: AxiosError | any) {
      setIsActionSuccessful(null);
      setMessageError(error.response.data.message);
    }
  }

  return (
    <Box className="container">
      <Box className="img">
        <img
          className=""
          src="assets/images/img_cadastro.png"
          alt="Uma mulher digita em um laptop, com um balão de código, representando assim a programação."
        />
      </Box>
      <Box className="form">
        {isActionSuccessful && (
          <AlertComponent
            severity="success"
            title="Cadastro efetuado com sucesso!"
          />
        )}
        {messageError && (
          <AlertComponent severity="error" title={messageError} />
        )}

        {isActionSuccessful === false && (
          <AlertComponent
            severity="error"
            title="Falha ao efetuar o cadastro!"
          />
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
          }}
          validationSchema={createNewAccount}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => {
            return (
              <Form className="formContent" onSubmit={formik.handleSubmit}>
                <h3 className="h3">Cadastre-se</h3>
                <Box className="nameSurname">
                  <TextField
                    label="Nome"
                    name="name"
                    className="fullName"
                    required
                    error={!!errors.name && !!touched.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    helperText={errors.name && touched.name && <span>{ }</span>}
                  ></TextField>

                  <TextField
                    label="Sobrenome"
                    name="lastname"
                    className="fullName"
                    required
                    error={!!errors.lastname && !!touched.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname}
                    helperText={
                      errors.lastname && touched.lastname && <span>{ }</span>
                    }
                  ></TextField>
                </Box>

                <Box className="emailPassword">
                  <TextField
                    label="Email"
                    name="email"
                    className="credentials"
                    required
                    error={!!errors.email && !!touched.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  ></TextField>

                  <TextField
                    label="Password"
                    name="password"
                    className="credentials"
                    required
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                    error={!!errors.password && !!touched.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    helperText={
                      errors.password && touched.password && <span>{ }</span>
                    }
                  ></TextField>
                </Box>

                <Button
                  id="button"
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  CADASTRAR
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default Cadastro;
