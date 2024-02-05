import { Box, Button, Typography } from "@mui/material";
import { MessageModalProps } from "./types";
import theme from "../../../../theme";

const MessageModal = ({ title, action, icon, hasAction, onConfirm, onCancel }: MessageModalProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                padding: "4px 6px",
                backgroundColor: "#FCFDFF",
                alignItems: "center",
                justifyContent: "Center"
            }}>
            {action && <Typography sx={{ color: "#000", textAlign: "center" }}>{action}</Typography>}
            <Typography sx={{ color: "#000", textAlign: "center" }}>{title}</Typography>
            {!action && icon}
            {hasAction ? (<Box sx={{ display: "flex", gap: "24px" }}>
                <Button onClick={() => {
                    if (onConfirm) {
                        onConfirm();
                    }
                }} variant="contained" color="primary">Excluir</Button>
                <Button variant="contained" sx={{
                    backgroundColor: theme.palette.grey[50],
                    color: theme.palette.grey[100],
                    '&:hover': {
                        backgroundColor: theme.palette.grey[200],
                    },
                }}
                    onClick={() => {
                        if (onCancel) {
                            onCancel();
                        }
                    }}
                >Cancelar</Button>
            </Box>) : <Button id="button" type="submit" variant="contained" size="large" color="primary" onClick={() => {
                if (onCancel) {
                    onCancel();
                }
            }}>VOLTAR PARA PROJETOS</Button>}

        </Box>
    )
}

export default MessageModal;