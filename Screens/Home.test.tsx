import "@testing-library/react-native";
import { fireEvent, render } from "@testing-library/react-native";
import { Context } from "../ContextApi/ContextProvider";
import Home from "./Home";
import moment from "moment";

describe("location details is empty", () => {
  jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
  const context: any = {
    setTime: jest.fn(),
    setDate: jest.fn(),
    myLocation: jest.fn(),
    setLocationData: jest.fn(),
    setCurrLocation: jest.fn(),
  };

  test("render", () => {
    const test = render(<Home/>);
  });
  test("render", async () => {
    const test = render(
      <Context.Provider value={context}>
        <Home/>
      </Context.Provider>
    );
   
expect(test.getByTestId("list-current-label")).toBeDefined();
  });
});

describe("location details is not empty", () => {
  jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
  jest.setTimeout(20000);
  const context: any = {
    location: [{ longitude: 72, latitude: 12 }],
    locationData: Array.from({ length: 30 }, () =>
      Math.floor(Math.random() * 30)
    ),
    currLocation: [{ formatted: "India" }],
    date: [moment().format("DD/MM/YYYY"), moment().format("DD/MM/YYYY")],
    time: [moment().format("HH:mm:ss"), moment().format("DD/MM/YYYY")],
    setTime: jest.fn(),
    setDate: jest.fn(),
    myLocation: jest.fn(),
    setLocationData: jest.fn(),
    setCurrLocation: jest.fn(),
  };

  test("render", async () => {
    const test = render(
      <Context.Provider value={context}>
        <Home/>
      </Context.Provider>
    );
    await new Promise((r) => setTimeout(r, 13000));

    const deleteBtn = test.getByTestId("list-previous-remove-0");
    fireEvent.press(deleteBtn);

    const remove_Btn = test.getByTestId("list-clear-all-button");
    fireEvent.press(remove_Btn);
  });
});


