import FormLogin from "@/components/FormLogin";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

export default function HomeScreen() {

    

    return (
        <ThemedView style={styles.main_container}>
            <FormLogin />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: "red",
    },
    container_form: {
        backgroundColor: "blue",
    },
});
