import MenuBar from "../../components/Menu";
import Box from '@mui/material/Box';
import CardUser from "../../components/CardUser";
import CardAddProjeto from "../../components/CardAddProject";
import SearchTags from "./components/SearchTags";
import CardRenderProjeto from "../../components/CardRenderProject";
import { useContext, useState, useEffect } from "react";
import ModalComponent from "../../components/ModalComponet";
import FormModal from "../../components/ModalComponet/components/FormModal";
import ModalControllerContext, { } from "../../providers/modalController";
import { DeleteProject, ListProjects, ListSingleProject } from "../../services/portfolio";
import { useAuth } from "../../providers/AuthProvider/useAuth";
import { ProjectData } from "../../services/portfolio/types";
import { formatMonthYear } from "../../utils";
import AlertComponent from "../../components/Alert";
import MessageModal from "../../components/ModalComponet/components/MessageModal";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import theme from "../../theme";

const Portfolio = () => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [hasError, setHasError] = useState(false);
    const { isOpen, toggle } = useContext(ModalControllerContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    const [searchTags, setSearchTags] = useState("");
    const [setting, setSetting] = useState<string | null>(null);
    const [id, setId] = useState("");
    const [confirmDeleted, setConfirmDeleted] = useState(false);
    const [action, setAction] = useState(true);
    const [projectData, setProjectData] = useState<ProjectData>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const auth = useAuth();

    const handleSettingChange = async (newSetting: string, id: string) => {
        setSetting(newSetting);
        setId(id);

        if (newSetting === "Editar") {
            SearchProject(id);
        }
    };

    useEffect(() => {
        setConfirmDeleted(true);
    }, [setting, id])


    const handleExcludAction = async () => {
        try {
            if (action) {
                const response = await DeleteProject(id);
                setConfirmDeleted(false);
            }
        } catch (error) {
            setHasError(true);
        }
    };

    const handleCancelAction = async () => {
        setConfirmDeleted(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 800);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSearchTagsChange = (selectedTags: string) => {
        setSearchTags(selectedTags);
    };


    useEffect(() => {
        const fetchProjectsData = async () => {
            try {
                if (auth.id) {
                    if (searchTags) {
                        const response = await ListProjects(searchTags.toLowerCase());
                        setProjects(response);
                    }
                    else {
                        const response = await ListProjects();
                        setProjects(response);
                    }
                }
            } catch (error) {
                setHasError(true);
            }
        };

        fetchProjectsData();
    }, [auth.id, searchTags, confirmDeleted]);

    const SearchProject = async (id: string) => {
        try {
            if (id) {
                const response = await ListSingleProject(id);
                if (response) {
                    setProjectData(response);
                }
            }
        } catch (error) {
            setHasError(true);
        }
    };

    return (
        <>
            <MenuBar />

            {confirmDeleted && setting === "Excluir" && (<ModalComponent open={confirmDeleted} onClose={() => setConfirmDeleted(false)} width="300px" bottom={300}>
                <MessageModal action="Deseja Excluir?" title="Se você prosseguir irá excluir o projeto do seu portfólio" icon={<CheckCircleIcon sx={{ color: theme.palette.success.main }} />} onConfirm={() => handleExcludAction()} onCancel={() => handleCancelAction()} hasAction />
            </ModalComponent>)}

            <ModalComponent open={isOpen} onClose={toggle} children={<FormModal mode="create" />} width={isMobile ? 'auto' : '800px'} height="420px" bottom={isMobile ? 0 : 160} />
            <ModalComponent open={setting === "Editar" && projectData?.id !== undefined} onClose={toggle} children={<FormModal mode="edit" projectData={projectData} id={id} />} width={isMobile ? 'auto' : '800px'} height="420px" bottom={isMobile ? 0 : 160} />
            {hasError && (
                <AlertComponent
                    severity="error"
                    title="Erro ao carregar projetos"
                />
            )}
            <Box sx={{
                display: 'flex', flexDirection: "column", width: "100%", maxWidth: "1280px", margin: "112px auto",
                '@media (max-width: 800px)': {
                    margin: "32px auto",
                },
            }}>
                <CardUser />

                <Box sx={{
                    display: 'flex', flexDirection: "column", gap: "40px", marginLeft: "32px",
                    '@media (max-width: 800px)': {
                        gap: "24px"
                    },
                }}>
                    <SearchTags onSelectChange={handleSearchTagsChange} />
                    <Box sx={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                        {!projects.length && <CardAddProjeto hasTitle onClick={toggle} />}
                        {
                            projects.map((item, index) =>
                                <CardRenderProjeto
                                    key={index}
                                    id={item.id}
                                    avatar={""}
                                    author={item.user_name}
                                    image={item.image_url}
                                    date={formatMonthYear(item.created_at)}
                                    tags={item.tags}
                                    hasMenu
                                    hasTags
                                    onSettingChange={handleSettingChange}
                                />
                            )
                        }
                    </Box>
                </Box>
            </Box>

        </>

    )
}

export default Portfolio;