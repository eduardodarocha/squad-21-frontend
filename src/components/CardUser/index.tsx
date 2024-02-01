import { useContext } from "react";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material"
import ModalControllerContext from "../../providers/modalController";

const CardUser = () => {
    const {isOpen, toggle} = useContext(ModalControllerContext);
    return (

        <Box sx={{ display: 'flex', justifyContent: "center" }}>
            <Card sx={{ display: 'flex', gap: '42px', width: '364px', height: "122px", boxShadow: 'none' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 122, borderRadius: 50 }}
                    image="../assets/images/avatar122.png"
                    alt="Avatar ou imagem do perfil"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <CardContent sx={{ padding: 0 }}>
                        <Typography variant="h5">
                            Camila Soares
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Brasil
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button onClick={toggle} variant="contained" size="medium" color="secondary">ADICIONAR PROJETO</Button>
                    </Box>
                </Box>
            </Card>
        </Box>

    )
}
export default CardUser;