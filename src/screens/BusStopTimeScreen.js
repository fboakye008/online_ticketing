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
import {CreateBooking} from "../apis/booking";
import LoadingScreen from "./utils/LoadingScreen";

const {height, width} = Dimensions.get("window");
import {isValidObjField, updateError} from './utils/validations';
const BusStopTimeScreen = ({navigation, route}) => {
    const selectedRouteId = route.params.selectedRoute;
    const allRoutes = route.params.routes;
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

    const extractBusStops = function (routeBusStops, route_id) {
        const bus_stops = _.where(routeBusStops, {route_id: route_id});
        if (bus_stops && bus_stops.length > 0) {
            let result = bus_stops.map(a => ({"value": a.bus_stop_id, "label": a.bus_stop, "order": a.bus_stop_order}));
            const bustops = _.uniq(result, function (x) {
                return x["value"];
            });
            return _.sortBy(bustops, 'order');
        }
        return [];
    };

    const isValidForm = () => {
        if(!time){
            return updateError("Please select a departure time!", setError);
        }
        if(!busStop){
            return updateError("Please select where you would board the bus!", setError);
        }
        return true;
    };
    const submitForm = async () => {
        if (isValidForm()) {
            try {
                setLoading(true);
                const departureTimeObj = _.findWhere(allRoutes,{route_id: selectedRouteId, departure_time: time})
                const py = {bus_stopId: busStop, bus_scheduleId: departureTimeObj.bus_schedule_id, number_of_seats: numPassengers};

                let booking = await CreateBooking(py);
                if (booking && booking.id) {
                    setLoading(false);
                    console.log("successfully created booking. ID is ", booking.id);
                    navigation.replace("PaymentScreen", {
                        bookingId: booking.id,
                        amount: amount,
                        numPassengers: numPassengers
                    });
                } else {
                    return updateError("Booking unsuccessful. Please Try again", setError);
                }
            }catch(err){
                return updateError("Could not validate form", setError);
            }finally{
                setLoading(false);
            }
        } else {
            setLoading(false);
            return updateError("Form validation failed. Please select all inputs", setError);
        }
    };
    const extractTimes = function (objArray, route_id) {
        const bus_stops = _.where(objArray, {route_id: route_id});
        if (bus_stops && bus_stops.length > 0) {
            const moment = require("moment");
            let result = bus_stops.map(a => ({
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
            {error ? (
                <Text style={{color: Colors.Red, fontSize: 12, textAlign: "center"}}>
                    {error}
                </Text>
            ) : null}
            <TouchableOpacity
                style={styles.arrowContainer}
                onPress={() => navigation.goBack()}>
                <MaterialIcons name="keyboard-arrow-left" size={30} color="#000"/>

            </TouchableOpacity>
            <Text style={styles.text}> Departure</Text>
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
   
    // 
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
    text:{

        justifyContent: "space-between",
        alignItems: "center",
        fontSize:30 ,
        fontWeight: "bold",
        paddingHorizontal: 100,
        paddingTop: 5,
        paddingLeft: 145
    },
});

export default BusStopTimeScreen;

