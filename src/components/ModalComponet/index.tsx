import { Box, Button, Modal } from "@mui/material"
import { ModalComponentProps } from "./types";
import { Close } from "@mui/icons-material";
import { useContext } from "react";
import ModalControllerContext from "../../providers/modalController";

const ModalComponent = ({ open, onClose, children, width, height, hasCloseButton, hasBorderRadius, bottom }: ModalComponentProps) => {
    const { toggle } = useContext(ModalControllerContext);

    return (

        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                bottom: { bottom },
                left: '50%',
                transform: 'translateX(-50%)',
                width: { width },
                height: { height },
                bgcolor: 'background.paper',
                border: "none",
                background: '#f9f9f9',
                boxShadow: 24,
                p: 4,
                overflow: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: '#888 #f9f9f9',
                '@media (max-width: 800px)': {
                    maxWidth: "266xp",
                    borderTopLeftRadius: hasBorderRadius ? "32px" : "none",
                    borderTopRightRadius: hasBorderRadius ? "32px" : "none"
                }
            }}>
                {hasCloseButton &&
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Close sx={{ cursor: "pointer" }} onClick={toggle} />
                    </Box>
                }

                {children}
            </Box>
        </Modal>
    )

}

export default ModalComponent;