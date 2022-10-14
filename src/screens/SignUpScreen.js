import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Colors } from "../contents";
import Separator from "../components/WelcomeCard/Separator";
import TextField from "../components/CustomInput/TextInput";
import SubmitButton from "../components/CustomInput/SubmitButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateUser from "../apis/user";
import LoadingScreen from "./utils/LoadingScreen";

const isValidObjField = (obj) => {
  return Object.values(obj).every((value) => value.trim());
};

const updateError = (error, stateUpdater) => {
  stateUpdater(error);
  setTimeout(() => {
    stateUpdater("");
  }, 2500);
};

const isValidEmail = (value) => {
  const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return regx.test(value);
};

const isValidPhone = (value) => {
  const regx =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  return regx.test(value);
};
const SignUpScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const { fullName, email, phone, password, confirmPassword } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };
  const isValidForm = () => {
    //We will accept only if all of the fielsa have value
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);
    // If valid name with 3 or more characters
    if (!fullName.trim() || fullName.length < 3)
      return updateError("Input your correct name!", setError);
    // only valid email id is allowed
    if (!isValidEmail(email))
      return updateError("Enter a valid email!", setError);
    // Phone number must have 9 digits
    if (!isValidPhone(phone))
      return updateError("Phone number must have 10 digits!", setError);
    // password must have 8 or more characters
    if (!password.trim() || password.length < 8)
      return updateError("Password is less than 8 characters!", setError);
    // password and confirm password must be the same
    if (password !== confirmPassword)
      return updateError("Password does not match!", setError);
    return true;
  };

  const submitForm = async () => {
    const { phone } = userInfo;
    const otp = Math.floor(1000 + Math.random() * 9000);
    if (isValidForm()) {
      setLoading(true);
      let result = await CreateUser(userInfo);
      console.log(result);
      if (result?.account_status === 1) {
        setLoading(false);
        alert("Successfully registered!");
        navigation.replace("Verification", { phone, otp });
      } else {
        alert("Failed to register!", result?.error?.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <Text style={{ color: Colors.Red, fontSize: 12, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={styles.contentContainer}
      >
        <Separator height={5} />
        <Text style={styles.headerTitle}>Create Account</Text>
        <Text style={styles.content}>
          Enter your Email, choose a username and password.
        </Text>

        <TextField
          value={fullName}
          onChangeText={(value) => handleOnChangeText(value, "fullName")}
          label={`Full Name`}
          placeholder={`Full Name`}
          icon={`user`}
          autoCapitalize="none"
        />
        <TextField
          value={email}
          onChangeText={(value) => handleOnChangeText(value, "email")}
          label={`Email`}
          placeholder={`Example@gmail.com`}
          icon={`mail`}
          autoCapitalize="none"
        />
        <TextField
          value={phone}
          onChangeText={(value) => handleOnChangeText(value, "phone")}
          label={`Phone Number`}
          placeholder={`Phone Number must be 10 digits`}
          icon={`phone`}
          selectionColor={Colors.DEFAULT_GREEN}
          keyboardType="number-pad"
          autoCapitalize="none"
        />
        <TextField
          value={password}
          onChangeText={(value) => handleOnChangeText(value, "password")}
          autoCapitalize="none"
          secureTextEntry={isPasswordShow ? false : true}
          label={`Password`}
          name="password"
          placeholder={`Password must be at least characters`}
          icon={`lock`}
          isPasswordShow={isPasswordShow}
          isPassword={true}
          setPasswordShow={setPasswordShow}
        />
        <TextField
          value={confirmPassword}
          onChangeText={(value) => handleOnChangeText(value, "confirmPassword")}
          autoCapitalize="none"
          name="password"
          label={`Password`}
          placeholder={`Password must be at least characters`}
          icon={`lock`}
          secureTextEntry={isConfirmPasswordShow ? false : true}
          isPasswordShow={isConfirmPasswordShow}
          isPassword={true}
          setPasswordShow={setConfirmPasswordShow}
        />
        <Separator height={10} />
        <SubmitButton
          // onPress={() => navigation.navigate('RegisterPhone')}
          onPress={submitForm}
          title="Create Account"
        />
        <View style={styles.signupContainer}>
          <Text style={styles.accountText}>Already have an account?</Text>
          <Text
            style={styles.signupText}
            onPress={() => navigation.navigate("Signin")}
          >
            Sign In
          </Text>
        </View>
        <View style={{ marginHorizontal: 5 }}>
          <Text style={styles.accountText}>
            By signing up, you confirm that you accept our {""}
            <Text
              style={styles.signupText}
              onPress={() => navigation.navigate(onTermsOfUsePressed)}
            >
              Terms of Use {""}
            </Text>
            and {""}
            <Text
              style={styles.signupText}
              onPress={() => navigation.navigate(onPrivacyPressed)}
            >
              Privacy Policy
            </Text>
          </Text>
        </View>
      </ScrollView>
      {loading && <LoadingScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  contentContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
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
  content: {
    colors: Colors.grey,
    fontSize: 18,
    marginVertical: 10,
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY2,
    paddingHorizontal: 30,
    marginHorizontal: 30,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.DEFAULT_GREY,
    justifyContent: "center",
  },
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  signupContainer: {
    marginHorizontal: 20,
    justifyContent: "center",
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  accountText: {
    fontSize: 16,
    lineHeight: 13 * 1.4,
  },
  signupText: {
    color: Colors.DEFAULT_GREEN,
    fontSize: 16,
    lineHeight: 13 * 1.4,
    marginLeft: 5,
  },
});

export default SignUpScreen;
