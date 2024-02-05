import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { Form, Formik } from "formik";
import validateForm from "./validate";
import theme from "../../../../theme";
import CardInputFile from "../CardInputFile/intex";
import ModalComponent from "../../../../components/ModalComponet";
import { useContext, useEffect, useState } from "react";
import ModalControllerContext from "../../../../providers/modalController";
import MessageModal from "../MessageModal";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PreviewContent from "../PreviewContent";
import { ImageControllerContext } from "../../../../providers/imageController";
import { RegisterProjects, UpdateProjects } from "../../../../services/portfolio";
import { Close } from "@mui/icons-material";
import { useAuth } from "../../../../providers/AuthProvider/useAuth";
import { formatMonthYear } from "../../../../utils";
import { FormModalProps } from "./types";

const FormModal = ({ mode, projectData, id }: FormModalProps) => {
    const { toggle, isOpen } = useContext(ModalControllerContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    const [isSaved, setIsSaved] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [error, setError] = useState(false);
    const [isPreviewContent, setPreviewContent] = useState(false);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const { image } = useContext(ImageControllerContext);
    const auth = useAuth();
    const currentDate = new Date();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 800);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const initialValues = {
        title: "",
        tags: "",
        link: "",
        description: "",
        file: null,
    }

    const handleSubmit = async (values: any) => {
        const data = new FormData();
        data.append('title', values.title);
        data.append('tags', values.tags);
        data.append('link', values.link);
        data.append('description', values.description);

        if (image) {
            data.append('file', image);

            try {
                if (mode === 'create') {
                    const response = await RegisterProjects(data);

                    if (response) {
                        setIsSaved(true);
                        toggle();
                    }
                } else {
                    if (id) {
                        const response = await UpdateProjects(data, id);
                        setIsUpdated(true);
                    }
                }

            } catch (error) {
                setError(true);
            }
        }
    };
    return (
        <Box sx={{ width: "100%" }}>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={handleSubmit}
                validationSchema={validateForm}
            >
                {({ errors, touched, handleBlur, handleChange }) => {
                    return (
                        <Form>
                            {isSaved && <ModalComponent open={isOpen} onClose={toggle} width="300px" bottom={300}>
                                <MessageModal title="Projeto adicionado com sucesso!" icon={<CheckCircleIcon sx={{ color: theme.palette.success.main }} />} />
                            </ModalComponent>}
                            {isUpdated && <ModalComponent open={isUpdated} onClose={() => setIsUpdated(false)} width="300px" bottom={300}>
                                <MessageModal title="Projeto atualizado com sucesso!" icon={<CheckCircleIcon sx={{ color: theme.palette.success.main }} />} />
                            </ModalComponent>}
                            {error && <ModalComponent open={error} onClose={() => setError(false)} width="300px" bottom={300}>
                                <MessageModal title="Erro ao adicionar projeto!" icon={<Close sx={{ color: theme.palette.error.main }} />} />
                            </ModalComponent>}
                            {isPreviewContent &&
                                <ModalComponent open={isPreviewContent} onClose={() => setPreviewContent(false)} width={isMobile ? '82%' : '1042px'} height={isMobile ? "420px" : "680px"} bottom={isMobile ? 0 : 40} hasCloseButton hasBorderRadius>
                                    <Box>
                                        {auth.name && (
                                            <PreviewContent
                                                title={title}
                                                avatar={""}
                                                author={auth.name}
                                                date={formatMonthYear(currentDate.toString())}
                                                image={image}
                                                description={description!}
                                                url={link}
                                                tags={tags}
                                                width={isMobile ? '308px' : '838px'}
                                            />
                                        )}
                                    </Box>
                                </ModalComponent>}
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column", gap: "24px", width: "100%",
                                '@media (max-width: 800px)': {
                                    maxWidth: "266px",
                                }
                            }}>
                                <Typography sx={{ fontSize: "24px" }}>Adicionar projeto</Typography>

                                <Box sx={{ display: "flex", gap: "16px", flexDirection: isMobile ? "column" : "row" }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                        <Typography variant="subtitle1">Selecione o conteúdo que você deseja fazer upload</Typography>
                                        <Box sx={{ display: "flex", height: "298px", gap: "16px" }}>
                                            <CardInputFile />
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                            <Box>
                                                <Typography variant="subtitle1" onClick={() => setPreviewContent(true)} sx={{ cursor: "pointer" }}>Visualizar publicação</Typography>
                                            </Box>
                                            <Box sx={{ display: "flex", flexDirection: "row", gap: "16px" }}>
                                                <Button onClick={handleSubmit} type="submit" variant="contained" size="large" color="primary">SALVAR</Button>
                                                <Button onClick={toggle} variant="contained" size="large"
                                                    sx={{
                                                        backgroundColor: theme.palette.grey[50],
                                                        color: theme.palette.grey[100],
                                                        '&:hover': {
                                                            backgroundColor: theme.palette.grey[200],
                                                        },
                                                    }}>CANCELAR</Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "413px", gap: "16px" }}>
                                        <TextField
                                            label="Título"
                                            name="title"
                                            required
                                            error={!!errors.title && !!touched.title}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setTitle(mode === "edit" ? e.target.defaultValue : e.target.value)
                                            }}
                                            onBlur={handleBlur}
                                            helperText={errors.title && touched.title && <span>{errors.title}</span>}
                                            sx={{ width: "100%" }}
                                            defaultValue={projectData?.title}
                                        >
                                        </TextField>
                                        <TextField
                                            label="Tags"
                                            name="tags"
                                            required
                                            error={!!errors.tags && !!touched.tags}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setTags(mode === "edit" ? e.target.defaultValue : e.target.value)
                                            }}
                                            onBlur={handleBlur}
                                            helperText={errors.tags && touched.tags && <span>{errors.tags}</span>}
                                            defaultValue={projectData?.tags}
                                        >
                                        </TextField>
                                        <TextField
                                            label="Link"
                                            name="link"
                                            required
                                            error={!!errors.link && !!touched.link}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setLink(mode === "edit" ? e.target.defaultValue : e.target.value)
                                            }}
                                            onBlur={handleBlur}
                                            helperText={errors.link && touched.link && <span>{errors.link}</span>}
                                            defaultValue={projectData?.link}
                                        >
                                        </TextField>
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Descrição"
                                            name="description"
                                            required
                                            error={!!errors.description && !!touched.description}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setDescription(mode === "edit" ? e.target.defaultValue : e.target.value)
                                            }}
                                            onBlur={handleBlur}
                                            helperText={errors.description && touched.description && <span>{errors.description}</span>}
                                            multiline
                                            rows={4}
                                            defaultValue={projectData?.description}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Form>
                    );
                }}
            </Formik>
        </Box>
    )
}

export default FormModal;