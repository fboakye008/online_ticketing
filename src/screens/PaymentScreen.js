import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React from "react";
import NetworkField from "../components/CustomBookingInput";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../contents";

const { width } = Dimensions.get("window");

const PaymentScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
        </TouchableOpacity>
        <View style={styles.fieldContainer} onPress={() => Keyboard.dismiss}>
          <NetworkField label={"Payment"} placeholder={"MTN"} />
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.label}>Phone number:</Text>
            <TextInput
              style={styles.inputField}
              placeholder={"0330126723"}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Payment")}
          >
            <Text style={styles.btnText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fieldContainer: {
    alignSelf: "center",
    marginVertical: 50,
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
  label: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    paddingLeft: 10,
  },
  inputField: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: Colors.SECONDARY_WHITE,
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
});
export default PaymentScreen;
