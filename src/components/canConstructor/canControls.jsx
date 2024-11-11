import FileUploadButton from "./fileUploadButton/fileUploadButton";
import { CirclePicker, ChromePicker as ReactColorPicker } from "react-color";
import { useState, useRef } from "react";
import {
  Popover,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import classNames from "classnames";
import UnderlinedText from "./../underlineText";
import { CAN_COLOR_LABEL_MAP } from "../const";
import { toCanvas } from "html-to-image";
import download from "downloadjs";
import LoadingButton from "@mui/lab/LoadingButton";

const circleSize = 20;
const circleSpacing = 8;
const countInRow = 7;

export function ColorPicker({
  colors,
  onChange,
  valueLabel,
  label,
  color,
  isCustomColorAllowed,
}) {
  const customColorPickerRef = useRef(null);
  const [isCustomColorVisible, setIsCustomColorVisible] = useState(false);

  function handleOpenCustomColor() {
    setIsCustomColorVisible(true);
  }

  function handleCloseCustomColor() {
    setIsCustomColorVisible(false);
  }

  const handleColorChange =
    (onChange) =>
    ({ hex }) =>
      onChange(hex?.toUpperCase());

  return (
    <div>
      <label className="c-color-picker-label" onClick={handleOpenCustomColor}>
        <span className="c-color-picker-label__label">{label}</span>
        <UnderlinedText
          className={classNames("c-color-picker-label__color", {
            "m-upper-case": !valueLabel,
          })}
          color={color}
          thickness={2}
          gap={0.5}
        >
          {valueLabel || color}
        </UnderlinedText>
      </label>
      <CirclePicker
        className="react-color__circle"
        colors={colors}
        onChangeComplete={handleColorChange(onChange)}
        circleSize={circleSize}
        width={(circleSize + circleSpacing) * countInRow}
        circleSpacing={circleSpacing}
        color={color}
      />
      <div>
        {isCustomColorAllowed && (
          <div className="c-color-picker__custom-color">
            <Button
              variant="text"
              onClick={handleOpenCustomColor}
              ref={customColorPickerRef}
            >
              <span className="c-color-picker__custom-color-text">
                + Custom color
              </span>
            </Button>
            <Popover
              open={isCustomColorVisible}
              anchorEl={customColorPickerRef.current}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              onClose={handleCloseCustomColor}
            >
              <ReactColorPicker
                color={color}
                onChange={handleColorChange(onChange)}
                disableAlpha={true}
              />
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CanControls({
  onChangeLogo1,
  onChangeLogo2,
  onChangeCanColor,
  onChangeStickerColor,
  onChangeBackgroundColor,
  onChangeWaterLayerVisible,
  onChangeAimHighLogoColor,

  canColor,
  stickerColor,
  backgroundColor,
  aimHighLogoColor,

  isWaterLayerVisible,

  imageRect1,
  imageRect2,
  onImageRectChange1,
  onImageRectChange2,
}) {
  const [isExportLoading, setIsExportLoading] = useState(false);

  const handleExportClick = async () => {
    setIsExportLoading(true);

    setTimeout(async () => {
      const container = document.getElementById("can-result");

      try {
        // Use html2canvas or similar to take a snapshot
        const canvas = await toCanvas(container, { scale: 1 });
        const dataUrl = canvas.toDataURL("image/png");
        await download(dataUrl, "aim-high.png");
      } catch (error) {
        console.error("Error capturing the export:", error);
      } finally {
        setIsExportLoading(false);
      }
    }, 300);
  };

  return (
    <Grid container rowGap={3}>
      <div className="c-upload-group">
        <FileUploadButton
          label="logo 1"
          onFileUpload={onChangeLogo1}
          imageRect={imageRect1}
          onImageRectChange={onImageRectChange1}
        />
        <FileUploadButton
          label="logo 2"
          onFileUpload={onChangeLogo2}
          imageRect={imageRect2}
          onImageRectChange={onImageRectChange2}
        />
      </div>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item sm={12} md={6}>
          <ColorPicker
            colors={["#FDFDFD", "#0C0C0C", "#FACC15"]}
            onChange={onChangeCanColor}
            label="CAN COLOR"
            valueLabel={CAN_COLOR_LABEL_MAP[canColor]}
            color={canColor}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isWaterLayerVisible}
                onChange={(event) =>
                  onChangeWaterLayerVisible(event.target.checked)
                }
              />
            }
            label="Show water layer"
          />
        </Grid>

        <Grid item sm={12} md={6}>
          <ColorPicker
            colors={[
              "#FDFDFD",
              "#EF4444",
              "#F97316",
              "#FACC15",
              "#4ADE80",
              "#2DD4BF",
              "#3B82F6",
              "#333333",
              "#F43F5E",
              "#D946EF",
              "#8B5CF6",
              "#0EA5E9",
              "#10B981",
              "#84CC16",
            ]}
            onChange={onChangeAimHighLogoColor}
            label="Aim high logo color"
            color={aimHighLogoColor}
            isCustomColorAllowed={true}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <ColorPicker
            colors={[
              "#FDFDFD",
              "#EF4444",
              "#F97316",
              "#FACC15",
              "#4ADE80",
              "#2DD4BF",
              "#3B82F6",
              "#0C0C0C",
              "#F43F5E",
              "#D946EF",
              "#8B5CF6",
              "#0EA5E9",
              "#10B981",
              "#84CC16",
            ]}
            onChange={onChangeStickerColor}
            label="sticker color"
            color={stickerColor}
            isCustomColorAllowed={true}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <ColorPicker
            colors={[
              "#FDFDFD",
              "#EF4444",
              "#F97316",
              "#FACC15",
              "#4ADE80",
              "#2DD4BF",
              "#3B82F6",
              "#333333",
              "#F43F5E",
              "#D946EF",
              "#8B5CF6",
              "#0EA5E9",
              "#10B981",
              "#84CC16",
            ]}
            onChange={onChangeBackgroundColor}
            label="BACKGROUND COLOR"
            color={backgroundColor}
            isCustomColorAllowed={true}
          />
        </Grid>
      </Grid>
      <LoadingButton
        variant="contained"
        color="primary"
        fullWidth={false}
        style={{ width: 205, height: 40 }}
        onClick={handleExportClick}
        loading={isExportLoading}
        disabled={isExportLoading}
      >
        Download Mock up
      </LoadingButton>
    </Grid>
  );
}
