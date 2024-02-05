import { Box, Typography } from "@mui/material";
import MenuBar from "../../components/Menu"
import SelectLabels from "../../components/Select"
import CardRenderProjeto from "../../components/CardRenderProject";
import { ListAllProjects } from "../../services/discover";
import { useEffect, useState } from "react";
import { ProjectData } from "../../services/discover/types";
import { useAuth } from "../../providers/AuthProvider/useAuth";
import { formatMonthYear } from "../../utils";
import AlertComponent from "../../components/Alert";

const Discover = () => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [searchTags, setSearchTags] = useState("");
    const [hasError, setHasError] = useState(false);
    const auth = useAuth();

    const handleSearchTagsChange = (selectedTags: string) => {
        setSearchTags(selectedTags);
    };

    useEffect(() => {
        const fetchProjectsData = async () => {
            try {
                if (auth.id) {
                    if (searchTags) {
                        const response = await ListAllProjects(searchTags.toLowerCase());
                        setProjects(response);
                    }
                    else {
                        const response = await ListAllProjects();
                        setProjects(response);
                    }
                }
            } catch (error) {
                setHasError(true);
            }
        };

        fetchProjectsData();
    }, [auth.id, searchTags]);

    return (
        <>
            <MenuBar />
            <Box sx={{
                display: 'flex', flexDirection: "column", gap: '120px', width: "100%", maxWidth: "1280px", margin: " 112px auto ",
                '@media (max-width: 800px)': {
                    margin: "32px auto",
                    gap: "32px"
                },
            }}>
                {hasError && (
                    <AlertComponent
                        severity="error"
                        title="Erro ao carregar projetos"
                    />
                )}
                <Box sx={{ display: 'flex', justifyContent: "center" }}>
                    <Typography
                        sx={{
                            width: '100%',
                            maxWidth: '744px',
                            textAlign: 'center',
                            fontFamily: 'Roboto',
                            fontSize: '34px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: '34px',
                            color: '#222244',
                            '@media (max-width: 800px)': {
                                fontSize: '24px',
                            },
                        }}
                    >
                        Junte-se à comunidade de inovação, inspiração e descobertas, transformando experiências em conexões inesquecíveis
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "column", gap: "40px", marginLeft: "32px" }}>
                    <SelectLabels onSelectChange={handleSearchTagsChange} />
                    <Box sx={{ display: "flex", gap: "24px", flexWrap: "wrap", cursor: "pointer" }}>
                        {projects.length &&
                            projects.map((item, index) =>
                                <CardRenderProjeto
                                    key={index}
                                    id={item.id}
                                    avatar={""}
                                    author={item.user_name}
                                    image={item.image_url}
                                    date={formatMonthYear(item.created_at)}
                                    tags={item.tags}
                                />
                            )
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Discover;