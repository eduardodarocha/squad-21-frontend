import { Edit } from "@mui/icons-material"
import { Avatar, Badge, Box, Card, CardContent, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import { ProjectProps } from "../../pages/portfolio/types";
import { useContext, useEffect, useState } from "react";
import { ListSingleProject } from "../../services/portfolio";
import { ProjectData } from "../../services/discover/types";
import ModalComponent from "../ModalComponet";
import ModalControllerContext from "../../providers/modalController";
import PreviewContent from "../ModalComponet/components/PreviewContent";
import { formatMonthYear } from "../../utils";
import AlertComponent from "../Alert";

const settings = ['Editar', 'Excluir'];

const CardRenderProjeto = (data: ProjectProps) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [projects, setProjects] = useState<ProjectData>();
    const [hasError, setHasError] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    const { isOpen, toggle } = useContext(ModalControllerContext);
    const [isPreviewContent, setPreviewContent] = useState(false);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenProject = async () => {
        try {
            setPreviewContent(true);
            toggle();
            const response = await ListSingleProject(data.id);
            setProjects(response);

        } catch (error) {
            setHasError(true);
        }
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

    return (
        <Box sx={{ display: "flex" }}>
            {isPreviewContent &&
                <ModalComponent open={isOpen} onClose={toggle} width={isMobile ? '82%' : '1042px'} height={isMobile ? "420px" : "680px"} bottom={isMobile ? 0 : 30} hasCloseButton hasBorderRadius>
                    <Box>
                        {projects && (
                            <PreviewContent
                                title={projects?.title}
                                avatar={""}
                                author={projects.user_name}
                                date={formatMonthYear(projects.created_at)}
                                image={projects.image_url}
                                description={projects.description}
                                url={projects.image_url}
                                tags={projects.tags}
                                width={isMobile ? '308px' : '838px'}
                                isSaved
                            />
                        )}
                        {hasError && (
                            <AlertComponent
                                severity="error"
                                title="Erro ao carregar projeto"
                            />
                        )}
                    </Box>
                </ModalComponent>}
            <Card
                variant="outlined"
                sx={{
                    position: "relative",
                    display: 'flex',
                    border: "none",
                    flexDirection: "column",
                    borderRadius: "4px",
                    fontFamily: "Roboto",
                    width: "100%",
                    maxWidth: "389px",
                    justifyContent: "center",
                    gap: '8px',
                    '@media (max-width: 800px)': {
                        maxWidth: "312px",
                    }
                }}
                onClick={handleOpenProject}
            >

                <img src={data.image} />
                <CardContent sx={{ display: "flex", padding: 0, justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <Avatar sx={{ width: "24px", height: "24px" }} alt="Avatar" src="./assets/images/avatar.png" />
                        <Box sx={{
                            display: "flex", gap: "8px", alignItems: "center",
                            '@media (max-width: 800px)': {
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                gap: 0
                            }
                        }}>
                            <Typography sx={{
                                fontFamily: "Roboto",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: "400",
                            }}>
                                {data.author}
                            </Typography>
                            <Box sx={{
                                width: "5px", height: "5px", borderRadius: "50%", background: "#515255",
                                '@media (max-width: 800px)': {
                                    display: "none"
                                }
                            }} />
                            <Typography sx={{
                                fontFamily: "Roboto",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: "400",
                            }}>
                                {data.date}
                            </Typography>
                        </Box>
                    </Box>
                    {data.tags !== "undefined" &&
                        <Box sx={{ display: "flex", padding: "4px", borderRadius: "100px", background: "#ebebeb", alignItems: "center", justifyContent: "center", width: "37px", height: "32px" }}>
                            <Typography sx={{
                                padding: "3px 6px",
                                fontFamily: "Roboto",
                                fontSize: "13px",
                                fontStyle: "normal",
                                fontWeight: "400",
                            }}>
                                {data.tags}
                            </Typography>
                        </Box>
                    }
                </CardContent>
                {data.hasMenu &&
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