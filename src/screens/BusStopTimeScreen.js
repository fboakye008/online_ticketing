import {MaterialIcons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Image,
    SafeAreaView,
} from "react-native";
import BookingTextField from "../components/CustomBookingInput";
import ReadOnlyField from "../components/CustomInput/ReadOnlyField";
import {Colors} from "../contents";
import moment from 'moment';
import _ from "underscore";
const lodash = require("lodash");
import {CreateBooking} from "../apis/booking";
import projectlogo from "../assets/images/projectLogo.png";

const {height, width} = Dimensions.get("window");
import {updateError} from '../utils';

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
            let result = bus_stops.map(a => ({"value": a.bus_stop_id, "label": a.bus_stop, "order": parseInt(a.bus_stop_order)}));
            let bustops = _.uniq(result, function (x) {
                return x["value"];
            });
            bustops = lodash.sortBy(bustops,
                [function(bs) { return parseInt(bs.order); }]);

            bustops.pop();
            return bustops;
        }
        return [];
    };

    const isValidForm = () => {
        if (!time) {
            return updateError("Please select a departure time!", setError);
        }
        if (!busStop) {
            return updateError("Please select where you would board the bus!", setError);
        }
        return true;
    };
    const submitForm = async () => {
        try {
            if (isValidForm()) {
                setLoading(true);
                const departureTimeObj = _.findWhere(allRoutes, {route_id: selectedRouteId, departure_time: time})

                const py = {
                    bus_stopId: busStop,
                    bus_scheduleId: departureTimeObj.bus_schedule_id,
                    number_of_seats: numPassengers
                };
                let booking = await CreateBooking(py);
                if (booking && booking.id) {
                    setLoading(false);
                    console.log("successfully created booking. ID is ", booking.id);
                    navigation.navigate("PaymentScreen", {
                        bookingId: booking.id,
                        amount: amount,
                        numPassengers: numPassengers,
                        departureTimeObj: departureTimeObj
                    });
                } else {
                    return updateError("Booking unsuccessful. Please Try again", setError);
                }
            } else {
                setLoading(false);
                return updateError("Form validation failed. Please select all inputs", setError);
            }
        } catch (err) {
            return updateError(err, setError);
        } finally {
            setLoading(false);
        }
    };
    const extractTimes = function (objArray, route_id) {
        if (!objArray) {
            return [];
        }
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
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.DEFAULT_GREEN}
                translucent
            />
            <TouchableOpacity
                style={styles.header}
                onPress={() => navigation.goBack()}>
                <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15}}>
                    <MaterialIcons name="keyboard-arrow-left" size={30} color="#000"/>
                    <Text style={styles.topic}>Departure </Text>

                    <View>
                        <Image source={projectlogo} style={[styles.Image]} resizeMode="cover"/>
                    </View>
                </View>

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

                <View>
                    <Text style={styles.title}>Total Amount: {amount}</Text>
                </View>

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

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: height,
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
    header:{
            borderBottomColor: '#eee',
            justifyContent: "space-between",
            width: "100%",
            borderBottomWidth: 5,
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 12,
            marginLeft: 1,
            paddingTop:25,
            paddingHorizontal: 12,
            backgroundColor: Colors.DEFAULT_WHITE,
          },
    text: {

        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 30,
        fontWeight: "bold",
        paddingHorizontal: 100,
        paddingTop: 5,
        paddingLeft: 145
    },
    topic: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: "bold",
    },
    Image: {

        height: 30,
        width: 30,
        marginRight: 20,
    },
});

export default BusStopTimeScreen;

