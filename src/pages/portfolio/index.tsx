import MenuBar from "../../components/Menu";
import Box from '@mui/material/Box';
import CardUser from "../../components/CardUser";
import CardAddProjeto from "../../components/CardAddProject";
import SearchTags from "./components/SearchTags";
import { projectsData } from "../../components/CardRenderProject/projectData";
import CardRenderProjeto from "../../components/CardRenderProject";
import { useContext, useState, useEffect } from "react";
import ModalComponent from "../../components/ModalComponet";
import FormModal from "../../components/ModalComponet/components/FormModal";
import ModalControllerContext, { } from "../../providers/modalController";

const Portfolio = () => {
    const { isOpen, toggle } = useContext(ModalControllerContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 800);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>
            <MenuBar />
            <ModalComponent open={isOpen} onClose={toggle} children={<FormModal />} width={isMobile ? 'auto' : '800px'} height="420px" bottom={0} />
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
                    <SearchTags />
                    <Box sx={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                        {projectsData.length && <CardAddProjeto hasTitle onClick={toggle} />}
                        {
                            projectsData.map((item, index) =>
                                <CardRenderProjeto
                                    avatar={item.avatar}
                                    author={item.author}
                                    image={item.image}
                                    date={item.date}
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