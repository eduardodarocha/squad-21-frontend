import {object, string} from "yup";

const validateForm = object().shape({
    title: string().required("Obrigatório"),
    tags: string().required("Obrigatório"),
    link: string().required("Obrigatório"),
    descriptio: string().required("Obrigatório"),
});

export default validateForm;