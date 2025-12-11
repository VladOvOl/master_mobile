import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";

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

type IProps = {
    setFormType:React.Dispatch<React.SetStateAction<"registration" | "verification">>,
    registrationUserForm: (registrationForm: IRegistrationForm) => Promise<void>
}

export default function FormRegistration({registrationUserForm}:IProps) {
    const [registrationForm, setRegistrationForm] = useState(initialRegistrationForm);

    const router = useRouter();

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>Registration</ThemedText>
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

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
                value={registrationForm.confirmPassword}
                onChangeText={(text) =>
                    setRegistrationForm({
                        ...registrationForm,
                        confirmPassword: text,
                    })
                }
            />

            <ThemedView style={{ gap: 10 }}>
                <Button 
                    title="Registration" 
                    onPress={() => registrationUserForm(registrationForm) } 
                />
                <Link href={"/(auth)"} asChild>
                    <Button title="Already have account" />
                </Link>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
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
