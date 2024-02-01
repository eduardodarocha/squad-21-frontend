import { Box, Button, TextField, Typography } from "@mui/material";
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
import { projectsData } from "../../../CardRenderProject/projectData";
import { ImageControllerContext } from "../../../../providers/imageController";


const FormModal = () => {
    const { toggle, isOpen } = useContext(ModalControllerContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isSaved, setIsSaved] = useState(false);
    const [isPreviewContent, setPreviewContent] = useState(false);
     const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const { image } = useContext(ImageControllerContext);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
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
    }

    const handleSubmit = (values: any) => {
        console.log('title', title);
        console.log('tags', tags);
        console.log('link', link);
        console.log('description', description);
        console.log('image', image);
        
        
        
        
        setIsSaved(true);
    }

    

    return (
        <Box sx={{ width: "100%" }}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validateForm}
            >
                {({ errors, touched, handleBlur, handleChange }) => {
                    return (
                        <Form>
                            {isSaved && <ModalComponent open={isOpen} onClose={toggle} width="300px">
                                <MessageModal title="Projeto adicionado com sucesso!" icon={<CheckCircleIcon sx={{ color: theme.palette.success.main }} />} />
                            </ModalComponent>}
                            {isPreviewContent &&
                                <ModalComponent open={isOpen} onClose={toggle} width="1042px" height="680px" hasCloseButton>
                                    <Box>
                                        {projectsData.length > 0 && (
                                            <PreviewContent
                                                title={title}
                                                avatar={projectsData[0].avatar}
                                                author={projectsData[0].author}
                                                date={projectsData[0].date}
                                                image={image}
                                                description={description!}
                                                url={link}
                                                tags={tags}
                                                width="838px"
                                            />
                                        )}
                                    </Box>


                                </ModalComponent>}
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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
                                                setTitle(e.target.value)
                                            }}
                                            onBlur={handleBlur}
                                            helperText={errors.title && touched.title && <span>{errors.title}</span>}
                                            sx={{ width: "100%" }}
                                        >
                                        </TextField>
                                        <TextField
                                            label="Tags"
                                            name="tags"
                                            required
                                            error={!!errors.tags && !!touched.tags}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setTags(e.target.value)
                                            }}
                                            onBlur={handleBlur}
                                            helperText={errors.tags && touched.tags && <span>{errors.tags}</span>}
                                        >
                                        </TextField>
                                        <TextField
                                            label="Link"
                                            name="link"
                                            required
                                            error={!!errors.link && !!touched.link}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setLink(e.target.value)
                                            }}
                                            onBlur={handleBlur}
                                            helperText={errors.link && touched.link && <span>{errors.link}</span>}
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
                                                setDescription(e.target.value)
                                            }}
                                            onBlur={handleBlur}
                                            helperText={errors.description && touched.description && <span>{errors.description}</span>}
                                            multiline
                                            rows={4}
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