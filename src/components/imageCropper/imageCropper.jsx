import "react-image-crop/dist/ReactCrop.css";
import "./image-cropper.css";

import { useState, useCallback, useRef } from "react";
import { Popover, Box, IconButton, TextField, Typography } from "@mui/material";
import ReactCrop from "react-image-crop";
import { useCreateObjectUrl } from "../../hooks/image";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Draggable from "react-draggable";

const initCropValue = {
  aspect: 16 / 9,
  width: 50,
  height: 50,
  x: 0,
  y: 0,
};

const ImageCropper = ({
  file,
  onChange,
  isOpen,
  onClose,
  imageRect,
  onImageRectChange,
}) => {
  const [crop, setCrop] = useState(initCropValue);
  const imageRef = useRef(null);

  const imageSrc = useCreateObjectUrl(file);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    onClose();
    setCrop(initCropValue);
  };

  const onCropComplete = useCallback(
    (crop) => {
      if (!crop.width || !crop.height || !imageRef.current) {
        return;
      }

      const canvas = document.createElement("canvas");
      const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        imageRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        blob.name = file?.name;
        onChange(blob);
      });
    },
    [onChange]
  );

  // Update crop state based on input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    onImageRectChange({ ...imageRect, [name]: Number(value) });
  };

  return (
    <Draggable>
      <Popover
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            style: {
              maxWidth: fullScreen ? "100vw" : "50vw",
              maxHeight: "100vh",
              padding: 20,
              zIndex: 100500,

              display: "flex",
              flexDirection: "column",
            },
          },
        }}
      >
        {imageSrc && (
          <div className="c-image-cropper-container">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={1}
            >
              <Typography variant="h6" component="div">
                Position: {file?.name || "unknown file name"}
              </Typography>
              <Box xs={{ gap: "5px" }}>
                <TextField
                  size="small"
                  label="X"
                  name="x"
                  type="number"
                  value={imageRect.x}
                  onChange={handleChange}
                  style={{ width: 60, marginRight: 8 }}
                />
                <TextField
                  size="small"
                  label="Y"
                  name="y"
                  type="number"
                  value={imageRect.y}
                  onChange={handleChange}
                  style={{ width: 60, marginRight: 8 }}
                />
                <TextField
                  size="small"
                  label="Width"
                  name="width"
                  type="number"
                  value={imageRect.width}
                  onChange={handleChange}
                  style={{ width: 60, marginRight: 8 }}
                />
                <TextField
                  size="small"
                  label="Height"
                  name="height"
                  type="number"
                  value={imageRect.height}
                  onChange={handleChange}
                  style={{ width: 60, marginRight: 8 }}
                />
              </Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={onCropComplete}
            >
              <img
                ref={imageRef}
                alt="Crop me"
                src={imageSrc}
                className="c-image-cropper-container__image"
              />
            </ReactCrop>
          </div>
        )}
      </Popover>
    </Draggable>
  );
};

export default ImageCropper;
