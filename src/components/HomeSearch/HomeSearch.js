import React, {useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DisplayTrip from "../CustomInput/DisplayTrip";
const HomeSearch = () => {
  const navigation = useNavigation();

  const recentTrips = [{
    title: "Accra-Kumasi",
    key: "1"
  },
    {
    title: "Accra-Takoradi",
    key: "3"
  }
    ,
    {
      title: "Accra-Cape Coast",
      key: "3"
    }
  ];

  useEffect(() => {
    //fetch all of my trips sort by most recent and grab the first three
    // const fare = _.findWhere(allRoutes, {route_id: selectedRouteId});
    // if (fare && fare.fare) {
    //   setFare(fare.fare);
    //   setAmount(fare.fare);
    // }
    // const busStops = extractBusStops(allRoutes, selectedRouteId);
    // setBusStops(busStops);
    // const times = extractTimes(allRoutes, selectedRouteId);
    // setTimes(times);
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => navigation.navigate("Route")}>
        <EvilIcons name="search" size={24} color="black" />
        <Text style={styles.inputText}>Where To?</Text>
      </TouchableOpacity>

      <View style={styles.tripHistoryWrapper}>
        {recentTrips.map(recentTrip=>{
          return <DisplayTrip title={recentTrip.title} key={recentTrip.title}></DisplayTrip>
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  inputBox: {
    backgroundColor: "#b0b0b0",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 60,
    zIndex: 1,
  },

  inputText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#6e6e6e",
  },
  tripHistoryWrapper: {
    marginTop: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#dbdbdb",
  },
  iconContainer: {
    backgroundColor: "#b3b3b3",
    padding: 10,
    borderRadius: 25,
  },
  destinationText: {
    marginLeft: 10,
    fontWeight: "500",
    fontSize: 18,
  },
});

export default HomeSearch;
