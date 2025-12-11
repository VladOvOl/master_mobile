import FormCreatePoint from "@/components/FormCreatePoint";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

export default function CreateNewPoint() {

    return (
        <ThemedView style={styles.container}>
            <FormCreatePoint/>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        height:'100%'
    },
   
});
