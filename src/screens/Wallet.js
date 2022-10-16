import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../contents";
import { useNavigation } from "@react-navigation/native";
import SwitchButton from "../components/CustomSwitch/SwitchButton";

const { width } = Dimensions.get("window");

const Wallet = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e6e7e8" }}>
      <TouchableOpacity
        style={styles.arrowContainer}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
        
      </TouchableOpacity>
      <Text style={styles.title}>Wallet</Text>
     
        <View style={styles.walletContainer}>
        <SwitchButton />
        </View>
     
      
      {/* <TouchableOpacity>
        <View style={styles.walletContainer}>
          <Text style={styles.walletText}>VIP Cash</Text>
          <View style={styles.amountArrowWrapper}>
            <Text style={styles.walletAmount}>GHS 3,123.00</Text>
            <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
      <Text style={styles.paymentMethods}>Payment Methods</Text>
      <TouchableOpacity style={styles.cashLogoWrapper}>
        <Image source={require("../images/mtn.png")} style={styles.cashLogo} />
        <Text style={styles.mtn}>MTN</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.cashLogoWrapper}>
        <Image
          source={require("../images/vodafone.png")}
          style={styles.cashLogo}
        />
        <Text style={styles.mtn}>Vodafone Cash</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.cashLogoWrapper}>
        <Image
          source={require("../images/cash1.png")}
          style={styles.cashLogo}
        />
        <Text style={styles.mtn}>Cash</Text>
      </TouchableOpacity>
      <View style={styles.divider} /> */}
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
    backgroundColor: Colors.SECONDARY_WHITE,
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
