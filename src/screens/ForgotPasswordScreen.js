import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import Separator from '../components/WelcomeCard/Separator';
import SubmitButton from '../components/CustomInput/SubmitButton';
import TextField from '../components/CustomInput/TextInput';
import {Colors} from '../contents';
import {Display} from './utils';
import {RequestNewPassword} from "../apis/reset";
import LoadingScreen from "./utils/LoadingScreen";
import {updateError,isValidEmail} from "../utils";
import {MaterialIcons} from "@expo/vector-icons";


/**
 *
 * @param navigation
 * @returns {JSX.Element}
 * @constructor
 */
const ForgotPasswordScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const fromScreen = "ForgotPassword";
    const handleOnChangeText = (value, fieldName) => {
        setEmail(value);
    };

    const isValidForm = () => {
        if (!isValidEmail(email)) {
            return updateError("Enter a valid email!", setError);
        }
        return true;
    };

    const submitForm = async () => {
        try {
            if (isValidForm()) {
                setLoading(true);
                const result = await RequestNewPassword(email);
                if (result.success === "success") {
                    navigation.replace("Verification", {email,fromScreen});
                } else {
                    throw new Error("Email not found");
                }
            }
        } catch (ee) {
            return updateError("Invalid email address. Try again", setError);
        } finally {
            setLoading(false);
        }
    };


    return (

        <SafeAreaView style={styles.container}>
            {error ? (
                <Text style={{color: Colors.Red, fontSize: 12, textAlign: "center"}}>
                    {error}
                </Text>
            ) : null}
            <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
          <View style={styles.titleContainer}>
        <Text style={styles.title}>Forgot Password</Text>
        </View>
        </TouchableOpacity>
            <View style={styles.contentContainer}>
               
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
                <Separator height={10}/>
                <SubmitButton
                    onPress={submitForm}
                    title="Reset Password"
                />

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
    
    content: {
        colors: Colors.LIGHT_GREY,
        fontSize: 18,
        marginVertical: 15,
    },
    contentContainer: {
        paddingTop: 5,
        paddingHorizontal: 20,
    },
    header:{
        // borderBottomColor: '#eee',
        // borderBottomWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
        paddingHorizontal: 12,
        
      },
      titleContainer:{
        flex: 1,
      },
      title:{
        Colors: Colors.DEFAULT_BLACK,
         fontSize: 20,
        marginLeft: -38,
        fontWeight:'bold',
        textAlign: 'center',
      },
   
});
export default ForgotPasswordScreen;