import { useNetwork } from "@/provider/NetworkProvider";
import { getAllAidPoints } from "@/service/map.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { IPoint } from ".";

const STORAGE_KEY = "AID_POINTS_CACHE";

export default function HomeScreen() {
    const [items, setAidPoints] = useState<IPoint[]>([]);

    const { online } = useNetwork();

    useEffect(() => {
        loadAidPoints();
    }, [online]);

    const loadAidPoints = async () => {
        if (online) {
            await fetchAndSavePoints();
        } else {
            await loadPointsFromStorage();
            console.log("co][")
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
            console.log(cached)
        } catch (error) {
            console.log("Error loading cached points", error);
        }
    };

    if (!items || items.length === 0) {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyText}>No data available</Text>
            </View>
        );
    }

    const renderItem = ({ item }: { item: Point }) => {
        if (!item) return null;

        return (
            <View style={styles.card}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.name || "Untitled"}
                    </Text>

                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>
                            {item.status || "UNKNOWN"}
                        </Text>
                    </View>
                </View>

                {/* Description */}
                {item.description ? (
                    <Text style={styles.description}>{item.description}</Text>
                ) : null}

                {/* Info */}
                <View style={styles.row}>
                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.value}>{item.address || "—"}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Location type</Text>
                    <Text style={styles.value}>
                        {item.locationType?.name || "—"}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Coordinates</Text>
                    <Text style={styles.value}>
                        {item.location?.latitude != null &&
                        item.location?.longitude != null
                            ? `${item.location.latitude}, ${item.location.longitude}`
                            : "—"}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Created by</Text>
                    <Text style={styles.value}>
                        {item.createdBy
                            ? `${item.createdBy.firstName || ""} ${
                                  item.createdBy.lastName || ""
                              }`.trim() || "—"
                            : "—"}
                    </Text>
                </View>

                {/* Contacts */}
                {Array.isArray(item.contacts) && item.contacts.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Contacts</Text>
                        {item.contacts.map(
                            (c) =>
                                c && (
                                    <Text key={c.id} style={styles.listItem}>
                                        {c.fullName || "Unnamed"}
                                        <Text style={styles.muted}>
                                            {" "}
                                            • {c.phoneNumber || "No phone"}
                                        </Text>
                                    </Text>
                                )
                        )}
                    </View>
                )}

                {/* Services */}
                {Array.isArray(item.services) && item.services.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Services</Text>
                        <View style={styles.badges}>
                            {item.services.map(
                                (s) =>
                                    s && (
                                        <View key={s.id} style={styles.badge}>
                                            <Text style={styles.badgeText}>
                                                {s.name || "—"}
                                            </Text>
                                        </View>
                                    )
                            )}
                        </View>
                    </View>
                )}

                {/* Footer */}
                <Text style={styles.footer}>
                    Photos:{" "}
                    {Array.isArray(item.photoIds) ? item.photoIds.length : 0}
                </Text>
            </View>
        );
    };

    return (
        <FlatList
            data={items}
            keyExtractor={(item, index) => String(item?.id ?? index)}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        padding: 16,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },

    title: {
        fontSize: 18,
        fontWeight: "600",
        flex: 1,
        marginRight: 8,
    },

    statusBadge: {
        backgroundColor: "#EEF2FF",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    statusText: {
        fontSize: 12,
        color: "#3730A3",
        fontWeight: "500",
    },

    description: {
        color: "#444",
        lineHeight: 20,
        marginBottom: 10,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },

    label: {
        fontSize: 13,
        color: "#666",
    },

    value: {
        fontSize: 13,
        fontWeight: "500",
        maxWidth: "60%",
        textAlign: "right",
    },

    section: {
        marginTop: 12,
    },

    sectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 6,
    },

    listItem: {
        fontSize: 13,
        marginBottom: 4,
    },

    badges: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    badge: {
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginRight: 6,
        marginBottom: 6,
    },

    badgeText: {
        fontSize: 12,
    },

    footer: {
        marginTop: 10,
        fontSize: 12,
        color: "#666",
    },

    muted: {
        color: "#888",
    },

    empty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
    },

    emptyText: {
        color: "#777",
    },
});
