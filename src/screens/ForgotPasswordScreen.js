import React,{useState} from 'react';
import { View, Text, StyleSheet,ScrollView,SafeAreaView, StatusBar, TouchableOpacity, TextInput} from 'react-native';
import Separator from '../components/WelcomeCard/Separator';
import SubmitButton from '../components/CustomInput/SubmitButton';
import TextField from '../components/CustomInput/TextInput';
import {Colors} from '../contents';
import { Display } from './utils';
import ResetUser from "../apis/reset";
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


const ForgotPasswordScreen = ({navigation}) => {

  const [loading, setLoading] = useState(false);
 
  const [userInfo, setUserInfo] = useState({
    email: ""
  });

  const [error, setError] = useState("");

  const { email } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    //We will accept only if all of the fields have value
    if (!isValidObjField(userInfo))
      return updateError("Field isRequired!", setError);

      if (!isValidEmail(email))
      return updateError("Enter a valid email!", setError);
   
  };
  
  const submitForm = async () => {
    const { email } = userInfo;
    const otp = Math.floor(1000 + Math.random() * 9000);
    if (isValidForm()) {
      setLoading(true);
      let result = await ResetUser(userInfo);
      console.log(result);
      if (result?.account_status === 1) {
        setLoading(false);
        // alert("Received otp code in your email!");
        console.log("email sent")
        navigation.replace("Verification", { email, otp });
      } else {
        alert("Otp code has been sent to your mail!", result?.error?.message);
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
    <View style={styles.contentContainer}>
    <Separator height={10} />
      <Text style={styles.headerTitle}>Forgot Password</Text>
      <Text style={styles.content}>
      Enter your email to help you recover your password
      </Text>
      <TextField 
      value={email}
      onChangeText={(value) => handleOnChangeText(value, "email")}
      label={`Email`} 
      placeholder={`Example@gmail.com`} 
      icon={`mail`} 
      autoCapitalize='none'
 
      />
      <Separator height={10} />
      <SubmitButton
          // onPress={() => navigation.navigate('RegisterPhone')}
          onPress={submitForm}
          title="Reset Password"
        />
    
   </View>
   {loading && <LoadingScreen />}
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: Colors.DEFAULT_WHITE,
},
  headerTitle:{
    Colors: Colors.DEFAULT_BLACK,
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputContainer: {
    height: 55,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    backgroundColor: Colors.Light,
    borderColor: Colors.LIGHT_GREEN,
    alignItems: 'center',
  },
  content:{
    colors: Colors.LIGHT_GREY,
    fontSize: 18,
    marginVertical: 15,
  },
  contentContainer:{
    paddingTop: 50,
    paddingHorizontal: 20, 
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  forgotPasswordContainer:{
     marginHorizontal: 20,
     alignItems: 'center',
  },
  forgotPasswordText:{
    fontSize: 18,
    lineHeight: 20 * 1.4,
    color: Colors.DEFAULT_GREEN,
 },
//  signinButton:{
//    backgroundColor: Colors.DEFAULT_GREEN,
//    borderRadius: 5,
//    paddingHorizontal: 30,
//    height: Display.setHeight(6),
//    justifyContent: 'center',
//    alignItems: 'center',
//    marginTop: 20,
//  },
//  signinButtonText:{
//   color: Colors.DEFAULT_WHITE,
//   fontSize: 18,
//   lineHeight: 18*1.4,
// },
signupContainer:{
 marginHorizontal: 20,
 justifyContent: 'center',
 paddingVertical: 20,
 flexDirection:'row',
 alignItems: 'center',
},
accountText:{
  fontSize: 16,
  lineHeight: 13*1.4,
},
signupText:{
  color: Colors.DEFAULT_GREEN,
  fontSize: 16,
  lineHeight: 13*1.4,
  marginLeft: 5,
},
orText: {
  color: Colors.DEFAULT_BLACK,
  fontSize: 15,
  lineHeight: 15*1.4,
  marginLeft: 5,
  alignSelf: 'center',
},
facebookButton:{
  backgroundColor: Colors.DEFAULT_FGCOLOR,
  fontSize: 16,
  paddingVertical: 15,
  paddingHorizontal: 30,
  borderRadius: 5,
  marginVertical: 20,
  justifyContent: 'center',
  alignItems: 'center',
},
googleButton: {
  backgroundColor: Colors.Donut_Pink,
  paddingVertical: 16,
  paddingHorizontal: 30,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
},
signinButtonLogo:{
  height: 15,
  width:25,
  
},
signinButtonContainer: {
 backgroundColor: Colors.DEFAULT_WHITE,
 padding: 2,
 borderRadius: 3,
 position: 'absolute',
 left: 25,
},


});
export default ForgotPasswordScreen;