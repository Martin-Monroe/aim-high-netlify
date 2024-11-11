import "./can-constructor.css";
import CustomizedCanView from "./customizedCanView.jsx";
import CanControls from "./canControls.jsx";
import { useCallback, useState } from "react";
import { Grid, Container, Box } from "@mui/material";

const initialImageReact1 = {
  x: 0,
  y: 0,
  width: 80,
  height: 90,
};

const initialImageReact2 = {
  x: 0,
  y: 0,
  width: 80,
  height: 90,
};

export default function CanConstructor() {
  const [logoFile1, setOriginalLogo1] = useState(null);
  const [logoFile2, setOriginalLogo2] = useState(null);
  const [canColor, setCanColor] = useState("#FDFDFD");
  const [stickerColor, setStickerColor] = useState("#0C0C0C");
  const [backgroundColor, setBackgroundColor] = useState("#FDFDFD");
  const [aimHighLogoColor, setAimHighLogoColor] = useState("#0C0C0C");

  const [isWaterLayerVisible, setIsWaterLayerVisible] = useState(true);

  const [imageRect1, setImageRect1] = useState(initialImageReact1);
  const [imageRect2, setImageRect2] = useState(initialImageReact2);

  const setLogo1 = useCallback((file) => {
    setOriginalLogo1(file);
    if (!file) {
      setImageRect1(initialImageReact1);
    }
  }, []);

  const setLogo2 = useCallback((file) => {
    setOriginalLogo2(file);
    if (!file) {
      setImageRect2(initialImageReact2);
    }
  }, []);

  return (
    <Box md={{ mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item sm={12} md={6}>
            <CustomizedCanView
              logoFile1={logoFile1}
              logoFile2={logoFile2}
              canColor={canColor}
              stickerColor={stickerColor}
              backgroundColor={backgroundColor}
              aimHighLogoColor={aimHighLogoColor}
              imageRect1={imageRect1}
              imageRect2={imageRect2}
              onImageRectChange1={setImageRect1}
              onImageRectChange2={setImageRect2}
              isWaterLayerVisible={isWaterLayerVisible}
            />
          </Grid>
          <Grid item sm={12} md={6} style={{ margin: "auto" }}>
            <CanControls
              onChangeLogo1={setLogo1}
              onChangeLogo2={setLogo2}
              onChangeCanColor={setCanColor}
              onChangeStickerColor={setStickerColor}
              onChangeBackgroundColor={setBackgroundColor}
              canColor={canColor}
              stickerColor={stickerColor}
              backgroundColor={backgroundColor}
              imageRect1={imageRect1}
              imageRect2={imageRect2}
              onImageRectChange1={setImageRect1}
              onImageRectChange2={setImageRect2}
              isWaterLayerVisible={isWaterLayerVisible}
              onChangeWaterLayerVisible={setIsWaterLayerVisible}
              onChangeAimHighLogoColor={setAimHighLogoColor}
              aimHighLogoColor={aimHighLogoColor}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
