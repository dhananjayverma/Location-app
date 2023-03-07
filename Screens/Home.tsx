import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import moment from "moment";
import { Button } from "react-native-paper";
import { Context } from "../ContextApi/ContextProvider";
import { getLocationData} from "../src/Location";
import { post_Location } from "../src/Mylocation";
const Home=()=>{
  const context: any = useContext(Context);
  const [errorMsg, setErrorMsg] = useState("");
  const fetch_location = async () => {
    let longitude;
    let latitude;
    context.setTime((prevValue: any) => {
      return [...prevValue, moment().format("HH:mm:ss")];
    });
    context.setDate((prevValue: any) => {
      return [...prevValue, moment().format("MM/DD/YYYY")];
    });
    if (context.location?.length > 0) {
      let response = await getLocationData(
        context.location.latitude,
        context.location.longitude
      );
      await context.setLocationData(response.data.results);
      await context.setCurrLocation(response.data.results);
      post_Location(response.data.results, moment().format("HH:mm:ss"));
    } else {
      const getLocation = require("expo-location");

      let { status } = await getLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location: any = await getLocation.getCurrentPositionAsync({});
      longitude = await location.coords.longitude;
      latitude = await location.coords.latitude;
    }
    context.setCurrLocation([]);
    getLocationData(longitude, latitude).then((response: any) => {
      context.setLocationData((prevRes: any) => {
        return [...prevRes, ...response.data.results];
      });
      context.setCurrLocation(response.data.results);
      post_Location(
        response.data.results[0].formatted,
        moment().format("HH:mm:ss")
      );
    });
  };

  const updater = async () => {
    if (context.locationDetails?.length > 29) {
      await context.locationDetails?.shift();
      await context.time.shift();
      fetch_location();
    } else {
      fetch_location();
    }
  };

  const remove_All = () => {
    context.setLocationData([]);
    context.setCurrLocation([]);
    context.setTime([]);
    context.setDate([]);
  };

  const remove_Location = (id: number) => {
    context.setCurrLocation();
    context.setLocationData(
      context.locationDetails?.filter((data: any, index: number) => {
        return index !== id;
      })
    );
    context.setTime(
      context.time?.filter((data: any, index: number) => {
        return index !== id;
      })
    );
    context.setDate(
      context.date?.filter((data: any, index: number) => {
        return index !== id;
      })
    );
  };

  useEffect(() => {
    if (context.locationData?.length === 0) {
      updater();
    } else {
      const timer = setInterval(() => {
      updater();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [context.locationData]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>Location Manager</Text>
        </View>
        <View>
          <Text testID="list-current-label" style={styles.current}>
            Current Location
          </Text>
        </View>
        <View style={styles.box_alignment} testID="list-current-item">
          <View style={styles.box} testID="list-current-icon">
            <Text style={styles.box_text}>NA</Text>
          </View>
          <View style={styles.location}>
            <View>
              <Text
                testID="list-current-name"
                style={styles.location_text}
                numberOfLines={1}
              >
                {context.currLocation?.length > 0
                  ? context.currLocation[0]?.formatted
                  : "Wait location is loading.."}
              </Text>
            </View>
            <View>
              <Text style={styles.time} testID="list-current-time">
                {moment().format("MM/DD/YYYY")}, {moment().format("HH:mm:ss")}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.current}>Previous Location</Text>
        </View>
        <View style={styles.location_list}>
          <FlatList
            data={context.locationData}
            renderItem={(item) => {
              return (
                <View style={styles.location_data}>
                  <View style={styles.location_line}>
                    <Text
                      testID={`List-previous-name-${item.index}`}
                      style={styles.location_name}
                      numberOfLines={1}
                    >
                      {item.item.formatted}
                    </Text>
                    <Text
                      testID={`List-previous-time-${item.index}`}
                      style={styles.time}
                    >
                      {context.date[item.index]},
                      {context.time[item.index]}
                    </Text>
                  </View>
                  <View>
                    <Button
                      testID={`list-previous-remove-${item.index}`}
                      labelStyle={{ fontSize: 12 }}
                      style={styles.remove_btn}
                      uppercase={false}
                      mode="outlined"
                      onPress={() => {
                        remove_Location(item.index);
                      }}
                    >
                      Remove
                    </Button>
                  </View>
                </View>
              );
            }}
            keyExtractor={() => Math.random().toString(36).slice(2, 7)}
          />
        </View>
      </View>
      <View style={styles.removeAll_btn}>
        <Button
          testID="list-clear-all-button"
          uppercase={false}
          mode="contained"
          onPress={() => {
            remove_All();
          }}
        >
          Clear All
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 2,
  },
  heading: {
    color: "#111",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  current: {
    color: "#555",
    fontSize: 16,
    marginTop: 20,
  },
  box_alignment: {
    display: "flex",
    flexDirection: "row",
  },
  box: {
    backgroundColor: "orange",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  box_text: {
    color: "white",
    fontSize: 18,
  },
  location_list: {
    flex: 5,
    marginTop: 15,
  },
  location: {
    marginTop: 15,
    marginLeft: 5,
  },
  location_text: {
    color: "#444",
    fontWeight: "bold",
    fontSize: 16,
    width: 250,
  },
  time: {
    color: "#555",
    fontSize: 14,
  },
  previous: {
    marginTop: 10,
  },
  location_data: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  location_name: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
    width: 200,
  },
  location_line: {
    display: "flex",
    flexDirection: "column",
  },
  remove_btn: {
    marginLeft: 10,
    width: 100,
  },
  removeAll_btn: {
    zIndex: 1,
    marginBottom: 15,
    width: 120,
  },
});
export default Home;
