import { ILocation, IPoint } from "@/app/(protected)";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker, Polyline, UrlTile } from "react-native-maps";
import { ThemedView } from "./themed-view";

type IProps = {
    aidPoints: IPoint[];
};

//const MAPTILER_KEY = "L5UfSrsqI9vZSRn5YPXe";
const MAPTILER_KEY = "L5UfSrsqI9vZSRn5YPXe";

function Map({ aidPoints }: IProps) {
    const [location, setLocation] = useState<ILocation | null>(null);
    const [routeCoordinates, setRouteCoordinates] = useState<ILocation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            // Запрос разрешений
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.warn("Разрешение на геолокацию не получено");
                setLoading(false);
                return;
            }

            try {
                const currentLocation = await Location.getCurrentPositionAsync(
                    {}
                );
                const { latitude, longitude } = currentLocation.coords;
                setLocation({ latitude, longitude });
            } catch (err) {
                console.error("Ошибка получения текущей позиции:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Функция построения маршрута через OSRM
    const buildRoute = async (destLat: number, destLon: number) => {
        if (!location) return;

        try {
            const { latitude, longitude } = location;

            const url = `https://router.project-osrm.org/route/v1/driving/${longitude},${latitude};${destLon},${destLat}?geometries=geojson`;

            const response = await fetch(url);

            // Проверяем, что сервер вернул JSON, а не HTML
            const text = await response.text();

            if (text.startsWith("<")) {
                console.error("OSRM вернул HTML вместо JSON:", text);
                return;
            }

            const data = JSON.parse(text);

            if (data.routes && data.routes.length > 0) {
                const coords = data.routes[0].geometry.coordinates.map(
                    ([lon, lat]: [number, number]) => ({
                        latitude: lat,
                        longitude: lon,
                    })
                );
                setRouteCoordinates(coords);
            } else {
                console.warn("OSRM не вернул маршруты:", data);
            }
        } catch (err) {
            console.error("Ошибка построения маршрута:", err);
        }
    };

    if (loading || !location) {
        return (
            <ThemedView
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="blue" />
            </ThemedView>
        );
    }

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
                        onPress={() =>
                            buildRoute(
                                point.location.latitude,
                                point.location.longitude
                            )
                        }
                        onCalloutPress={() =>
                            router.navigate(`/(protected)/${point.id}`)
                        }
                    ></Marker>
                ))}

                {/* Линия маршрута */}
                {routeCoordinates.length > 0 && (
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="blue"
                        strokeWidth={4}
                    />
                )}
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
