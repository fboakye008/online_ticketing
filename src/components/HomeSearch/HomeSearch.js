import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DisplayTrip from "../CustomInput/DisplayTrip";
import {fetchTickets} from "../../apis/tickets";
import _ from "underscore";
import moment from "moment";
import {updateError} from "../../screens/utils/validations";
const HomeSearch = () => {
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const [recentTrips, setRecentTrips] = useState([]);

  const prepareRecentTrips = (trips) => {

    let result = trips.map(trip => ({booking_id: trip.booking_id ,route:trip.route, departure_time: trip.departure_time}));
    const uniqueBookings = _.uniq(result, function (x) {
      return x["booking_id"];
    });
    const sorted = _.sortBy(uniqueBookings, function(item){
      const d = new Date(item.departure_time);
      const mt = moment(d).format('DD/MM/YYYY mm:hh:ss A')
      return - moment(mt, 'DD/MM/YYYY mm:hh:ss A').unix(); // parse date with moment >> format to UNIX timestamp
    });
    result = sorted.map(trip => ({key: trip.booking_id ,title:trip.route}));
    if(result.length > 3){
      return result.slice(0, 3)
    }else{
      return result;
    }
  };
  useEffect(() => {
    async function populateData() {
      const userTickets = await fetchTickets();
      const trips = prepareRecentTrips(userTickets);
      if(trips && trips.length > 0) {
        setRecentTrips(trips);
      }
    }
    try {
      const x = populateData();
    }catch(e){
      return updateError(e, setError);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => navigation.navigate("Route")}>
        <EvilIcons name="search" size={24} color="black" />
        <Text style={styles.inputText}>Where To?</Text>
      </TouchableOpacity>

      {/* <View style={styles.tripHistoryWrapper}>
        {recentTrips.map(recentTrip=>{
          return <DisplayTrip title={recentTrip.title} key={recentTrip.key}></DisplayTrip>
        })}
      </View> */}
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
