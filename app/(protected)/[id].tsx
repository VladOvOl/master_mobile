import { getAidPoint } from "@/service/map.service";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const PointDetails = () => {

    const [details, setDetails] = useState()
    const { id, limit } = useLocalSearchParams();

    useEffect(() => {
        getPointDetails()
    },[])

    const getPointDetails = async() => {
        try {
            const response = await getAidPoint(id[0])
            setDetails(response.data)
        } catch (error) {
            console.log("[id].tsx",error)
        }
    }

    return (
        <View>
            <Link href={'/(protected)'}>Back</Link>
            <Text>PointDetails</Text>
            <Text>{id}</Text>
            <Text>{JSON.stringify(details)}</Text>
        </View>
    );
};

export default PointDetails;
