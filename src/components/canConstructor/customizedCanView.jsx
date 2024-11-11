import "./can-custom-view.css";
import CanAimLogo from "./can-aim-logo/can-aim-logo";
import CanBackLogo from "../canBackLogo/canBackLogo";
import CanView from "./canView";
import { useRef } from "react";
import CustomLogo from "../customLogo/customLogo";

export default function CustomizedCanView({
  logoFile1,
  logoFile2,

  imageRect1,
  imageRect2,

  onImageRectChange1,
  onImageRectChange2,

  canColor,
  stickerColor,
  backgroundColor,
  aimHighLogoColor,

  isWaterLayerVisible,
}) {
  const canContainerRef = useRef(null);

  return (
    <>
      <div className="c-customized-can-view-container" ref={canContainerRef}>
        <div className="magic-background-light"></div>
        <div className="c-custom-can-view-result" id="can-result">
          <CustomLogo
            className="c-custom-can__logo1"
            file={logoFile1}
            onImageRectChange={onImageRectChange1}
            imageRect={imageRect1}
          />
          <CustomLogo
            className="c-custom-can__logo2"
            file={logoFile2}
            onImageRectChange={onImageRectChange2}
            imageRect={imageRect2}
          />
          <div className="c-custom-can__target">
            <CanBackLogo color={stickerColor} />
          </div>
          <div id="can-result-view" className="can-result__can-view">
            <CanView
              canColor={canColor}
              stickerColor={backgroundColor}
              isWaterLayerVisible={isWaterLayerVisible}
            >
              <div className="c-custom-can__aim-logo">
                <CanAimLogo color={aimHighLogoColor} />
              </div>
            </CanView>
          </div>
          <div
            className="c-can-result__can-text"
            style={{ color: stickerColor }}
          >
            <div className="c-can-result__water">Water</div>
            <div className="c-can-result__can-volume">19.2 FL OZ (568 ml)</div>
          </div>
        </div>
      </div>
    </>
  );
}
