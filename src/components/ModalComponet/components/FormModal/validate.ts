import {array, object, string} from "yup";

const validateForm = object().shape({
    title: string().required("Este campo é obrigatório"),
    tags: string().required("Este campo é obrigatório"),
    link: string().required("Este campo é obrigatório"),
    description: string().required("Este campo é obrigatório"),
});

export default validateForm;