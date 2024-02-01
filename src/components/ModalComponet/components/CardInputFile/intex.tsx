

























import React, { useContext, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Collections from '@mui/icons-material/Collections';
import { ImageControllerContext } from '../../../../providers/imageController';

interface ImageUploadCardProps {
  hasTitle?: boolean;
  onClick?: () => void;
}

const CardInputFile: React.FC<ImageUploadCardProps> = ({ hasTitle = true, onClick }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toggleImage } = useContext(ImageControllerContext);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    toggleImage(file || null);
    setSelectedFile(file || null);
  };

  const handleCardClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
          background: selectedFile ? 'white' : "#E6E9F2",
          fontFamily: "Roboto",
          width: '389px',   
          justifyContent: "center",
          alignItems: 'center',
          gap: '16px',
          overflow: 'hidden',
        }}
        onClick={handleCardClick}
      >
        <CardContent
          sx={{
            padding: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Pré-visualização"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <>
              <Collections sx={{ width: '46px', height: '46px' }} />
              <Box sx={{ gap: '16px' }}>
                {hasTitle && (
                  <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Adicione seu primeiro projeto
                  </Typography>
                )}
                <Typography sx={{ fontSize: 14, width: 270 }} color="text.secondary">
                  Compartilhe seu talento com milhares de pessoas
                </Typography>
              </Box>
            </>
          )}
        </CardContent>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
          ref={(el) => (fileInputRef.current = el)}
        />
      </Card>
    </Box>
  );
};

export default CardInputFile;