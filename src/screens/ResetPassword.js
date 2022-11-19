import React, {useLayoutEffect, useState} from "react";
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    MaterialIcons,
    StatusBar,
    Image,
    Pressable,
    ScrollView,
} from "react-native";
import {Colors} from "../contents";
import Separator from "../components/WelcomeCard/Separator";
import TextField from "../components/CustomInput/TextInput";
import SubmitButton from "../components/CustomInput/SubmitButton";
import LoadingScreen from "./utils/LoadingScreen";
import {isValidObjField, updateError} from "../utils";
import {ResetNewPassword} from "../apis/reset";
import projectlogo from "../assets/images/projectLogo.png";

const ResetPassword = ({navigation, route}) => {
    const [loading, setLoading] = useState(false);
    const [isPasswordShow, setPasswordShow] = useState(false);
    const [isConfirmPasswordShow, setConfirmPasswordShow] = useState(false);
    const email = route.params.email;
    const otp = route.params.otp;


    const [userInfo, setUserInfo] = useState({
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");

    const {password, confirmPassword} = userInfo;

    const handleOnChangeText = (value, fieldName) => {
        setUserInfo({...userInfo, [fieldName]: value});
    };
    const isValidForm = () => {
        //We will accept only if all of the fielsa have value
        if (!isValidObjField(userInfo))
            return updateError("Required all fields!", setError);
        // password must have 8 characters
        if (!email) {
            return updateError("Email is required!", setError);
        }
        if (!otp) {
            return updateError("OTP is required!", setError);
        }
        if (!password.trim() || password.length < 8)
            return updateError("Password is less than 8 characters!", setError);
        // password and confirm password must be the same
        if (password !== confirmPassword)
            return updateError("Password does not match!", setError);
        return true;
    };

    const submitForm = async () => {
        if (isValidForm()) {
            try {
                setLoading(true);
                userInfo.email = email;
                userInfo.otp = otp;
                let result = await ResetNewPassword(userInfo);
                if (result.email) {
                    setLoading(false);
                    alert("New password Successfully Created!");
                    navigation.replace("Signin");
                } else if (result.otp && result.otp === "expired") {
                    return updateError("OTP expired. Reset OTP!", setError);
                } else {
                    return updateError("Password could not be updated!", setError);
                }
            } catch (ee) {
                return updateError(ee.toString(), setError);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
         <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
            {error ? (
                <Text style={{color: Colors.Red, fontSize: 12, textAlign: "center"}}>
                    {error}
                </Text>
            ) : null}
            
            <View style={styles.header}>
      <Pressable  
              onPress={() => navigation.goBack()}>
          <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
          </View>
       </Pressable>
            <View><Text style={styles.Headertopic}>Create New Password</Text></View>
            <View>
            <Image source={projectlogo} style={[styles.Image]} resizeMode="cover"/>

            </View>
       </View>
        <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="handled"
                style={styles.contentContainer}
            >

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
                <Separator height={10}/>
                <SubmitButton
                    // onPress={() => navigation.navigate('RegisterPhone')}
                    onPress={submitForm}
                    title="Reset Password"
                />
            </ScrollView>
            {loading && <LoadingScreen/>}
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

    title: {
        fontSize: 20,
        lineHeight: 20 * 1.4,
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 20,
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

    header:{
        borderBottomColor: '#eee',
        justifyContent: "space-between",
        width: "100%",
        borderBottomWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
        marginLeft: 1,
        marginTop: 12,
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

export default ResetPassword;
