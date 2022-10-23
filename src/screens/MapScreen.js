import * as React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions, Button, TouchableOpacity} from 'react-native';
import {GOOGLE_API_KEY} from "@env";
import MapViewDirections from 'react-native-maps-directions';
import {useEffect, useRef, useState} from "react";
import {EvilIcons} from "@expo/vector-icons";
import { Avatar,  Card, Title, Paragraph } from 'react-native-paper';
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here
    // is better than directly setting `value + 1`
}
const MapScreen = ({navigation}) => {
    const {width, height} = Dimensions.get('window');
    const origin = {latitude: 5.723669726699578, longitude: 0.043682456624945014};
    const destination = {latitude: 5.722853131829537, longitude: 0.03143773186297082};
    const forceUpdate = useForceUpdate();
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    let mapRef = useRef();
    const [markers, setMarkers] = useState([
        {
        coordinate: origin,
        title: "Kpone Affordable Housing",
        id: 1,
        },
        {
        coordinate: destination,
        title: "Community 25 Mall",
        id: 2,
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
    const [region, setRegion] = useState(null);
    const onPressZoomIn = function() {
        mapRef.getCamera().then((cam) => {
            cam.zoom += 1;
            mapRef.animateCamera(cam);
        });
    }

    const onPressZoomOut = function() {
        mapRef.getCamera().then((cam) => {
            cam.zoom -= 1;
            mapRef.animateCamera(cam);
        });
    }

    // useEffect(() => {
    //     if (mapRef.current) {
    //         // list of _id's must same that has been provided to the identifier props of the Marker
    //         mapRef.current.fitToSuppliedMarkers(markers.map(({ id }) => id));
    //     }
    // }, [markers]);

    return (
        <View style={StyleSheet.absoluteFillObject} >
            <MapView style={styles.map}
                     ref={map=>{mapRef = map}}
                     provider={PROVIDER_GOOGLE}
                     initialRegion={initialRegion}
                     zoomEnabled={false}
                     zoomTapEnabled={false}
                     scrollDuringRotateOrZoomEnabled={false}
                     onRegionChangeComplete = {region => {
                         setRegion(region);
                     }}
                     >
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        identifier={marker.id}
                        coordinate={marker.coordinate}
                        title={marker.title}
                    />
                ))}
                {/*<Marker*/}
                {/*    key={24}*/}
                {/*    identifier={"24"}*/}
                {/*    coordinate={origin}*/}
                {/*    title="">*/}
                {/*    <Card>*/}
                {/*        <Card.Title title="Trip Info"/>*/}
                {/*        <Card.Content>*/}
                {/*            <Paragraph>Duration (mins) : {duration}</Paragraph>*/}
                {/*            <Paragraph>Distance (km) : {distance}</Paragraph>*/}
                {/*        </Card.Content>*/}
                {/*    </Card>*/}
                {/*</Marker>*/}
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    strokeWidth={5}
                    strokeColor="#0096FF"
                    apikey={GOOGLE_API_KEY}
                    onReady={result => {
                        console.log('Calling setDistance')
                        setDistance(result.distance)
                        setDuration(parseFloat(result.duration).toFixed(2))
                    }}
                />
            </MapView>
            <TouchableOpacity
                onPress={() => { onPressZoomIn() }}>
                <EvilIcons name="plus" size={24} color="red"/>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { onPressZoomOut() }}>
                <EvilIcons name="minus" size={24} color="red"/>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    map: {
        flex: 1,
    },

});
export default MapScreen;