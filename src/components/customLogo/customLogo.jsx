import "./customLogo.css";
import { useCreateObjectUrl } from "../../hooks/image";
import BrandLogoMock from "../../assets/brand_logo_mock.svg";
import { Resizable } from "re-resizable";
import { useState, useRef } from "react";

function borderSizeWidth(width) {
  return Math.max(0, Math.min(width, 145));
}

function borderSizeHeight(height) {
  return Math.max(0, Math.min(height, 145));
}

export default function CustomLogo({
  className,
  file,
  onImageRectChange,
  imageRect,
}) {
  const logo = useCreateObjectUrl(file, BrandLogoMock);
  const [isResizeActive, setIsResizeActive] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const imgRef = useRef(null);

  // Function to handle when resizing stops
  const onResizeStop = (e, direction, ref, d) => {
    const newWidth = imageRect.width + d.width;
    const newHeight = imageRect.height + d.height;

    setIsResizeActive(false);

    onImageRectChange?.({
      x: imageRect.x,
      y: imageRect.y,
      width: borderSizeWidth(newWidth),
      height: borderSizeHeight(newHeight),
    });
  };

  function handleResizeStart() {
    setIsDragActive(false);
    setIsResizeActive(true);
  }

  function handleContainerMouseDown(e) {
    if (e.target === imgRef.current && !isResizeActive) {
      setIsDragActive(true);
    }
    e.stopPropagation();
    e.preventDefault();
  }

  function handleContainerMouseLeave() {
    setIsDragActive(false);
  }

  function handleContainerMouseUp() {
    setIsDragActive(false);
  }

  function handleContainerMouseMove(e) {
    if (isDragActive) {
      const { movementX, movementY } = e;

      const newImageRect = {
        x: imageRect.x + movementX,
        y: imageRect.y + movementY,
        width: imageRect.width,
        height: imageRect.height,
      };

      onImageRectChange?.(newImageRect);
    }
  }

  return (
    <div
      className={`${className} c-custom-logo`}
      style={{
        transform: `translate(${imageRect.x}px, ${imageRect.y}px)`,
      }}
    >
      <Resizable
        defaultSize={{
          width: imageRect.width,
          height: imageRect.height,
        }}
        onResizeStart={handleResizeStart}
        onResizeStop={onResizeStop}
        resizeHandles={
          isDragActive
            ? undefined
            : ["sw", "se", "nw", "ne", "w", "e", "n", "s"]
        }
      >
        <div className="c-custom-logo__resize-border">
          <img
            ref={imgRef}
            className="c-custom-logo__image"
            src={logo}
            onMouseDown={handleContainerMouseDown}
            onMouseLeave={handleContainerMouseLeave}
            onMouseUp={handleContainerMouseUp}
            onMouseMove={handleContainerMouseMove}
          />
        </div>
      </Resizable>
    </div>
  );
}
