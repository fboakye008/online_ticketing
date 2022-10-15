import {MaterialIcons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import BookingTextField from "../components/CustomBookingInput";
import ReadOnlyField from "../components/CustomInput/ReadOnlyField";
import {Colors} from "../contents";
import moment from 'moment';
import _ from "underscore";
import SubmitButton from "../components/CustomInput/SubmitButton";
import LoginUser from "../apis/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CreateBooking} from "../apis/booking";
import LoadingScreen from "./utils/LoadingScreen";

const {height, width} = Dimensions.get("window");
import {isValidObjField, updateError} from './utils/validations';
//routes: data.routes, selectedRoute: selectedRoute
const BusStopTimeScreen = ({navigation, route}) => {
    const selectedRouteId = route.params.selectedRoute;
    const allRoutes = route.params.routes
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState({
        today: moment().format('dddd MMMM Do YYYY, h:mm:ss a'),
        routes: [],
    });
    const [selectedRoute, setSelectedRoute] = useState();
    const [fare, setFare] = useState();
    const [amount, setAmount] = useState(0);
    const [busStop, setBusStop] = useState("");
    const [busStops, setBusStops] = useState([]);
    const [time, setTime] = useState("");
    const [times, setTimes] = useState([]);
    const [numPassengers, setNumPassengers] = useState(1);

    const extractBusStops = function (objArray, route_id) {
        const bus_stops = _.where(objArray, {route_id: route_id});
        if (bus_stops && bus_stops.length > 0) {
            let result = objArray.map(a => ({"value": a.bus_stop_id, "label": a.bus_stop, "order": a.bus_stop_order}));
            const bustops = _.uniq(result, function (x) {
                return x["value"];
            });
            return _.sortBy(bustops, 'order');
        }
        return [];
    };

    const isValidForm = () => {
        // //We will accept only if all of the fields have value
        // if (!isValidObjField(userInfo))
        //   return updateError("Required all fields!", setError);
        // // Phone number must have 9 digits
        // if (!isValidPhone(phone))
        //   return updateError("Phone number is required and must be 10 digits!", setError);
        // // password must have 8 or more characters
        // if (!password.trim())
        //   return updateError("Password is required!", setError);
        return true;
    };
    const submitForm = async () => {
        if (isValidForm()) {
            setLoading(true);
            const py = {bus_stopId: busStop, bus_scheduleId: selectedRouteId, number_of_seats: numPassengers};
            let booking = await CreateBooking(py);
            if (booking && booking.id) {
                setLoading(false);
                // const payload = {phone: user.phone, full_name: user.full_name, api_key: user.api_key};
                //await AsyncStorage.setItem("user", JSON.stringify(payload))
                console.log("successfully created booking. ID is ", booking.id);
                navigation.replace("Payment", {
                    bookingId: booking.id,
                    amount: amount
                });
            } else {
                setLoading(false);
                return updateError("PSome error", setError);
            }
        } else {
            setLoading(false);
            return updateError("YYYY", setError);
        }
    };
    const extractTimes = function (objArray, route_id) {
        const bus_stops = _.where(objArray, {route_id: route_id});
        if (bus_stops && bus_stops.length > 0) {
            const moment = require("moment");
            let result = objArray.map(a => ({
                "value": a.departure_time,
                "label": moment(a.departure_time).format("hh:mm A"),
                "order": a.departure_time
            }));
            const times = _.uniq(result, function (x) {
                return x["label"];
            });
            return _.sortBy(times, 'order');
        }
        return [];
    }
    const sendDataToBusStopTime = (index) => {
        if (index.route) {
            setSelectedRoute(route);
        }
        if (index.busStop) {
            setBusStop(index.busStop);
        }
        if (index.time) {
            setTime(index.time);
        }
        if (index.numOfPassengers) {
            setNumPassengers(parseInt(index.numOfPassengers));
            setAmount(parseInt(index.numOfPassengers) * fare);
        }
    };
    useEffect(() => {
        const fare = _.findWhere(allRoutes, {route_id: selectedRouteId});
        if (fare && fare.fare) {
            setFare(fare.fare);
            setAmount(fare.fare);
        }
        const busStops = extractBusStops(allRoutes, selectedRouteId);
        setBusStops(busStops);
        const times = extractTimes(allRoutes, selectedRouteId);
        setTimes(times);
    }, []);
    return (
        <SafeAreaView style={styles.wrapper}>
            <TouchableOpacity
                style={styles.arrowContainer}
                onPress={() => navigation.goBack()}>
                <MaterialIcons name="keyboard-arrow-left" size={30} color="#000"/>
            </TouchableOpacity>
            <View style={styles.container}>
                <ReadOnlyField
                    style={styles.input}
                    editable={false}
                    placeholderTextColor={"black"}
                    placeholder={data.today}
                    label="Date"
                />
                <BookingTextField placeholder="Bus Stop" data={busStops} sendDataToParent={sendDataToBusStopTime}
                                  label="Bus Stop"/>
                <BookingTextField placeholder="Time" data={times} sendDataToParent={sendDataToBusStopTime}
                                  label="Time"/>
                <BookingTextField numOfPassenger={true} label="Number of passengers"
                                  sendDataToParent={sendDataToBusStopTime}/>
                <ReadOnlyField
                    style={styles.input}
                    editable={false}
                    placeholderTextColor={"black"}
                    placeholder={amount}
                    label="Total Amount"
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={submitForm}
                >
                    <Text style={styles.btnText}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
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
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: height,
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
    inputContainer: {
        backgroundColor: Colors.Silver,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.DEFAULT_GREY,
        justifyContent: "center",
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

export default BusStopTimeScreen;

