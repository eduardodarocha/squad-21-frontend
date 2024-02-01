import { Box, Button, Typography } from "@mui/material";
import { MessageModalProps } from "./types";
import { useContext } from "react";
import ModalControllerContext from "../../../../providers/modalController";

const MessageModal = ({ title, icon }: MessageModalProps) => {
    const { toggle } = useContext(ModalControllerContext);

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
            <Typography sx={{ color: "#000", textAlign: "center" }}>{title}</Typography>
            {icon}
            <Button id="button" type="submit" variant="contained" size="large" color="primary" onClick={toggle}>VOLTAR PARA PROJETOS</Button>
        </Box>
    )
}

export default MessageModal;