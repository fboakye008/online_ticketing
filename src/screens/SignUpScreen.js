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
import CreateUser from "../apis/user";
import LoadingScreen from "./utils/LoadingScreen";
import { isValidObjField, updateError,isValidPhone,isValidEmail } from '../utils';

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
    const { email } = userInfo;
    if (isValidForm()) {
      setLoading(true);
      try {
        const user_response = await CreateUser(userInfo);//create user and send email
        //Send to verification with api_key
        if (user_response.success === "success") {
          const fromScreen = "SignUp";
          navigation.replace("Verification", { email,fromScreen});
          //navigation.replace("Signin") && alert("Successfully registered!")
        } else {
          alert("OTP could not be sent to ! " +  email);
          return updateError("OTP could not be sent to ! " +  email, setError);
        }
      }catch(e){
        console.log(e);
        alert("Failed to register! " + e);
        return updateError("Failed to register! " +  e.toString(), setError);
      }finally{
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView >
<<<<<<< HEAD
       <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
=======

>>>>>>> b02e4def34cf531b97c94b0a1853c7853e0f3730
        <Separator height={5} />
        <Text style={styles.headerTitle}>Create Account</Text>
        <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={styles.contentContainer}
      >
       {error ? (
        <Text style={{ color: Colors.Red, fontSize: 12, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
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
          placeholder={`Password must be at least 8 characters`}
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
          label={`Confirm Password`}
          placeholder={`Password must be at least 8 characters`}
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
        <View style={{ marginHorizontal: 25 }}>
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
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  headerTitle: {
    Colors: Colors.DEFAULT_BLACK,
    fontSize: 30,
    fontWeight: "bold",

  },

  content: {
    colors: Colors.grey,
    fontSize: 18,
    marginVertical: 10,
  },

  signupContainer: {
    marginHorizontal: 20,
    justifyContent: "center",
    paddingVertical: 10,
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
