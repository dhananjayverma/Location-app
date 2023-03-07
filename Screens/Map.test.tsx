import "@testing-library/react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { Context } from "../ContextApi/ContextProvider";
import Map from "./Map";

describe("render", () => {
  jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
  const context: any = {
    removeLocation: jest.fn(),
    removeAll: jest.fn(),
    locationDetails: [{ formatted: "1" }],
    date: ["12/05/2022"],
    time: ["11:00:00:05"],
    setTime: jest.fn(),
    setDate: jest.fn(),
    setMyLocation: jest.fn(),
    setLocationData: jest.fn(),
    setCurrLocation: jest.fn(),
  };
  test("render", () => {
    const test = render(<Map />);
  });
  test("render", () => {
    const test = render(
      <Context.Provider value={context}>
        <Map />
      </Context.Provider>
    );

    const removeBtn = test.getByTestId("list-previous-remove-0");
    fireEvent.press(removeBtn);

    const removeAllBtn = test.getByTestId("list-clear-all-button");
    fireEvent.press(removeAllBtn);
  });
});
