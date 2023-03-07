import React, { createContext, useState } from "react";
import { View } from "react-native";

export const Context = createContext({
  location: [],
  locationData: [],
  time: [],
  date: [],
  currLocation: [],
  setLocationData: (a: any) => {},
  setTime: (a: any) => {},
  setDate: (a: any) => {},
  myLocation: (a: any) => {},
  setCurrLocation: (a: any) => {},
});
function ContextProvider({ children }: any) {
  const [mylocation, setMyLocation] = useState([]);
  const [locationData, setLocationData] = useState<any>([]);
  const [time, setTime] = useState<any>([]);
  const [date, setDate] = useState<any>([]);
  const [curr_Location, setCurrLocation] = useState<any>([]);

  const context: any = {
    mylocation,
    locationData,
    time,
    date,
    curr_Location,
    setLocationData,
    setTime,
    setDate,
    setCurrLocation,
    setMyLocation,
  };

  return (
    <View style={{ flex: 1 }}>
      <Context.Provider value={context}>{children}</Context.Provider>
    </View>
  );
}

export default ContextProvider;
