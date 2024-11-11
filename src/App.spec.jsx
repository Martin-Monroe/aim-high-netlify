import { render, screen } from "@testing-library/react";
import App from "./App.jsx";
import "@testing-library/jest-dom";

test("renders app", () => {
  render(<App />);
  const linkElement = screen.getByText(/customize your can with Aim High/i);
  expect(linkElement).toBeInTheDocument();
});
