import { Box, Typography } from "@mui/material";
import MenuBar from "../../components/Menu"
import SelectLabels from "../../components/Select"
import CardRenderProjeto from "../../components/CardRenderProject";
import { otherProjectProps } from "./otherprojectdata";

const Discover = () => {
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
                    <SelectLabels />
                    <Box sx={{ display: "flex", gap: "24px", flexWrap: "wrap", cursor: "pointer" }}>
                        {otherProjectProps.length &&
                            otherProjectProps.map((item, index) =>
                                <CardRenderProjeto
                                    key={index}
                                    avatar={item.avatar}
                                    author={item.author}
                                    image={item.image}
                                    date={item.date}
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