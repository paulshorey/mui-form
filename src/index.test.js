import "window/theme";
import React from "react";
import {
  validations,
  MuiForm,
  MuiInput,
  MuiSelect,
  MuiToggle,
  MuiButton
} from "./index";

it("exports primary components", () => {
  expect(typeof validations).toBe("object");
  expect(typeof MuiForm).toBe("function");
  expect(typeof MuiInput).toBe("function");
  expect(typeof MuiSelect).toBe("function");
  expect(typeof MuiToggle).toBe("function");
  expect(typeof MuiButton).toBe("function");
});
