import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import Separator from '../components/WelcomeCard/Separator';
import {Colors, image as MyImage} from '../contents';
import TextField from '../components/CustomInput/TextInput';
import {Display} from './utils';
import LoginUser from "../apis/login";
import LoadingScreen from "./utils/LoadingScreen";
import SubmitButton from '../components/CustomInput/SubmitButton';
import {isValidObjField,updateError,isValidPhone} from './utils/validations';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignInScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function removeUser() {
            try {
                await AsyncStorage.removeItem("user")
            } catch (e) {

            }
        }
        removeUser().catch(console.error);
    }, []);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isPasswordShow, setPasswordShow] = useState(false);

    const [userInfo, setUserInfo] = useState({
        phone: "",
        password: "",

    });

    const [error, setError] = useState("");

    const {phone, password} = userInfo;

    const handleOnChangeText = (value, fieldName) => {
        setUserInfo({...userInfo, [fieldName]: value});
    };

    const isValidForm = () => {
        //We will accept only if all of the fielsa have value
        if (!isValidObjField(userInfo))
            return updateError("Required all fields!", setError);
        // Phone number must have 9 digits
        if (!isValidPhone(phone))
            return updateError("Phone number is required and must be 10 digits!", setError);
        // password must have 8 or more characters
        if (!password.trim())
            return updateError("Password is required!", setError);
        return true;
    };

    const submitForm = async () => {
        if (isValidForm()) {
            try {
                setLoading(true);
                let user = await LoginUser(userInfo);
                if (user && user.phone) {
                    setLoading(false);
                    const payload = {phone: user.phone, full_name: user.full_name, api_key: user.api_key};
                    await AsyncStorage.setItem("user", JSON.stringify(payload))
                    navigation.replace("Home");
                } else {
                    return updateError("Password/phone number does not exist!", setError);
                }
            }catch(e){
                return updateError(e, setError);
            }finally{
                setLoading(false);
            }
        }
    };


    return (

        <SafeAreaView style={styles.container}>
            {error ? (
                <Text style={{color: Colors.Red, fontSize: 12, textAlign: "center"}}>
                    {error}
                </Text>
            ) : null}
            <View style={styles.contentContainer}>
                <Separator height={10}/>
                <Text style={styles.headerTitle}>Welcome!</Text>
                <Text style={styles.content}>
                    Enter your Username and password, and enjoy your trip!
                </Text>
                <TextField
                    value={phone}
                    onChangeText={(value) => handleOnChangeText(value, "phone")}
                    label={`Phone Number`}
                    placeholder={`Enter 10 digit Phone Number`}
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
                    placeholder={`Enter Password`}
                    icon={`lock`}
                    isPasswordShow={isPasswordShow}
                    isPassword={true}
                    setPasswordShow={setPasswordShow}
                />
                <Text></Text>
                <View style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('ForgotPassword')}>Forgot
                        Password</Text>
                </View>

                <SubmitButton
                    // onPress={() => navigation.navigate('RegisterPhone')}
                    onPress={submitForm}
                    title="Sign In"
                />
                <View style={styles.signupContainer}>
                    <Text style={styles.accountText}>Don't have an account?</Text>
                    <Text style={styles.signupText} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
                </View>
                <View style={styles.signupContainer}>
                    <Text style={styles.accountText}>Today's Schedule</Text>
                    <Text style={styles.signupText} onPress={() => navigation.navigate('Schedule')}>View</Text>
                </View>
                {/* <Text style={styles.orText}>OR</Text> */}

                {/* <TouchableOpacity style={styles.facebookButton} disabled={true}>
                    <View style={styles.socialButtonContainer}>
                        <View style={styles.signinButtonLogo}>
                            <Image source={MyImage.facebook} style={styles.signinButtonLogo}/>
                        </View>
                        <Text style={styles.socialSigninButtonText}>Connect with Facebook</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.googleButton} disabled={true}>
                    <View style={styles.socialButtonContainer}>
                        <View style={styles.signinButtonLogo}>
                            <Image source={MyImage.google} style={styles.signinButtonLogo}/>
                        </View>
                        <Text style={styles.socialSigninButtonText}>Connect with Google</Text>
                    </View>
                </TouchableOpacity> */}
            </View>
            {loading && <LoadingScreen/>}
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
    content: {
        colors: Colors.LIGHT_GREY,
        fontSize: 18,
        marginVertical: 15,
    },
    contentContainer: {
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
    forgotPasswordContainer: {
        marginHorizontal: 20,
        alignItems: 'center',
    },
    forgotPasswordText: {
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
    signupContainer: {
        marginHorizontal: 20,
        justifyContent: 'center',
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
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
    orText: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 15,
        lineHeight: 15 * 1.4,
        marginLeft: 5,
        alignSelf: 'center',
    },
    facebookButton: {
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
    signinButtonLogo: {
        height: 15,
        width: 25,

    },
    signinButtonContainer: {
        backgroundColor: Colors.DEFAULT_WHITE,
        padding: 2,
        borderRadius: 3,
        position: 'absolute',
        left: 25,
    },
    socialButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
    },
    socialSigninButtonText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 15,
        lineHeight: 13 * 1.4,
    },
});

export default SignInScreen;