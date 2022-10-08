import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Separator from "../components/WelcomeCard/Separator";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { Colors, Image } from "../contents";
import { Display } from "./utils";
import { useState } from "react";

const { height } = Dimensions.get("window");

const Otp = Array(4).fill("");

const VerificationScreen = ({ navigation, route }) => {
  const otpInput = useRef([]);

  const data = route.params;
  const [otp, setOtp] = useState({ 0: "", 1: "", 2: "", 3: "" });

  const handleChangeText = (text, index) => {
    Otp[index] = text;
    setOtp({ ...otp, [index]: text });
    if (text !== "") {
      if (index !== 3) {
        otpInput[index + 1].focus();
      } else {
        otpInput[index].blur();
      }
    } else {
      if (index !== 0) {
        otpInput[index - 1].focus();
      }
    }
  };

  const handleOTP = () => {
    let otpString = Object.values(otp).toString().split(",").join("");
    if (otpString.length === 4) {
      otpString === String(data?.otp)
        ? navigation.navigate("Home")
        : alert("Invalid OTP");
    } else {
      alert("Please enter the OTP sent to you");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Separator height={10} />

        <Text style={styles.headerTitle}>OTP Verification</Text>
        <Separator height={40} />

        <Text style={styles.content}>
          Enter the OTP number sent to you on
          <Text style={styles.phoneNumberText}>{data?.phone}</Text>
        </Text>
        <View style={styles.otpBox}>
          {Otp.map((num, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="phone-pad"
              placeholder="0"
              maxLength={1}
              value={otp[index]}
              ref={(ref) => (otpInput[index] = ref)}
              onChangeText={(text) => handleChangeText(text, index)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.verifyButton} onPress={handleOTP}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
        <View>
          <Text
            style={{
              color: Colors.DEFAULT_BLACK,
              justifyContent: "center",
              fontSize: 20,
              marginTop: 10,
              marginBottom: 10,
              paddingHorizontal: 60,
            }}
          >
            Didn't receive any code?
          </Text>
          <TouchableOpacity style={styles.resendBtn} onPress={handleOTP}>
            <Text style={styles.resendText}> Resend Code.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },

  headerTitle: {
    Colors: Colors.DEFAULT_BLACK,
    fontSize: 30,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  contentContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  content: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  phoneNumberText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.Red,
  },
  otpBox: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 6,
    borderColor: Colors.DEFAULT_GREEN,
    borderWidth: 1,
    textAlign: "center",
    fontSize: 20,
  },
  otpText: {
    fontSize: 25,
    color: Colors.DEFAULT_BLACK,
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  verifyButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  verifyButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
  resendBtn: {
    backgroundColor: Colors.SECONDARY_WHITE,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  resendText: {
    fontSize: 16,
    alignItems: "center",
  },
});

export default VerificationScreen;
