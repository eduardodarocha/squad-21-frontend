import { Box, Modal } from "@mui/material"
import { useState } from "react";
import { ModalComponentProps } from "./types";

const ModalComponent = ({ open, onClose, children, width, height }: ModalComponentProps) => {
    return (

        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: {width},
                height: {height},
                bgcolor: 'background.paper',
                border: "none",
                background: '#f9f9f9',
                boxShadow: 24,
                p: 4,
            }}>
                {children}
            </Box>
        </Modal>
    )

}

export default ModalComponent;