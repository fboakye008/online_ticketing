import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image, ScrollView,
} from "react-native";
import React, {useState} from "react";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import { Colors } from "../contents";
import { useNavigation } from "@react-navigation/native";
import SwitchButton from "../components/CustomSwitch/SwitchButton";
import Receipt from "../components/CustomTicket/Receipt";
import {Dropdown} from "react-native-element-dropdown";
const { width } = Dimensions.get("window");

const Wallet = () => {
  const navigation = useNavigation();
  const tickets = [
    {
      "bus_stop": "Asafo Market, Nhyiaeso, Accra, Ghana",
      "bus_no": "AZ 1234",
      "departure_time": "2022-10-12T12:28:13.000Z",
      "fare": 45.35,
      "serial_no": "SN-123456",
      "route": "KUMASI-ACCRA",
      "route_id": 1,
      "barcode" : "some_barcode_1"
    },
    {
      "bus_stop": "Asafo Market, Nhyiaeso, Accra, Ghana",
      "bus_no": "AZ 1234",
      "departure_time": "2022-10-12T12:28:13.000Z",
      "fare": 45.35,
      "serial_no": "SN-123455",
      "route": "KUMASI-ACCRA",
      "route_id": 2,
      "barcode" : "some_barcode_2"
    }
    ,
    {
      "bus_stop": "Asafo Market, Nhyiaeso, Accra, Ghana",
      "bus_no": "AZ 1234",
      "departure_time": "2022-10-12T12:28:13.000Z",
      "fare": 45.35,
      "serial_no": "SN-123454",
      "route": "KUMASI-ACCRA",
      "route_id": 3,
      "barcode" : "some_barcode_3"
    }
  ];
  const ticket =  {
    "bus_stop": "Asafo Market, Nhyiaeso, Accra, Ghana",
    "bus_no": "AZ 1234",
    "departure_time": "2022-10-12T12:28:13.000Z",
    "fare": 45.35,
    "serial_no": "SN-123454",
    "route": "KUMASI-ACCRA",
    "route_id": 3,
    "barcode" : "some_barcode_3"
  };
  const [switchValue, setSwitchValue] = useState(true);

    const toggleSwitch = (value) => {
        //onValueChange of the switch this function will be called
      if(value === 'Ticket'){
        console.log("setting to true")
        setSwitchValue(true);
      }
      else{
        console.log("setting to false")
        setSwitchValue(false);
      }

        //state changes according to switch
        //which will result in re-render the text
    };

    return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e6e7e8" }}>
      <TouchableOpacity
        style={styles.arrowContainer}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />

      </TouchableOpacity>
      <Text style={styles.title}>Ticket Wallet</Text>

        <View style={styles.walletContainer}>
          <SwitchButton toggleSwitch={toggleSwitch}/>
          {switchValue ? (
              <Receipt ticketInfo={ticket} key={ticket.route_id}></Receipt>
          ) : (
              <Text>Switch is OFF</Text>
          )}
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
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
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
  },
  walletContainer: {
    alignSelf: "center",
    height: 100,
    width: width - 20,
    backgroundColor: Colors.LIGHT_GREY,
    marginVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: Colors.DEFAULT_BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.121,
    shadowRadius: 9.11,
    elevation: 5,
  },
  walletText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 10,
    paddingVertical: 10,
  },
  walletAmount: {
    fontSize: 25,
    color: Colors.DEFAULT_GREEN,
  },
  amountArrowWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  divider: {
    height: 0.4,
    width: width - 20,
    backgroundColor: Colors.DEFAULT_GREY,
    alignSelf: "center",
  },
  paymentMethods: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: Colors.DEFAULT_GREY,
  },
  cashLogoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  cashLogo: {
    height: 70,
    width: 70,
    marginHorizontal: 10,
  },
  mtn: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Wallet;
