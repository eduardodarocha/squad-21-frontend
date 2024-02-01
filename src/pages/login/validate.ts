import {object, string} from "yup";

const validateFormLogin = object().shape({
    email: string().required("Este campo é obrigatório!"),
    password: string().required("Este campo é obrigatório!")
});

export default validateFormLogin;