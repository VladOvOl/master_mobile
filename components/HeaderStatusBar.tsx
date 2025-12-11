import { useNetwork } from "@/provider/NetworkProvider";
import React from "react";
import { Text } from "react-native";

export default function HeaderNetworkStatus() {

    const {online} = useNetwork()

    if (online === null)
        return <Text style={{ color: "black" }}>⏳ Checking</Text>;
    if (online === false)
        return <Text style={{ color: "red" }}>🔴 Offline</Text>;

    return <Text style={{ color: "lime" }}>🟢 Online</Text>;
}
