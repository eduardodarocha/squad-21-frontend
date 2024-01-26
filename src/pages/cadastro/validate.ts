import {object, string} from "yup"

const createNewAccount = object().shape({
    name: string().required("Obrigatório"),
    surname: string().required("Obrigatório"),
    email: string().required("Obrigatório"),
    password: string().required("Obrigatório"),
});

export default createNewAccount;