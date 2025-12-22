import Map from "@/components/Map";
import { IQuery, PointsFilter } from "@/components/PointsFilter";
import { ThemedView } from "@/components/themed-view";
import { useNetwork } from "@/provider/NetworkProvider";
import { getAllAidPoints } from "@/service/map.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";

export type ILocationTypes = {
    code: string;
    description: string;
    id: number;
    name: string;
    smsCode: string;
};

export type IPoint = {
    id: number;
    name: string;
    description: string;
    location: ILocation;
    address: string | null;
    locationType: ILocationTypes;
};

export type ILocation = {
    latitude: number;
    longitude: number;
};

const STORAGE_KEY = "AID_POINTS_CACHE";

export default function HomeScreen() {
    const [aidPoints, setAidPoints] = useState<IPoint[]>([]);
    const [query, setQuery] = useState<IQuery>({
        name: "",
        locationTypeId: 0,
        range: 10000,
        search: false,
    });

    useEffect(() => {
        if (query.search) {
            // 👉 загружаешь точки / фильтруешь маркеры
            fetchPoints(query);
        }
    }, [query.search]);

    const { online } = useNetwork();

    useEffect(() => {
        loadAidPoints();
    }, [online]);

    const loadAidPoints = async () => {
        if (online) {
            await fetchAndSavePoints();
        } else {
            await loadPointsFromStorage();
            console.log("co][");
        }
    };

    // 📡 Загружаем с сервера и сохраняем
    const fetchAndSavePoints = async () => {
        try {
            const response = await getAllAidPoints();
            setAidPoints(response.data);

            await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(response.data)
            );
        } catch (error) {
            console.log("Error fetching points", error);
            await loadPointsFromStorage(); // fallback
        }
    };

    // 📦 Загружаем из локального хранилища
    const loadPointsFromStorage = async () => {
        try {
            const cached = await AsyncStorage.getItem(STORAGE_KEY);

            if (cached) {
                setAidPoints(JSON.parse(cached));
            }
            console.log(cached);
        } catch (error) {
            console.log("Error loading cached points", error);
        }
    };

    return (
        <ThemedView>
            {online === true && (
                <ThemedView style={{ height: "100%" }}>
                    <PointsFilter value={query} onChange={setQuery} />
                    <Map aidPoints={aidPoints} />
                    <Link href={"/(protected)/create_point"} asChild>
                        <Link href={"/(protected)/create_point"} asChild>
                            <Button title="Create new point" />
                        </Link>
                    </Link>
                </ThemedView>
            )}
            {online === false && (
                <ThemedView style={{ height: "100%" }}>
                    <Map aidPoints={aidPoints} />
                </ThemedView>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
