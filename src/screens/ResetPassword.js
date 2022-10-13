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
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const ResetPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const [userInfo, setUserInfo] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const { password, confirmPassword } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };
  const isValidForm = () => {
    //We will accept only if all of the fielsa have value
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);
      // password must have 8 characters
    if (!password.trim() || password.length < 8)
      return updateError("Password is less than 8 characters!", setError);
    // password and confirm password must be the same
    if (password !== confirmPassword)
      return updateError("Password does not match!", setError);
    return true;
  };

  const submitForm = async () => {
    if (isValidForm()) {
      setLoading(true);
      let result = await CreateUser(userInfo);
      console.log(result);
      if (result?.account_status === 1) {
        setLoading(false);
        alert("New password Successfully Created!");
        navigation.replace("Signin");
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
        <Text style={styles.headerTitle}>Create New Password</Text>
        <Text style={styles.content}>
          Enter your password and confirm.
        </Text>

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
          title="Reset Password"
        />
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

export default ResetPassword;
