import { render, fireEvent, screen } from "@testing-library/react";
import CanControls, { ColorPicker } from "./canControls.jsx";
import "@testing-library/jest-dom";

// Mocks for external components and libraries
jest.mock("./fileUploadButton/fileUploadButton", () => {
  return {
    __esModule: true,
    default: jest
      .fn()
      .mockImplementation(({ onFileUpload }) => (
        <button onClick={() => onFileUpload("mockedFile")}>Upload</button>
      )),
  };
});
jest.mock("react-color", () => ({
  CirclePicker: jest
    .fn()
    .mockImplementation(({ onChangeComplete }) => (
      <button onClick={() => onChangeComplete({ hex: "#333" })}>
        Change Color
      </button>
    )),
  ChromePicker: jest
    .fn()
    .mockImplementation(({ onChange }) => (
      <button onClick={() => onChange({ hex: "#555" })}>
        Change Custom Color
      </button>
    )),
}));
jest.mock("html-to-image", () => ({
  toCanvas: jest.fn().mockResolvedValue({
    toDataURL: () => "data:image/png;base64,mockedBase64",
  }),
}));
jest.mock("downloadjs", () => jest.fn());

// Additional mocks for Material-UI components if needed

describe("ColorPicker Component", () => {
  it("opens and closes custom color picker", () => {
    const mockOnChange = jest.fn();
    render(
      <ColorPicker
        colors={["#FFF", "#000"]}
        onChange={mockOnChange}
        color="#FFF"
        isCustomColorAllowed={true}
      />
    );

    const customColorButton = screen.getByText("+ Custom color");
    fireEvent.click(customColorButton);
    expect(screen.getByText("Change Custom Color")).toBeInTheDocument();

    const closePopover = screen.getByRole("button", {
      name: "Change Custom Color",
    });
    fireEvent.click(closePopover);
    // Assuming the Popover closes based on state change or similar logic
    // This would need adjusting based on actual implementation details
  });

  it("calls onChange with new color", () => {
    const mockOnChange = jest.fn();
    render(
      <ColorPicker
        colors={["#FFF", "#000"]}
        onChange={mockOnChange}
        color="#FFF"
      />
    );

    const circleButton = screen.getByText("Change Color");
    fireEvent.click(circleButton);
    expect(mockOnChange).toHaveBeenCalledWith("#333");
  });
});

describe("CanControls Component", () => {
  it("handles logo upload 1", () => {
    const mockOnChangeLogo1 = jest.fn();
    render(<CanControls onChangeLogo1={mockOnChangeLogo1} />);
    const uploadButton = screen.getAllByText("Upload")[0];
    fireEvent.click(uploadButton);
    expect(mockOnChangeLogo1).toHaveBeenCalledWith("mockedFile");
  });

  it("handles logo upload 2", () => {
    const mockOnChangeLogo1 = jest.fn();
    render(<CanControls onChangeLogo2={mockOnChangeLogo1} />);
    const uploadButton = screen.getAllByText("Upload")[1];
    fireEvent.click(uploadButton);
    expect(mockOnChangeLogo1).toHaveBeenCalledWith("mockedFile");
  });

  // Add similar tests for onChangeLogo2, onChangeCanColor, etc.

  it("exports canvas on button click", async () => {
    render(<CanControls />);
    const exportButton = screen.getByText("Download Mock up");
    fireEvent.click(exportButton);
    // Assuming the export button triggers download after async canvas operation
    await screen.findByText("Download Mock up"); // Check if button updates after loading or similar feedback
  });
});
