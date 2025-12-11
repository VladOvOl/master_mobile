import React, { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export type IRegistrationForm = {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
};

const initialRegistrationForm = {
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
};

function UserSettings() {
    const [registrationForm, setRegistrationForm] = useState(
        initialRegistrationForm
    );

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>UserSettings</ThemedText>
            <ThemedView style={styles.containerFormInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#000000ff"
                    value={registrationForm.username}
                    onChangeText={(text) =>
                        setRegistrationForm({
                            ...registrationForm,
                            username: text,
                        })
                    }
                />
                <Button title="Change" />
            </ThemedView>

            <ThemedView style={styles.containerFormInput}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#aaa"
                    value={registrationForm.firstName}
                    onChangeText={(text) =>
                        setRegistrationForm({
                            ...registrationForm,
                            firstName: text,
                        })
                    }
                />
                <Button title="Change" onPress={() => console.log("sfesf")} />
            </ThemedView>

            <ThemedView style={styles.containerFormInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#aaa"
                    value={registrationForm.lastName}
                    onChangeText={(text) =>
                        setRegistrationForm({
                            ...registrationForm,
                            lastName: text,
                        })
                    }
                />
                <Button title="Change" onPress={() => console.log("sfesf")} />
            </ThemedView>

            <ThemedView style={styles.containerFormInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    value={registrationForm.email}
                    onChangeText={(text) =>
                        setRegistrationForm({
                            ...registrationForm,
                            email: text,
                        })
                    }
                />
                <Button title="Change" onPress={() => console.log("sfesf")} />
            </ThemedView>

            <ThemedView style={styles.containerFormInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    value={registrationForm.password}
                    onChangeText={(text) =>
                        setRegistrationForm({
                            ...registrationForm,
                            password: text,
                        })
                    }
                />
                <Button title="Change" onPress={() => console.log("sfesf")} />
            </ThemedView>

            <ThemedView style={styles.containerFormInput}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#aaa"
                    value={registrationForm.firstName}
                    onChangeText={(text) =>
                        setRegistrationForm({
                            ...registrationForm,
                            firstName: text,
                        })
                    }
                />
                <Button title="Change" onPress={() => console.log("sfesf")} />
            </ThemedView>

        </ThemedView>
    );
}

export default UserSettings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        padding: 10,
        gap: 10,
    },
    containerFormInput: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "orange",
        gap: 10,
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
        flex: 1,
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 8,
        borderRadius: 4,
        color: "black",
        boxSizing: "border-box",
    },
});
