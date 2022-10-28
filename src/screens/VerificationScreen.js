import React, {useRef} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    SafeAreaView,
    Dimensions,
} from "react-native";
import Separator from "../components/WelcomeCard/Separator";
import {Colors} from "../contents";
import {Display} from "./utils";
import {useState} from "react";
import {RequestNewPassword, VerifyOTP} from "../apis/reset";
import {updateError} from "../utils";
import projectlogo from "../assets/images/projectLogo.png";
import {MaterialIcons} from "@expo/vector-icons";

const {height} = Dimensions.get("window");

const Otp = Array(4).fill("");

const VerificationScreen = ({navigation, route}) => {
    const [loading, setLoading] = useState(false);
    const otpInput = useRef([]);
    const [error, setError] = useState("");
    const data = route.params;
    const email = data.email;
    const fromScreen = data.fromScreen;
    const [otp, setOtp] = useState({0: "", 1: "", 2: "", 3: ""});

    const handleChangeText = (text, index) => {
        Otp[index] = text;
        setOtp({...otp, [index]: text});
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
    const handleResendOTP = async () => {
        try {
            setLoading(true);
            const result = await RequestNewPassword(email);
            if (result.success === "success") {
                alert("new OTP sent to " + email);
            } else {
                alert("Error sending OTP to " + email);
            }
            return;
        } catch (e) {
            console.log(e);
            alert("Error sending OTP to " + email);
            return updateError("Error sending OTP to " + email, setError);
        } finally {
            setLoading(false);
        }
    };
    const handleOTP = () => {
        try {
            setLoading(true);
            let otpString = Object.values(otp).toString().split(",").join("");
            if (otpString.length === 4) {
                const otp = otpString;
                let url = "recovers/verifyemail";
                if (fromScreen && (fromScreen === "SignUp")) {
                    url = "users/authenticateOTP";
                }
                const p = VerifyOTP(email, otp, url);
                p.then(function (r) {
                    if (fromScreen && fromScreen === "ForgotPassword") {
                        navigation.replace("ResetPassword", {email, otp}) && alert("OTP Verified")
                    } else {
                        navigation.replace("Signin") && alert("OTP Verified")
                    }
                }).catch(function (e) {
                    console.log("error", e);
                    return updateError("Invalid OTP!", setError);
                });
            } else {
                return updateError("Please enter the OTP sent to you via email!", setError);
            }
        } catch (e) {
            return updateError(e.toString(), setError);
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
                <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
                    <MaterialIcons name="keyboard-arrow-left" size={30} color="#000"/>
                    <Text style={styles.headerTopic}>OTP Verification</Text>
                    <View>
                        <Image source={projectlogo} style={[styles.Image]} resizeMode="cover"/>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={styles.contentContainer}>
                <Separator height={10}/>
                <Text style={styles.content}>
                    Enter the OTP number sent to
                    <Text style={styles.phoneNumberText}> {data?.email}</Text>
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
                    <TouchableOpacity style={styles.resendBtn} onPress={handleResendOTP}>
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
    header: {
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
    headerTopic: {
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
export default VerificationScreen;
