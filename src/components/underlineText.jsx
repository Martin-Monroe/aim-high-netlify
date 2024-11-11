const UnderlinedText = ({ children, color, thickness, gap, className }) => {
  const style = {
    display: "inline-block",
    position: "relative",
    marginBottom: gap,
  };

  const underlineStyle = {
    content: '""',
    position: "absolute",
    left: 0,
    right: 0,
    bottom: `-${gap}px`, // Adjust the gap between the text and underline
    height: thickness, // Thickness of the underline
    backgroundColor: color, // Color of the underline
  };

  return (
    <span style={style} className={className}>
      {children}
      <span style={underlineStyle}></span>
    </span>
  );
};

export default UnderlinedText;
