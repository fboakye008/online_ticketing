import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Image,
    Keyboard,
    ScrollView,
} from "react-native";
import React, {useEffect, useState} from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Colors} from "../contents";
import {isValidPhone, updateError} from '../utils';
import {CreatePayment,CreateTickets} from "../apis/payment";
import TextField from "../components/CustomInput/TextField";
import BookingTextField from "../components/CustomBookingInput";
import DisplayPaymentMessage from '../components/CustomPaymentMessage/DisplayPaymentMessage'
import projectlogo from "../assets/images/projectLogo.png";

const {width} = Dimensions.get("window");

const PaymentScreen = ({navigation, route}) => {
    const payload = route.params;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [bookingId, setBookingId] = useState(null);
    const [amountPaid, setAmountPaid] = useState(null);
    const [numPassengers,setNumPassengers]  = useState(1);
    const [phone, setPhone] = useState(null);
    const telcos = [
        {"value": "MTN", "label": "MTN"},
        {"value": "Voda", "label": "VODA Cash"},
        {"value": "AirTel", "label": "TIGO Cash"}
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
                const payment = await CreatePayment(paymentInfo);
                //create tickets
                if (payment) {
                    console.log("Payment successfully made. Generating tickets now! Please wait..");
                    const tickets = await CreateTickets(payment,numPassengers);
                    if (tickets.length > 0) {
                        console.log("Tickets successfully generated. Created " + tickets.length + " tickets");
                        navigation.replace("PaymentMessage", {bookingId});
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
            return updateError("Failed to effect payment. Please try again!" + e.toString(), setError);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setAmountPaid(payload.amount);
        setBookingId( payload.bookingId);
        setNumPassengers(payload.numPassengers);
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
            style={styles.header}
            onPress={() => navigation.goBack()}>
          <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
                 <Text style={styles.Headertopic}>Make Payment </Text>
           <View>
               <Image source={projectlogo} style={[styles.Image]} resizeMode="cover"/>
            </View>
          </View>
        </TouchableOpacity>
               <ScrollView>
                <DisplayPaymentMessage paymentInfo={payload}></DisplayPaymentMessage>

                <View style={styles.fieldContainer} onPress={() => Keyboard.dismiss}>
                    <BookingTextField placeholder="Payment" data={telcos} sendDataToParent={handleTelco}
                                      label="Payment"/>
                        <TextField
                            label={`Phone Number`}
                            placeholder={`Phone Number must be 10 digits`}
                            selectionColor={Colors.DEFAULT_GREEN}
                            keyboardType="numeric"
                            autoCapitalize="none"
                            onChangeText={(value) => handleOnChangeTextPhone(value)}
                        />

                        <Text style={{fontSize: 18,
                                textAlign: "center",
                                 marginTop: 15,
                                paddingBottom: 5}}>Total Amount: {amountPaid}</Text>

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={submitForm}>
                        <Text style={styles.btnText}>Pay</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    fieldContainer: {
        alignSelf: "center",
        marginVertical: 2,
    },


    btn: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
        marginLeft: 5,
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
    header:{
        borderBottomColor: '#eee',
        justifyContent: "space-between",
        width: "100%",
        borderBottomWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
        marginLeft: 1,
        paddingTop: 25,
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
export default PaymentScreen;
