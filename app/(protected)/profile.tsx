import { ThemedView } from "@/components/themed-view";
import UserSettings from "@/components/UserSettings";
import { useAuth } from "@/provider/AuthProvider";
import { Button, StyleSheet } from "react-native";

export default function HomeScreen() {
    const { logout } = useAuth();
    

    return (
        <ThemedView style={styles.container}>
            <UserSettings />
            <Button onPress={() => logout()} title="LogOut" />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        height:'100%'
    },
   
});
