import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Base, Typography } from "../../styles";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import getCoordinates from "../../models/nominatim";
import * as Location from 'expo-location';
import React from "react";

export default function ShipOrder({ route }) {
    const { order } = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [markerId, setMarkerId] = useState(null);
    const map = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                identifier="Min plats"
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address},${order.city}`);
            setMarkerId(results[0].display_name);
            setMarker(<Marker
                identifier={results[0].display_name}
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />);
        })();
    }, []);

    function fitMarkers() {
        if (map?.current && marker) {
            map.current.fitToSuppliedMarkers([markerId, "Min plats"], true)
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }} style={Base.base}>
            <Text style={Typography.header3}>Skicka order</Text>
            <Text style={Typography.normal2}>{order.name}</Text>
            <Text style={Typography.normal2}>{order.address}</Text>
            <Text style={Typography.normal2}>{order.zip} {order.city}</Text>
            <Text style={Typography.normal}>{order.country}</Text>
            <View style={styles.container}>
                <MapView
                    ref={map}
                    key={marker}
                    style={styles.map}
                    onMapReady={fitMarkers}
                    onMapLoaded={fitMarkers}
                    >
                    {marker}
                    {locationMarker}
                </MapView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 10,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});