import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import validateFormLogin from "./validate";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        email: "",
        password: ""
    }

    const handleSubmit = () =>{
    }

    return (
            <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validateFormLogin}
            >
                {({errors, touched, handleBlur, handleChange}) =>{
                    return (
                        <Form>
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
                                helperText={errors.email && touched.email && (<span>{errors.password}</span>)}
                                error={!!errors.password && !!touched.password}
                            >
                            </TextField>

                            <Button type="submit" variant="contained" size="large">ENTRAR</Button>
                        </Form>
                    );
                }}
            </Formik>
    );
}

export default Login;