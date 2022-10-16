import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";
import React, {useEffect, useState} from "react";
import NetworkField from "../components/CustomBookingInput";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Colors} from "../contents";
import {isValidObjField, isValidPhone, updateError} from './utils/validations';
import ReadOnlyField from "../components/CustomInput/ReadOnlyField";
import {CreatePayment} from "../apis/payment";
import TextField from "../components/CustomInput/TextInput";
import {Dropdown} from "react-native-element-dropdown";
import BookingTextField from "../components/CustomBookingInput";
import moment from "moment";


const {width} = Dimensions.get("window");

const PaymentScreen = ({navigation, route}) => {
    const payload = route.params;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [bookingId, setBookingId] = useState(null);
    const [amountPaid, setAmountPaid] = useState(null);
    const [phone, setPhone] = useState(null);

    const telcos = [
        {"value": "MTN", "label": "MTN"},
        {"value": "Voda", "label": "VODA Cash"},
        {"value": "AirTel", "label": "AIR TEL"}
    ];
    const handleTelco = (index) => {
        setPaymentMethod(index.value);
    };
    const isValidForm = (paymentInfo) => {
        //TODO validate that telco is selected
        console.log("Phone ",phone)
        if(!paymentInfo.phone || (paymentInfo.phone && !isValidPhone(paymentInfo.phone.trim()))){
            console.log("found error ",paymentInfo.phone)
            return updateError("Phone number must be 10 digits!", setError);
        }
        return true;
    };
    const handleOnChangeTextPhone = (value) => {
        console.log("Set Phone ",value)
        setPhone(value);
    };
    const submitForm = async () => {
        try {
            const paymentInfo = {
                bookingId: bookingId,
                payment_method: paymentMethod,
                amount_paid: amountPaid,
                phone: phone
            }
            if (isValidForm(paymentInfo)) {
                setLoading(true);

                let result = await CreatePayment(paymentInfo);
                if (result) {
                    const {ticketId} = result.id;
                    console.log("Payment successfully made!",result.id);
                    navigation.replace("TicketScreen", {ticketId});
                } else {
                    console.log("Failed to effect payment!", result?.error?.message);
                }
            }else{

            }
        } catch (e) {
            console.log("Failed to effect payment!", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setAmountPaid(payload.amount);
        setBookingId( payload.bookingId);
    }, []);
    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableOpacity
                    style={styles.arrowContainer}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={30} color="#000"/>
                </TouchableOpacity>
                <Text style={styles.title}>Payment Page</Text>
                <View style={styles.fieldContainer} onPress={() => Keyboard.dismiss}>
                    <BookingTextField placeholder="Payment" data={telcos} sendDataToParent={handleTelco}
                                      label="Payment"/>
                    <View style={{marginVertical: 20}}>
                        <TextField
                            label={`Phone Number`}
                            placeholder={`Phone Number must be 10 digits`}
                            icon={`phone`}
                            selectionColor={Colors.DEFAULT_GREEN}
                            keyboardType=""
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={{marginVertical: 20}}>
                        <TextInput
                            style={styles.inputField}
                            editable={false}
                            placeholderTextColor={"black"}
                            placeholder={amountPaid}
                            label="Amount Paid"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={submitForm}
                    >
                        <Text style={styles.btnText}>Pay</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    input: {
        alignItems: "center",
        fontSize: 15,
        paddingHorizontal: 50,
        backgroundColor: Colors.LIGHT_GREY2,
        width: "90%",
        height: 50,
        borderRadius: 50,
        shadowColor: Colors.DEFAULT_BLACK,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.121,
        shadowRadius: 9.11,
        elevation: 5,
    },
    fieldContainer: {
        alignSelf: "center",
        marginVertical: 50,
    },
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
    label: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
        paddingLeft: 10,
    },
    inputField: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: Colors.SECONDARY_WHITE,
        width: width - 40,
        height: 50,
        borderRadius: 50,
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
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        paddingBottom: 5,
      },
    btn: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: Colors.DEFAULT_GREEN,
        width: width - 40,
        height: 50,
        borderRadius: 50,
        shadowColor: Colors.DEFAULT_BLACK,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.121,
        shadowRadius: 9.11,
        elevation: 5,
    },
    btnText: {
        color: Colors.SECONDARY_WHITE,
        fontSize: 15,
        fontWeight: "bold",
    },
});
export default PaymentScreen;
