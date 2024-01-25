import {object, string} from "yup";

const validateFormLogin = object().shape({
    email: string().required("Obrigatório"),
    password: string().required("Obrigatório")
});

export default validateFormLogin;