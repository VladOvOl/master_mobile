import Map from "@/components/Map";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useNetwork } from "@/provider/NetworkProvider";
import { getAllAidPoints } from "@/service/map.service";
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
}

export type ILocation = {
    latitude: number;
    longitude: number;
};

export default function HomeScreen() {

    const [aidPoints, setAidPoints] = useState<IPoint[]>([])

    const {online} = useNetwork()

    useEffect(() => {
        getAllPoint()
    },[])

    const getAllPoint = async() => {
        try {
            const response = await getAllAidPoints()
            setAidPoints(response.data)
        } catch (error) {
            console.log("Error",error)
        }
    }

    return (
        <ThemedView>
            {online === true && 
                <ThemedView style={{height:'100%'}}>
                    <Map aidPoints = {aidPoints}/>
                    <Link href={'/(protected)/create_point'} asChild>
                        <Link href={'/(protected)/create_point'} asChild>
                            <Button title="Create new point"/>
                        </Link>
                    </Link>
                </ThemedView>
            }
            {online === false && <ThemedText>NO</ThemedText>}       
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
