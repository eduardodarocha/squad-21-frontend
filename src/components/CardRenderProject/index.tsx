import { Edit } from "@mui/icons-material"
import { Avatar, Badge, Box, Card, CardActions, CardContent, CardMedia, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import { ProjectProps } from "../../pages/portfolio/types";
import { useState } from "react";

const settings = ['Editar', 'Excluir'];

const CardRenderProjeto = (data: ProjectProps) => {
    const { image, author, date, tags, hasMenu, hasTags } = data;
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Box sx={{ display: "flex" }}>
            <Card
                variant="outlined"
                sx={{
                    position: "relative",
                    display: 'flex',
                    border: "none",
                    flexDirection: "column",
                    borderRadius: "4px",
                    fontFamily: "Roboto",
                    maxWidth: "389px",
                    justifyContent: "center",
                    gap: '8px'
                }}>

                <img src={image} />
                <CardContent sx={{ display: "flex", padding: 0, justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <Avatar sx={{ width: "24px", height: "24px" }} alt="C" src=" " />
                        <Typography sx={{
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: "400",
                        }}>
                            {author}
                        </Typography>
                        <Box sx={{ width: "5px", height: "5px", borderRadius: "50%", background: "#515255" }} />
                        <Typography sx={{
                            fontFamily: "Roboto",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: "400",
                        }}>
                            {date}
                        </Typography>
                    </Box>
                    {hasTags && <Box sx={{ display: "flex", gap: "8px" }}>
                        {tags.map((item, index) =>
                            <Box key={index} sx={{ padding: "4px", borderRadius: "100px", background: "#ebebeb" }}>
                                <Typography sx={{
                                    padding: "3px 6px",
                                    fontFamily: "Roboto",
                                    fontSize: "13px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                }}>
                                    {item}
                                </Typography>
                            </Box>
                        )}
                    </Box>}
                </CardContent>
                {hasMenu &&
                    <>
                        <Tooltip title="Abrir opcões do manu">
                            <IconButton onClick={handleOpenUserMenu} sx={{
                                display: "flex",
                                position: "absolute",
                                background: "#FFCC99",
                                width: "28px",
                                height: "28px",
                                top: "16px",
                                right: "16px",
                                '&:hover': {
                                    backgroundColor: '#FFEECC',
                                },
                            }}>
                                <Badge color="secondary">
                                    <Edit />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '29px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    sx={{ '&:hover': { backgroundColor: '#FFEECC', }, }}
                                    key={setting}
                                    onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                }
            </Card>
        </Box>
    )
}

export default CardRenderProjeto;