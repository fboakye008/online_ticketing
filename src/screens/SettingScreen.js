import React, {useLayoutEffect, useMemo, useState} from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Colors } from "../contents";
import Separator from "../components/WelcomeCard/Separator";
import TextField from "../components/CustomInput/TextInput";
import SubmitButton from "../components/CustomInput/SubmitButton";
import CreateUser from "../apis/user";
import {MaterialIcons} from "@expo/vector-icons";
import projectlogo from "../assets/images/projectLogo.png";
import LoadingScreen from "./utils/LoadingScreen";
import { isValidObjField, updateError,isValidPhone,isValidEmail } from '../utils';
import {findMapRoute} from "../apis/map";
import {AnimatedRegion} from "react-native-maps";
import utils from "../apis/utils";

const SignUpScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    fullName : "",
    email: "",
    phone: ""
  });
  const {
    fullName,email,phone
  } = user
  const updateUser = (data) => setUser((user) => ({...user, ...data}));
  const [error, setError] = useState("");

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

    return true;
  };

  const submitForm = async () => {
    const { phone } = userInfo;
    const { email } = userInfo;
    const otp = Math.floor(1000 + Math.random() * 9000);
    if (isValidForm()) {
      setLoading(true);
      try {
        //TODO: make account active after verification
        const user = await CreateUser(userInfo);//create user and send email
        //Send to verification with api_key
        if (user.email) {
          const api_key = user.api_key;
          const fromScreen = "SignUp";
          navigation.replace("Verification", { email,api_key,fromScreen});
          //navigation.replace("Signin") && alert("Successfully registered!")
        } else {
          alert("Failed to register! " +  user?.error?.message);
          return updateError("Failed to register! " +  user?.error?.message, setError);
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

  useMemo(() => {
    async function populateData() {
      try {
        const user = await utils.findCachedUser();
        if (user) {
          console.log(user)
          updateUser({
            fullName : user.full_name,
            email: user.email,
            phone: user.phone
          })
        } else {
          const navPage = 'Settings';
          navigation.navigate('Signin', {navPage});
        }
        return "done"
      } catch (err) {
        console.log(err);
        console.log("Something went wrong")
        return updateError(err.toString(), setError);
      }
    }
    populateData().catch();
  }, []);
  return (
    <SafeAreaView >


      <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.navigate('Account')}>
          <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
                 <Text style={styles.Headertopic}>Personal Info </Text>
           <View>
               <Image source={projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
          </View>
        </TouchableOpacity>
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
        <TextField
          value={fullName}
          label={`Full Name`}
          placeholder={fullName}
          icon={`user`}
          autoCapitalize="none"
        />
        <TextField
          value={email}
          label={`Email`}
          placeholder={email}
          icon={`mail`}
          autoCapitalize="none"
        />
        <TextField
          value={phone}
          label={`Phone Number`}
          placeholder={phone}
          icon={`phone`}
          selectionColor={Colors.DEFAULT_GREEN}
          keyboardType="number-pad"
          autoCapitalize="none"
        />
        <Separator height={10} />
        <SubmitButton
          onPress={submitForm}
          title="Save"
        />
        <View style={styles.signupContainer}>
          <Text style={styles.accountText}>Delete account</Text>
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
    color: Colors.Red,
  },

  header:{
    borderBottomColor: '#eee',
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    marginLeft: 1,
    paddingTop: 12,
    paddingHorizontal: 12,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  Headertopic: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: "bold",
},
  Image: {

    height: 30,
    width: 30,
    marginRight: 20,
},

});

export default SignUpScreen;
