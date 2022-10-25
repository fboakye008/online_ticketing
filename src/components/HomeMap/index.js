import {Dimensions, StyleSheet, TouchableOpacity, View, Platform, Text, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import {EvilIcons} from "@expo/vector-icons";
import { Display } from '../../screens/utils';
import {GOOGLE_API_KEY} from "@env";
import {useEffect, useRef, useState} from "react";
import {Card, Paragraph} from "react-native-paper";


const HomeMap = (navigator) => {
    const {width, height} = Dimensions.get('window');
    const origin = {latitude: 5.723669726699578, longitude: 0.043682456624945014};
    const destination = {latitude: 5.722853131829537, longitude: 0.03143773186297082};
    let provider= PROVIDER_GOOGLE
    if(Platform.OS === 'ios' ){
    }else{
        provider = PROVIDER_GOOGLE
    }
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const _mapRef = useRef(null);
    //const [markers, setMarkers] = useState([]);
    const [markers, setMarkers] = useState([
        {
            coordinate: origin,
            title: "Kpone Affordable Housing",
            id: 1,
        image: require('../../../assets/logo1.png'),
            identifier: 'mk1'
        },
        {
            coordinate: destination,
            title: "Community 25 Mall",
            id: 2,
            identifier: 'mk2',
            image: require('../../../assets/bus_stop.png')
        }
    ]);
    const initialRegion = {
        latitude: 5.723669726699578,
        longitude: 0.043682456624945014,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    };
    const [duration, setDuration] = useState("");
    const [distance, setDistance] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [region, setRegion] = useState(null);
    const onPressZoomIn = function() {
        _mapRef.current.getCamera().then((cam) => {
            cam.zoom += 1;
            _mapRef.current.animateCamera(cam);
        });
    }
    const onPressZoomOut = function() {
        _mapRef.current.getCamera().then((cam) => {
            cam.zoom -= 1;
            _mapRef.current.animateCamera(cam);
        });
    }
    useEffect(() => {
        //find the latest non-expired entry

        // _mapRef.current.animateCamera({center: {
        //         latitude: destination.latitude,
        //         longitude: destination.longitude
        //     }}, 1000)
    }, []);
    return (
        <View style={{


        backgroundColor: "#a0abff",
        justifyContent: 'center',
        alignItems: 'center',
        height: Display.setHeight(50),
        width: Display.setWidth(100),

        }} >
       
            <MapView style={{height: "100%", width: "100%"}}
                     ref={_mapRef}
                     provider={provider}
                     initialRegion={initialRegion}
                     region={region}
                     onRegionChangeComplete = {region => {
                         setRegion(region);
                     }}
                     onMapReady={() => {
                         _mapRef.current.fitToSuppliedMarkers(['mk1','mk2'],
                         {
                         edgePadding:
                             {top: 50,
                                 right: 50,
                                 bottom: 50,
                                 left: 50}
                     })}}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        identifier={marker.identifier}
                        coordinate={marker.coordinate}
                        title={marker.title}
                    >
                        <Image source={marker.image} style={{ height: 24, width: 24 }} />
                    </Marker>
                ))}
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    strokeWidth={5}
                    strokeColor="#0096FF"
                    apikey={GOOGLE_API_KEY}
                    onReady={result => {
                        setDistance(result.distance)
                        setDuration(parseFloat(result.duration).toFixed(2))
                    }}
                />
                {/* <View><TouchableOpacity>
                    <Card>
                        <Card.Content>
                            <Text>
                                <Text style={{fontWeight: "bold"}}>Duration :</Text><Text> {duration} (mins)</Text>
                                <Text style={{fontWeight: "bold"}}> Distance :</Text><Text> {distance} (km)</Text>
                                <Text style={{fontWeight: "bold"}}> Departure :</Text><Text> {departureTime}</Text>
                            </Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                </View> */}
                 
            </MapView>
            

            {/*<TouchableOpacity*/}
            {/*    onPress={() => { onPressZoomOut() }}>*/}
            {/*    <EvilIcons name="minus" size={24} color="red"/>*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity*/}
            {/*    onPress={() => { onPressZoomIn() }}>*/}
            {/*    <EvilIcons name="plus" size={24} color="red"/>*/}
            {/*</TouchableOpacity>*/}
        </View>
    );
}



// return (
//         <View style={{
//             height: 440,
//             backgroundColor: "#a0abff",
//             justifyContent: 'center',
//             alignItems: 'center',
//         }}>
//
//             <MapView
//                 style={{height: "100%", width: "100%"}}
//                 provider={PROVIDER_GOOGLE}
//                 initialRegion={{
//                     latitude: 37.78825,
//                     longitude: -122.4324,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                 }}
//             ></MapView>
//         </View>
//     )
// }

export default HomeMap;