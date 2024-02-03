import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { itemData } from './itemData';
import { Box } from '@mui/material';

export default function SelectLabels() {
  const [item, setItem] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setItem(event.target.value);
  };

  return (
    <Box>
      <FormControl sx={{
        width: "100%", maxWidth: "513px",
        '@media (max-width: 800px)': {
          maxWidth: "312px",
        }
      }}>
        <InputLabel id="demo-simple-select-helper-label">Buscar tags</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={item}
          label="Item"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Selecionar</em>
          </MenuItem>
          {itemData.map((item, index) =>
            <MenuItem key={index} value={item}>{item}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}