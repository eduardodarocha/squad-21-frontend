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
import { ListProjects } from "../../services/portfolio";
import { useAuth } from "../../providers/AuthProvider/useAuth";
import { ProjectData } from "../../services/portfolio/types";
import MessageModal from "../../components/ModalComponet/components/MessageModal";
import { Close } from "@mui/icons-material";
import theme from "../../theme";

const Portfolio = () => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [error, setError] = useState(false);
    const { isOpen, toggle } = useContext(ModalControllerContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    const [searchTags, setSearchTags] = useState("");
    const auth = useAuth();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 800);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const formatMonthYear = (dateString: string): string => {
        const dateObject = new Date(dateString);

        const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getUTCFullYear();

        return `${month}/${year}`;
    };

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
                setError(true);
            }
        };

        fetchProjectsData();
    }, [auth.id, searchTags]);

    return (
        <>
            <MenuBar />
            <ModalComponent open={isOpen} onClose={toggle} children={<FormModal />} width={isMobile ? 'auto' : '800px'} height="420px" bottom={0} />
            {error && <ModalComponent open={isOpen} onClose={toggle} width="300px">
                <MessageModal title="Erro ao carregar projetos, tente novamente mais tarde!" icon={<Close sx={{ color: theme.palette.error.main }} />} />
            </ModalComponent>}
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
                                    avatar={""}
                                    author={item.user_name}
                                    image={item.image_url}
                                    date={formatMonthYear(item.created_at)}
                                    tags={item.tags}
                                    hasMenu
                                    hasTags
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