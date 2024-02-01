import { Box, Typography } from "@mui/material";
import { PreviewContentProps } from "./types";
import { Link } from "react-router-dom";

const PreviewContent = (data: PreviewContentProps) => {
    const { title, author, avatar, date, description, image, tags, url, width } = data;
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "32px", width:{width}, margin: "auto"}}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: "8px" }}>
                    <Box sx={{ borderRadius: "50%" }}><img src={avatar} alt="Avatar" style={{borderRadius: "50%"}}/></Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography sx={{ fontFamily: "Roboto", fontSize: "16px" }}>{author}</Typography>
                        <Typography sx={{ fontFamily: "Roboto", fontSize: "16px" }}>{date}</Typography>
                    </Box>
                </Box>
                <Typography sx={{ fontFamily: "Roboto", fontSize: "24px" }}>{title}</Typography>
                <Box sx={{display: "flex", gap: "8px"}}>
                    {/*{
                        tags.map((item, index) =>*/}
                            <Box sx={{ display:"flex", padding: "4px", borderRadius: "100px", background: "#ebebeb", alignItems:"center", justifyContent:"center" }}>
                                <Typography sx={{
                                    padding: "3px 6px",
                                    fontFamily: "Roboto",
                                    fontSize: "13px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                }}>
                                    {tags}
                                </Typography>
                            </Box>
                        {/*)
                    }*/}
                </Box>
            </Box>
            <Box sx={{maxWidth: "838px"}}>
               {image && <img src={URL.createObjectURL(image)} style={{width:"100%"}}/>}
            </Box>
            <Box sx={{maxWidth: "838px"}}>
                <Typography sx={{ fontFamily: "Roboto", fontSize: "16px", fontStyle: 'normal', fontWeight: 400 }}>
                    {description}
                </Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Typography>Download:</Typography>
                <Link style={{ fontFamily: "Roboto", fontSize: "16px" }} to={url} >
                    {url}
                </Link>
            </Box>
        </Box>
    )
}

export default PreviewContent;