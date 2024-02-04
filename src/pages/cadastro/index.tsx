import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import "./styles.css";
import createNewAccount from "./validate"; 
import "../../components/LoginRegisterCss/export";
import AlertComponent from "../../components/Alert";
import axios from "axios";

const Cadastro = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [hasError, setHasError] = useState(false);

    const initialValues = {
        name: "",
        lastname: "",
        email: "",
        password: ""
    }

    const handleSubmit = (values: FormikValues) => {
        axios.post("http://localhost:3333/", values)
        .then(response => {
            console.log(response.status);
        }).catch(error => {
            console.error(error);
            setHasError(true);
        });
    }

    return (
        <Box className="container">
            <Box className="img">
                <img className="" src="assets/images/img_cadastro.png" alt="Uma mulher digita em um laptop, com um balão de código, representando assim a programação." />
            </Box>
            <Box className="form">
                {hasError ? 
                <AlertComponent severity="error" title="Falha ao efetuar o cadastro!" /> : 
                <AlertComponent severity="success" title="Cadastro efetuado com sucesso!" />
                }
                <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={createNewAccount}
                >
                {({errors, touched, handleBlur, handleChange}) => {
                    return (
                        <Form className="formContent">
                            <h3 className="h3">Cadastre-se</h3>
                            <Box className="nameLastname">
                                <TextField
                                label="Nome"
                                name="name"
                                id="name"
                                className="fullName"
                                required
                                error={!!errors.name && !!touched.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={errors.name && touched.name && <span>{errors.name}</span>}>
                                </TextField>

                                <TextField
                                label="Sobrenome"
                                name="lastname"
                                id="lastname"
                                className="fullName"
                                required
                                error={!!errors.lastname && !!touched.lastname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={errors.lastname && touched.lastname && <span>{errors.lastname}</span>}>
                                </TextField>
                            </Box>

                            <Box className="emailPassword">
                                <TextField
                                label="Email"
                                name="email"
                                className="credentials"
                                required
                                error={!!errors.email && !!touched.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={errors.email && touched.email && <span>{errors.email}</span>}>
                                </TextField>

                                <TextField
                                label="Password"
                                name="password"
                                className="credentials"
                                required
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff/> : <Visibility/>}</IconButton>
                                    )
                                }}
                                error={!!errors.password && !!touched.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={errors.password && touched.password && <span>{errors.password}</span>}>
                                </TextField>
                            </Box>

                            <Button id="button" type="submit" variant="contained" size="large" color="primary">CADASTRAR</Button>
                        </Form>
                    );
                }}
                </Formik> 
            </Box>
        </Box>
    );
} 

export default Cadastro;