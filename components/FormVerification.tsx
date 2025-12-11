import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/provider/AuthProvider";
import { loginUser } from "@/service/auth.service";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";

export default function FormVerification() {
    const [verificationCode, setVerificationCode] = useState("");

    const router = useRouter();
    const {login} = useAuth()

    const onLogin = async() => {

        let response
        try {
            response = await loginUser({username,password})
            login(response.data.token)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>Login</ThemedText>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#000000ff"
                value={verificationCode}
                onChangeText={setVerificationCode}
            />
            
            <ThemedView style={{ gap: 10 }}>
                <Button title="Login" onPress={onLogin} />
                <Link href={"/(auth)/registration"} asChild>
                    <Button title="Go to registration" />
                </Link>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
        color: "blue",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 4,
        color: "black",
    },
});
