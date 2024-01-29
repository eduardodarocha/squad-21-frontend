import { Collections } from "@mui/icons-material"
import { Box, Card, Typography } from "@mui/material"
import { CardAddProjetoProps } from "./types";

const CardAddProjeto = ({hasTitle, onClick}: CardAddProjetoProps) => {
    return (
        <Box sx={{ display: "flex" }}>
            <Card
                variant="outlined"
                sx={{
                    display: 'flex',
                    cursor: "pointer",
                    border: "none",
                    flexDirection: "column",
                    borderRadius: "4px",
                    background: "#E6E9F2",
                    fontFamily: "Roboto",
                    maxWidth: "389px",
                    padding: "68px 59px 68px 60px",
                    justifyContent: "center",
                    alignItems: 'center',
                    gap: '16px'
                }}
                onClick={onClick}>
                <Collections sx={{ width: '46px', height: '46px' }} />
                <Box sx={{ gap: '16px' }}>
                    {hasTitle &&
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                            Adicione seu primeiro projeto
                        </Typography>
                    }
                    <Typography sx={{ fontSize: 14, width: 270 }} color="text.secondary">
                        Compartilhe seu talento com milhares de pessoas
                    </Typography>
                </Box>
            </Card>
        </Box>
    )
}

export default CardAddProjeto;