import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import validateFormLogin from "./validate";
import "./styles.css"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        email: "",
        password: ""
    }

    const handleSubmit = () =>{
    }

    return (
        
        <Box className="container">
            <Box className="img">
                <img className="imgContent" src="assets/images/img_login.png" alt="Imagem de background"/>
            </Box>
            <Box className="form">
                <h3 className="h3">Entre no Orange Portfólio</h3>
                <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validateFormLogin}
                >
                    {({errors, touched, handleBlur, handleChange}) =>{
                        return (
                            <Form className="formContent">
                                <h5 className="h5">Faça login com email</h5>
                                <TextField
                                    label="Email address"
                                    name="email"
                                    required
                                    error={!!errors.email && !!touched.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={errors.email && touched.email && <span>{errors.email}</span>}
                                >
                                </TextField>
                                
                                <TextField
                                    label="Password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff/> : <Visibility/>}</IconButton>
                                        )
                                    }}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={errors.password && touched.password && (<span>{errors.password}</span>)}
                                    error={!!errors.password && !!touched.password}
                                >
                                </TextField>
                                <Button id="button" type="submit" variant="contained" size="large" color="primary">ENTRAR</Button>
                                <a href="" className="a">Cadastre-se</a>
                            </Form>
                        );
                    }}
                </Formik>
            </Box>
        </Box>
    );
}

export default Login;