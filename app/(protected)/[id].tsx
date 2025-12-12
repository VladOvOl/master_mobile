import { getAidPoint } from "@/service/map.service";
import { getPhotoById } from "@/service/photo.service";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const PointDetails = () => {
    const [point, setPoint] = useState<any>(null);
    const [photos, setPhotos] = useState<string[]>([]);
    const { id } = useLocalSearchParams();

    useEffect(() => {
        loadPoint();
    }, []);

    const loadPoint = async () => {
        try {
            const response = await getAidPoint(id);
            const pointData = response.data;
            setPoint(pointData);

            if (pointData.photoIds?.length > 0) {
                loadAllPhotos(pointData.photoIds);
            }
        } catch (err) {
            console.log("POINT LOAD ERROR:", err);
        }
    };

    const loadAllPhotos = async (photoIds: number[]) => {
        const result: string[] = [];

        for (const photoId of photoIds) {
            const img = await loadPhoto(photoId);
            if (img) result.push(img);
        }

        setPhotos(result);
    };

    const loadPhoto = async (photoId: number) => {
        try {
            const resp = await getPhotoById(photoId)

            const type = resp.headers["content-type"] || "image/jpeg";

            const base64 = Buffer.from(resp.data, "binary").toString("base64");

            return `data:${type};base64,${base64}`;
        } catch (err) {
            console.log("PHOTO LOAD ERROR:", err);
            return null;
        }
    };

    if (!point) return <Text>Loading…</Text>;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Фото */}
            {photos.length > 0 &&
                photos.map((img, i) => (
                    <Image key={i} source={{ uri: img }} style={styles.photo} />
                ))}

            <Text style={styles.title}>{point.name}</Text>

            <Text style={styles.description}>{point.description}</Text>

            {/* Тип локации */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Тип локації:</Text>
                <Text style={styles.cardText}>{point.locationType.name}</Text>
                <Text style={styles.cardSub}>
                    {point.locationType.description}
                </Text>
            </View>

            {/* Координаты */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Координати:</Text>
                <Text style={styles.cardText}>
                    Lat: {point.location.latitude.toFixed(6)}
                </Text>
                <Text style={styles.cardText}>
                    Lon: {point.location.longitude.toFixed(6)}
                </Text>
            </View>

            {/* Создатель */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Створено:</Text>
                <Text style={styles.cardText}>
                    {point.createdBy.firstName} {point.createdBy.lastName}
                </Text>
                <Text style={styles.cardSub}>@{point.createdBy.username}</Text>
            </View>

            {/* Сервисы */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Сервіси:</Text>
                <View style={styles.servicesRow}>
                    {point.services.map((s: any) => (
                        <View key={s.id} style={styles.serviceTag}>
                            <Text style={styles.serviceText}>{s.name}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default PointDetails;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f8f8f8",
    },
    photo: {
        width: "100%",
        height: 220,
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: "#ddd",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 6,
        color: "#222",
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        color: "#555",
    },
    card: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 12,
        marginBottom: 14,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 4,
    },
    cardText: {
        fontSize: 16,
        color: "#333",
    },
    cardSub: {
        fontSize: 14,
        color: "#777",
        marginTop: 2,
    },
    servicesRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
    },
    serviceTag: {
        backgroundColor: "#007AFF22",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    serviceText: {
        color: "#007AFF",
        fontWeight: "600",
    },
});
