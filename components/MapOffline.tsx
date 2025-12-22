import { ILocation, IPoint } from "@/app/(protected)";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { ThemedView } from "./themed-view";

type IProps = {
    aidPoints: IPoint[];
};


function MapOffline({ aidPoints }: IProps) {
    const [location, setLocation] = useState<ILocation | null>(AsyncStorage.getItem("LOCATION"));
    const [routeCoordinates, setRouteCoordinates] = useState<ILocation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
         const get = async()=>{
            const res = await AsyncStorage.getItem("LOCATION")
            setLocation(res)
         }
            get()    
    },[])

    return (
        <ThemedView style={styles.container}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                showsUserLocation
                followsUserLocation
            >
                {/* Тайлы MapTiler */}
                <UrlTile
                    urlTemplate={`https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
                    maximumZ={20}
                />

                {/* Маркер текущей позиции */}
                <Marker coordinate={location} title="Вы здесь" />

                {/* Маркеры точек назначения */}
                {aidPoints.map((point) => (
                    <Marker
                        key={point.id}
                        coordinate={{
                            latitude: point.location.latitude,
                            longitude: point.location.longitude,
                        }}
                        title={point.name}
                        description={"Click to see\nmore information"}
                        pinColor="blue"
                        
                        onCalloutPress={() =>
                            router.navigate(`/(protected)/${point.id}`)
                        }
                    ></Marker>
                ))}

            </MapView>
        </ThemedView>
    );
}

export default Map;

const styles = StyleSheet.create({
    container: { flex: 1, width: "100%" },
    map: { flex: 1 },
    loader: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
