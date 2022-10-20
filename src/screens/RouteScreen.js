import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import BookingTextField from "../components/CustomBookingInput";
import ReadOnlyField from "../components/CustomInput/ReadOnlyField";
import { Colors } from "../contents";
import moment from 'moment';
import { RequestRoutes } from "../apis/routes";
const { height, width } = Dimensions.get("window");
import utils  from "../apis/utils";
import {updateError} from "./utils/validations";
const Routes = ({ navigation }) => {
  const [error, setError] = useState("");
  const [routeMessage, setRouteMessage] = useState("Route");
  const [data, setData] = useState({
    today: moment().format('dddd MMMM Do YYYY, h:mm:ss a'),
    routes: [],
  });

  const [selectedRoute, setSelectedRoute] = useState();
  const handleRouting = function(){
    if(selectedRoute) {
      navigation.navigate('BusStopTimeScreen', {
        routes: data.routes, selectedRoute: selectedRoute
      });
    }else{
      return updateError("Select a route", setError);
    }
  }
  const sendDataToParent = (index) => {
    setSelectedRoute(index.value);
  };
  useEffect(() => {
    async function populateData() {
      const routes = await RequestRoutes();
      const uniqueRoutes = utils.uniquify(routes);
      if(uniqueRoutes.length === 0){
        setRouteMessage("No available buses at this time")
      }
      setData({
        today: moment().format('dddd MMMM Do YYYY, h:mm:ss a'),
        routes: routes,
        uniqueRoutes: uniqueRoutes
      });
    }
    populateData().catch();
  }, []);
  return (
      <SafeAreaView style={styles.wrapper}>
        {error ? (
            <Text style={{color: Colors.Red, fontSize: 12, textAlign: "center"}}>
              {error}
            </Text>
        ) : null}
        <TouchableOpacity
            style={styles.arrowContainer}
            onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />

        </TouchableOpacity>
        <Text style={styles.text}> Select Your Route</Text>

        <View style={styles.container}>
        <ReadOnlyField
              style={styles.input}
              editable={false}
              placeholderTextColor={"black"}
              placeholder={data.today}
              label="Date"
          />

          <BookingTextField label="Route" placeholder={routeMessage} data={data.uniqueRoutes} sendDataToParent={sendDataToParent}/>
          <TouchableOpacity
              style={styles.btn}
              onPress={handleRouting}
          >
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  arrowContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.SECONDARY_WHITE,
    borderRadius: 10,
    marginLeft: 10,
    shadowColor: Colors.DEFAULT_BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.121,
    shadowRadius: 9.11,
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height,
  },
  input: {
    alignItems: "center",
    fontSize: 15,
    paddingHorizontal: 50,
    backgroundColor: Colors.LIGHT_GREY2,
    width: "90%",
    height: 50,
    borderRadius: 50,
    shadowColor: Colors.DEFAULT_BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.121,
    shadowRadius: 9.11,
    elevation: 5,
  },
  inputContainer: {
    backgroundColor: Colors.Silver,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_GREY,
    justifyContent: "center",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: Colors.DEFAULT_GREEN,
    width: width - 40,
    height: 50,
    borderRadius: 50,
    shadowColor: Colors.DEFAULT_BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.121,
    shadowRadius: 9.11,
    elevation: 5,
  },
  btnText: {
    color: Colors.SECONDARY_WHITE,
    fontSize: 15,
    fontWeight: "bold",
  },
  text:{

    justifyContent: "space-between",
    alignItems: "center",
    fontSize:30 ,
    fontWeight: "bold",
    paddingTop: 25,
    paddingHorizontal: 100,
},
});

export default Routes;

