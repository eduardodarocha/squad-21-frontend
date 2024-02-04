import { Box, Typography } from "@mui/material";
import SelectLabels from "../../../../components/Select";
import { useState } from "react";

const SearchTags = ({ onSelectChange }: { onSelectChange: (value: string) => void }) => {
    const [selectedTag, setSelectedTag] = useState('');

    const handleSelectChange = (value: string) => {
        setSelectedTag(value);
        onSelectChange(value);
    };
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
        <SelectLabels onSelectChange={handleSelectChange}/>
    </Box>
}

export default SearchTags;