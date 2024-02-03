import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import validateFormLogin from "./validate";
import "./styles.css";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { JwtPayload, jwtDecode } from "jwt-decode";
import "../../components/LoginRegisterCss/export";
import AlertComponent from "../../components/Alert";
import { useAuth } from "../../providers/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [userGoogle, setUserGoogle] = useState<JwtPayload>();
    const [hasError, setHasError] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: ""
    }

    const handleSubmit = async (values: { email: string, password: string }) => {
        try {
            await auth.authenticate(values.email, values.password);
            navigate("/portfolio");
        } catch (error) {
            setHasError(true);
        }
    }

    return (
        <Box className="container">
            <Box className="img">
                <img className="imgContent" src="assets/images/img_login.png" alt="Imagem de background" />
            </Box>
            <Box className="form">
                {hasError &&
                    <AlertComponent
                        severity="error"
                        title="Falha ao efetuar o login"
                    />
                }
                <h3 className="h3">Entre no Orange Portfólio</h3>

                <GoogleOAuthProvider clientId="629205010386-8pvfusp9ua143ld1d3k1nak7s099qbv9.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            if (credentialResponse.credential) {
                                var decoded = jwtDecode(credentialResponse.credential);
                                setUserGoogle(decoded);
                            }
                        }}
                        onError={() => {
                            setHasError(true);
                        }}
                    />
                </GoogleOAuthProvider>

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validateFormLogin}
                >
                    {({ errors, touched, handleBlur, handleChange }) => {
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
                                            <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
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
                                <Link to="/cadastro" id="cadastro">Cadastre-se</Link>
                            </Form>
                        );
                    }}
                </Formik>
            </Box>
        </Box>
    );
}

export default Login;