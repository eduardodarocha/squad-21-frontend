// Adicionar verificação de uma senha forte
// Adicionar uma verificação que impeça dois usuários com o mesmo email, assim que o backend estiver pronto

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import "./styles.css";
import createNewAccount from "./validate"; 

const Cadastro = () => {
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        name: "",
        surname: "",
        email: "",
        password: ""
    }

    const handleSubmit = () => {
    }

    return (
        <Box className="container">
            <Box className="img">
                <img className="" src="assets/images/img_cadastro.png" alt="Uma mulher digita em um laptop, com um balão de código, representando assim a programação." />
            </Box>
            <Box className="form">
                <h3 className="h3">Cadastre-se</h3>
                <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={createNewAccount}
                >
                {({errors, touched, handleBlur, handleChange}) => {
                    return (
                        <Form className="form">
                            <h3 className="h3">Cadastre-se</h3>
                            <div className="nameSurname">
                                <TextField
                                label="Nome"
                                name="name"
                                required
                                error={!!errors.name && !!touched.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={errors.name && touched.name && <span>{errors.name}</span>}>
                                </TextField>

                                <TextField
                                label="Sobrenome"
                                name="surname"
                                required
                                error={!!errors.surname && !!touched.surname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={errors.surname && touched.surname && <span>{errors.surname}</span>}>
                                </TextField>
                            </div>

                            <div className="emailPassword">
                                <TextField
                                label="Email"
                                name="email"
                                required
                                error={!!errors.email && !!touched.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={errors.email && touched.email && <span>{errors.email}</span>}>
                                </TextField>

                                <TextField
                                label="Password"
                                name="password"
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
                            </div>

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