import { object, string } from "yup"

const createNewAccount = object().shape({
    name: string(),
    surname: string(),
    email: string().required("Este campo é obrigatório!"),
    password: string().min(12, "Sua senha deve ter no mínimo 12 caracteres!").required("Este campo é obrigatório!"),
});

export default createNewAccount;