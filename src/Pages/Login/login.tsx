import { ThemeProvider } from "@emotion/react";
import { Alert, Avatar, Box, Button, Card, CardContent, Checkbox, Container, createTheme, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../Reducers/Slices/LoginSlice";


interface loginProps {
    user: string,
    password: string
}
interface AuthenticationProps {
    token: string;
    user: string;
    empresa: string;
    expiration: string;
}
interface responseProps {
    status: number,
    message: string;
    data: AuthenticationProps
}


interface MessageError {
    message: string;
    show: boolean;
}
const initialMessageError: MessageError = { message: "", show: false };
const Login = () => {
    const theme = createTheme();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [{ message, show }, setMessage] = useState(initialMessageError);
    const updateToken = (token: string) => {
        dispatch(
            setToken({
                token: token
            })
        )
    }
    const navigate = useNavigate();

    const { values, handleSubmit, handleBlur, handleChange, handleReset, errors, getFieldProps, setErrors } = useFormik({
        initialValues: {
            usuario: 'admin',
            password: 'admin'
        },
        onSubmit: async (value) => {
            try {
                const { data } = await Axios.post<responseProps>(
                    `${process.env.REACT_APP_API_RRHH}/api/auth/login`,
                    value,
                )
                if (data.status == 1) {
                    updateToken(data.data.token);
                    navigate('/bienvenido')
                }
                else {
                    setErrors({
                        usuario: 'Credenciales no validas',
                        password: 'Credenciales no validas'
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },
        validationSchema: Yup.object({
            usuario: Yup.string()
                .min(5, 'El valor debe ser almenos 3 caracteres')
                .required('Es requerido'),
            password: Yup.string()
                .min(5, 'El valor debe ser almenos 3 caracteres')
                .required('Es requerido'),
        })
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <div style={{
                    backgroundImage: `url(${process.env.REACT_APP_API_RRHH}/assest/web/fondoLogin.jpg)`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '100vw',
                    minHeight: '100vh',
                }}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <br />
                        <br />
                        <Card>
                            <CardContent >
                                <Box
                                    sx={{
                                        marginTop: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >

                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Sign in
                                    </Typography>
                                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="usuario"
                                            autoComplete="off"
                                            autoFocus
                                            value={values.usuario}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={errors.usuario}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoComplete="current-password"
                                            helperText={errors.password}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Sign In
                                        </Button>
                                        <Grid container>
                                            {/*  <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid> */}
                                        </Grid>
                                    </Box>

                                </Box>
                            </CardContent>
                        </Card>
                    </Container>
                </div>
            </ThemeProvider>
        </>
    );
}

export default Login;