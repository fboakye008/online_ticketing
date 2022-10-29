import React, {useState, useRef, useEffect, useMemo} from 'react';
import {Button, View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Platform} from 'react-native';
import MapView, {Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import imagePath from '../constants/imagePath';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API_KEY} from "@env";
import {findMapRoute} from "../apis/map";
import {updateError} from '../utils';

const MapScreen = () => {

    const screen = Dimensions.get('window');
    const ASPECT_RATIO = screen.width / screen.height;
    const LATITUDE_DELTA = 0.20;
    const LONGITUDE_DELTA =LATITUDE_DELTA * ASPECT_RATIO;
    const CENTER_OFFSET_DELTA = 0.20;
    const mapRef = useRef();
    const markerRef = useRef();
    let provider
    if (Platform.OS === 'ios') {
    } else {
        provider = PROVIDER_GOOGLE
    }
    const [error, setError] = useState("");
    const [state, setState] = useState({
        origin: {},
        destination: {},
        currentLocation: {},
        live: "0",
        isLoading: false,
        coordinates: [],
        coordinate: new AnimatedRegion({
            latitude: {},
            longitude: {},
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),
        distanceStr: "",
        timeStr: "",
        time: 0,
        distance: 0,
        heading: 0
    });
    const {
        origin,
        destination,
        currentLocation,
        live,
        isLoading, coordinates, coordinate,
        distanceStr, timeStr, distance, time, initialRegion
    } = state
    const updateState = (data) => setState((state) => ({...state, ...data}));
    /**
     *
     * @param q
     * @returns {Promise<void>}
     */
    const getLiveLocation = async (q) => {
        animate(q.latitude, q.longitude);
        updateState({
            live: live,
            currentLocation: q,
            coordinate: new AnimatedRegion({
                latitude: q.latitude,
                longitude: q.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            })
        })
    }
    useMemo(() => {
        async function populateData() {
            try {
                const mapData = await findMapRoute();
                if (mapData) {

                    let sumLat = mapData.coordinates.reduce((a, c) => {
                        return parseFloat(a) + parseFloat(c.latitude)
                    }, 0);
                    let sumLong = mapData.coordinates.reduce((a, c) => {
                        return parseFloat(a) + parseFloat(c.longitude)
                    }, 0);

                    let avgLat = (sumLat / mapData.coordinates.length) || 0;
                    let avgLong = (sumLong / mapData.coordinates.length) || 0;

                    const initRegion = {
                        latitude: parseFloat(avgLat),
                        longitude: avgLong,
                        latitudeDelta: LATITUDE_DELTA + CENTER_OFFSET_DELTA,
                        longitudeDelta: LONGITUDE_DELTA + CENTER_OFFSET_DELTA,
                    };
                    updateState({
                        origin: mapData.origin,
                        currentLocation: mapData.origin,
                        coordinates: mapData.coordinates,
                        destination: mapData?.destination,
                        initialRegion: initRegion,
                        coordinate: new AnimatedRegion({
                            latitude: mapData.origin.latitude,
                            longitude: mapData.origin.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA
                        })
                    })
                    const timeStr = mapData.duration.replace("s", "").trim();
                    const duration = Math.ceil(parseInt(timeStr) / 60)
                    const distance = Math.ceil(parseInt(mapData?.distance) / 1000)
                    fetchTime(distance, duration);
                }
                return "done"
            } catch (err) {
                console.log(err);
                console.log("Something went wrong")
                return updateError(err.toString(), setError);
            }
        }

        populateData().catch();
    }, []);
    /**
     *
     */
    useEffect(() => {
        // let counter = 0;
        // const interval = setInterval(() => {
        //     const q = coordinates[counter];
        //     const g = getLiveLocation(q)
        //     counter++;
        //     if (counter === coordinates.length) {
        //         clearInterval(interval);
        //     }
        // }, 2000);
    }, [])
    const startAnimation = function () {
        if (coordinates && coordinates.length > 0) {
            let counter = 0;
            const interval = setInterval(() => {
                const q = coordinates[counter];
                const g = getLiveLocation(q)
                counter++;
                if (counter === coordinates.length) {
                    clearInterval(interval);
                }
            }, 500);
        }
    }
    /**
     *
     * @param data
     */
    const fetchValue = (data) => {
        updateState({
            destination: {
                latitude: data.latitude,
                longitude: data.longitude,
            }
        })
    }
    /**
     *
     * @param latitude
     * @param longitude
     */
    const animate = (latitude, longitude) => {
        const newCoordinate = {latitude, longitude};
        coordinate.timing(newCoordinate).start();
    }
    /**
     *
     */
    const onCenter = () => {
        mapRef.current.animateToRegion({
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    }
    /**
     *
     * @param distance
     * @param time
     */
    const fetchTime = (distance, time, foo) => {
        const dst = `Distance: ${distance.toFixed(2)} km`;
        const tst = `Duration: ${time.toFixed(0)} min`;
        updateState({
            distance: distance,
            time: time,
            distanceStr: dst,
            timeStr: tst
        })
    }

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <MapView
                    ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    provider={provider}
                    initialRegion={initialRegion}
                    onMapReady={() => {
                        mapRef.current.fitToSuppliedMarkers(['mk1', 'mk2'])
                    }
                    }
                >

                    <Marker.Animated
                        ref={markerRef}
                        coordinate={coordinate}
                        identifier={"mk1"}
                        image={imagePath.icRedMarker}
                    />

                    {Object.keys(destination).length > 0 && (<Marker
                        coordinate={destination}
                        identifier={"mk2"}
                        image={imagePath.icGreenMarker}
                    />)}
                    {(() => {
                        switch (live) {
                            case "1":
                                return Object.keys(currentLocation).length > 0 && (<MapViewDirections
                                    origin={currentLocation}
                                    destination={destination}
                                    apikey={GOOGLE_API_KEY}
                                    strokeWidth={6}
                                    strokeColor="red"
                                    optimizeWaypoints={true}
                                    onStart={(params) => {
                                        //console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                                    }}
                                    onReady={result => {
                                        fetchTime(result.distance, result.duration)
                                        mapRef.current.fitToCoordinates(result.coordinates, {
                                            edgePadding: {
                                                // right: 30,
                                                // bottom: 300,
                                                // left: 30,
                                                // top: 100,
                                            },
                                        });
                                    }}
                                    onError={(errorMessage) => {
                                        console.log(errorMessage)
                                        // console.log('GOT AN ERROR');
                                    }}
                                />);
                            default:
                                return (coordinates.length > 0 && <Polyline coordinates={coordinates}
                                                                            strokeColor={"red"}
                                                                            strokeWidth={3}
                                                                            lineDashPattern={[1]}/>);
                        }
                    })()}
                </MapView>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0
                    }}
                    onPress={onCenter}>
                    <Image source={imagePath.greenIndicator}/>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomCard}>
                <Text>Time left: {distanceStr} </Text>
                <Text>Distance left: {timeStr}</Text>
                <Button onPress={() => startAnimation()} title="Start Animation" color="#841584"/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomCard: {
        backgroundColor: 'white',
        width: '100%',
        padding: 30,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24
    },
    inputStyle: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        marginTop: 16
    }
});
export default MapScreen;
