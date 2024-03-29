import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PreviewContentProps } from "./types";

const PreviewContent = (data: PreviewContentProps) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    const { title, author, date, description, image, tags, url, width, isSaved } = data;

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
        <Box sx={{
            display: "flex", flexDirection: "column", gap: "32px", width: { width }, margin: "auto", cursor: "pointer",
            '@media (max-width: 800px)': {
                maxWidth: "360px",
            }
        }}>
            {isMobile ? (<>

                <Typography sx={{ fontFamily: "Roboto", fontSize: "24px", width: "100%", textAlign: "center" }}>{title}</Typography>
                <Box sx={{
                    maxWidth: "312px",
                    height: "258px"
                }}>
                    {image && <img src={isSaved ? image : URL.createObjectURL(image)} style={{ width: "100%", height: "100%" }} />}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", gap: "8px" }}>
                        <Box sx={{ borderRadius: "50%" }}>
                            <img src="../assets/images/avatar.png" alt="Avatar" style={{ borderRadius: "50%", width: "40px" }} />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography sx={{ fontFamily: "Roboto", fontSize: "16px" }}>{author}</Typography>
                            <Typography sx={{ fontFamily: "Roboto", fontSize: "16px" }}>{date}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: "8px" }}>
                        <Box sx={{ display: "flex", padding: "4px", borderRadius: "100px", background: "#ebebeb", alignItems: "center", justifyContent: "center" }}>
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
                    </Box>
                </Box>
            </>
            ) :
                (
                    <>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", gap: "8px" }}>
                                <Box sx={{ borderRadius: "50%" }}>
                                    <img src="../assets/images/avatar.png" alt="Avatar" style={{ borderRadius: "50%", width: "40px" }} />
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Typography sx={{ fontFamily: "Roboto", fontSize: "16px" }}>{author}</Typography>
                                    <Typography sx={{ fontFamily: "Roboto", fontSize: "16px" }}>{date}</Typography>
                                </Box>
                            </Box>
                            <Typography sx={{ fontFamily: "Roboto", fontSize: "24px" }}>{title}</Typography>
                            <Box sx={{ display: "flex", gap: "8px" }}>
                                <Box sx={{ display: "flex", padding: "4px", borderRadius: "100px", background: "#ebebeb", alignItems: "center", justifyContent: "center" }}>
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
                            </Box>
                        </Box>
                        <Box sx={{
                            maxWidth: "838px",
                            height: "558px",
                        }}>
                            {image && <img src={isSaved ? image : URL.createObjectURL(image)} style={{ width: "100%", height: "100%" }} />}
                        </Box>
                    </>
                )}
            <Box sx={{
                maxWidth: "838px",
                '@media (max-width: 800px)': {
                    maxWidth: "312px",
                }
            }}>
                <Typography sx={{ fontFamily: "Roboto", fontSize: "16px", fontStyle: 'normal', fontWeight: 400, textAlign: "justify" }}>
                    {description}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>Download:</Typography>
                <Link style={{ fontFamily: "Roboto", fontSize: "16px" }} to={url} >
                    {url}
                </Link>
            </Box>
        </Box>
    )
}

export default PreviewContent;