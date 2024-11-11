import React, { useEffect, useRef } from "react";
import CanWithWaterImage from "../../assets/images/water.png";

function CanBackground({ color: newColor, className }) {
  const originalImageRef = useRef(null);
  const canvasRef = useRef(null);
  const [src, setSrc] = React.useState("");

  useEffect(() => {
    const img = new Image();
    img.src = CanWithWaterImage;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const targetR = parseInt(newColor.slice(1, 3), 16);
      const targetG = parseInt(newColor.slice(3, 5), 16);
      const targetB = parseInt(newColor.slice(5, 7), 16);

      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        if (red > 10) {
          data[i] = targetR;
          data[i + 1] = targetG;
          data[i + 2] = targetB;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      requestAnimationFrame(() => {
        setSrc(canvasRef.current?.toDataURL());
      });
    };
  }, [newColor]); // Re-run effect when newColor changes

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <img
        ref={originalImageRef}
        src={CanWithWaterImage}
        alt="Canned Water"
        style={{ display: "none" }}
      />
      <img className={className} src={src} />
    </div>
  );
}

export default CanBackground;
