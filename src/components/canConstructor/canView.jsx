import "./canView.css";
import CanBackground from "./canBackground";
import { CAN_COLOR_LABEL_MAP } from "./../const";

import shadowsImage from "../../assets/images/soda/shadows.png";
import canWaterImage from "../../assets/images/soda/can_water.png";

import edgeBlack from "../../assets/images/soda/can_top_bottom_black.png";
import edgeGold from "../../assets/images/soda/can_top_bottom_gold.png";

const canEdgesImage = {
  Black: edgeBlack,
  Silver: null,
  Gold: edgeGold,
};

export default function CanView({
  canColor,
  stickerColor,
  isWaterLayerVisible,
  children,
}) {
  const canColorName = CAN_COLOR_LABEL_MAP[canColor];
  const linkToCap = canEdgesImage[canColorName];

  return (
    <div className="soda-container" aria-label="customized soda can">
      {linkToCap && (
        <img
          src={linkToCap}
          aria-hidden
          className="soda-layer coda-caps-colored"
        />
      )}
      <CanBackground
        color={stickerColor}
        className="soda-layer can-background"
      />
      <img
        src={shadowsImage}
        aria-hidden
        alt="Soda Shadows"
        className="soda-layer shadows-layer"
      />
      {isWaterLayerVisible && (
        <img
          src={canWaterImage}
          aria-hidden
          alt="Soda Water"
          className="soda-layer can-water-layer"
        ></img>
      )}
      <div
        className="place-holder-to-keep-object-size"
        style={{ height: 600 }}
        aria-hidden
      ></div>
      {children}
    </div>
  );
}
