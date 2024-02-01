import MenuBar from "../../components/Menu";
import Box from '@mui/material/Box';
import CardUser from "../../components/CardUser";
import CardAddProjeto from "../../components/CardAddProject";
import SearchTags from "./components/SearchTags";
import { projectsData } from "../../components/CardRenderProject/projectData";
import CardRenderProjeto from "../../components/CardRenderProject";
import { useContext, useState } from "react";
import ModalComponent from "../../components/ModalComponet";
import FormModal from "../../components/ModalComponet/components/FormModal";
import ModalControllerContext, {  } from "../../providers/modalController";
const Portfolio = () => {
    const {isOpen, toggle} = useContext(ModalControllerContext);
    return (
        <>
            <MenuBar />
            <ModalComponent open={isOpen} onClose={toggle} children={<FormModal/>} width="800px" height="522px"/>
            <Box sx={{ display: 'flex', flexDirection: "column", width:"100%", maxWidth:"1280px", margin: " 112px auto "}}>
                <CardUser />
                <Box sx={{display: 'flex', flexDirection: "column", gap: "40px", marginLeft: "32px"}}>
                    <SearchTags />
                    <Box sx={{display: "flex", gap: "24px", flexWrap: "wrap"}}>
                       {projectsData.length && <CardAddProjeto hasTitle onClick={toggle}/>} 
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