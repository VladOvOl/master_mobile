import FormRegistration, {
    IRegistrationForm,
} from "@/components/FormRegistration";
import FormVerification from "@/components/FormVerification";
import { ThemedView } from "@/components/themed-view";
import { createRegistration, createVerificationUser } from "@/service/auth.service";
import { getUserInfo } from "@/service/user.service";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";

export default function TabTwoScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState("");
    const [formType, setFormType] = useState<"registration" | "verification">(
        "verification"
    );

    const registrationUserForm = async (
        registrationForm: IRegistrationForm
    ) => {
        try {
            setIsLoading(true);
            console.log(JSON.stringify(registrationForm));
            const response = await createRegistration(registrationForm);

            console.log("FULL RESPONSE:", response);

            Alert.alert("Ответ сервера", JSON.stringify(response.data));

            const data =
                typeof response.data === "string"
                    ? JSON.parse(response.data)
                    : response.data;

            if (data?.status === "OK") {
                if (registrationForm.email) {
                    setCode(registrationForm.email);
                }

                /*if (registrationForm.phoneNumber) {
                    console.log(
                        "destination phone:",
                        registrationForm.phoneNumber
                    );
                }*/

                console.log("code_verification:", data.code);

                setFormType("verification");
            }

            console.log("DATA:", data);
        } catch (error) {
            console.log("ERROR RAW:", error);

            const err = error as AxiosError;

            if (err.response?.data) {
                try {
                    const parsed =
                        typeof err.response.data === "string"
                            ? JSON.parse(err.response.data)
                            : err.response.data;

                    console.log("ERROR PARSED:", parsed);

                    if (parsed.errors) {
                        Alert.alert("Ошибка", JSON.stringify(parsed.errors));
                    }
                } catch {
                    Alert.alert(
                        "Ошибка",
                        "Не удалось обработать ошибку сервера."
                    );
                }
            }

            // 409 — уже существует → сразу переход в верификацию
            if (err.response?.status === 409) {
                setFormType("verification");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const verificationUser = async (code: string) => {
        setIsLoading(true);

        try {
            const destination =
                localStorage.getItem("destination")?.trim() || "";

            const body = {
                code,
                destination,
            };

            console.log("VERIFY BODY:", body);

            const response = await createVerificationUser(body);

            console.log("VERIFY RESPONSE:", response.data);

            // Логиним
            login(response.data.token);

            // Загружаем данные пользователя
            const userResponse = await getUserInfo();
            setUser(userResponse.data);

        } catch (err) {
            const error = err as AxiosError;

            console.log("VERIFY ERROR RAW:", error);

            if (error.response?.data) {
                try {
                    const parsed =
                        typeof error.response.data === "string"
                            ? JSON.parse(error.response.data)
                            : error.response.data;

                    console.log("VERIFY ERROR PARSED:", parsed);

                    if (parsed.message) {
                        Alert.alert("Ошибка", parsed.message);
                        return;
                    }

                    if (parsed.errors) {
                        const msg = parsed.errors
                            .map((e: any) => `${e.field}: ${e.message}`)
                            .join("\n");

                        Alert.alert("Ошибка", msg);
                        return;
                    }
                } catch {
                    Alert.alert(
                        "Ошибка",
                        "Не удалось прочитать ошибку сервера"
                    );
                }
            } else {
                Alert.alert("Ошибка", "Произошла неизвестная ошибка");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemedView>
            {formType === "registration" && (
                <FormRegistration
                    setFormType={setFormType}
                    registrationUserForm={registrationUserForm}
                />
            )}
            {formType === "verification" && (
                <FormVerification setFormType={setFormType} />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
});
