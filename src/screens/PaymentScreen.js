import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";
import React, {useEffect, useState} from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Colors} from "../contents";
import {isValidPhone, updateError} from './utils/validations';
import {CreatePayment,CreateTickets} from "../apis/payment";
import TextField from "../components/CustomInput/TextInput";
import BookingTextField from "../components/CustomBookingInput";
import ReadOnlyField from "../components/CustomInput/ReadOnlyField";


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
        if(!paymentInfo.phone || (paymentInfo.phone && !isValidPhone(paymentInfo.phone.trim()))){
            return updateError("Phone number must be 10 digits!", setError);
        }
        if(!paymentInfo.payment_method){
            return updateError("Select a payment method", setError);
        }
        return true;
    };
    const handleOnChangeTextPhone = (value) => {
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
                const payments = await CreatePayment(paymentInfo,payload.numPassengers);
                //create tickets
                if (payments.length > 0) {
                    console.log("Payment successfully made for " + payments.length + ". Generating tickets now! Please wait..");
                    const tickets = await CreateTickets(payments);
                    if (tickets.length > 0) {
                        console.log("Tickets successfully generated. Created " + tickets.length + " tickets");
                        navigation.replace("TicketScreen", {bookingId});
                    }else{
                        console.log("Failed to generate tickets!");
                        return updateError("Failed to generate tickets!", setError);
                    }
                } else {
                    console.log("Failed to effect payment!");
                    return updateError("Failed to effect payment. Please try again!", setError);
                }
            }else{
                return updateError("Failed to effect payment. Please try again!", setError);
            }
        } catch (e) {
            console.log("Failed to effect payment!", e);
            return updateError("Failed to effect payment. Please try again!" + e, setError);
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
            {error ? (
                <Text style={{color: Colors.Red, fontSize: 12, textAlign: "center"}}>
                    {error}
                </Text>
            ) : null}
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
                            keyboardType="numeric"
                            autoCapitalize="none"
                            onChangeText={(value) => handleOnChangeTextPhone(value)}
                        />
                    </View>
                    <View style={{marginVertical: 20}}>
                        <ReadOnlyField
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
