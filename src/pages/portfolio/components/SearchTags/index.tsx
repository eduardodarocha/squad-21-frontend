import { Box, Typography } from "@mui/material";
import SelectLabels from "../../../../components/Select";

const SearchTags = () => {
    return <Box sx={{
        display: "flex", flexDirection: "column", gap: "16px",
        '@media (max-width: 800px)': {
            paddingTop: "40px"
        }
    }}>
        <Typography variant="h6" style={{
            color: "#0B0C0D",
            opacity: 0.6,
            fontFamily: "Roboto",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "20px",
        }}>
            Meus Projetos
        </Typography>
        <SelectLabels />
    </Box>
}

export default SearchTags;