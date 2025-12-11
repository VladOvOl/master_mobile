import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";

import HeaderNetworkStatus from "@/components/HeaderStatusBar";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { AuthProvider, useAuth } from "@/provider/AuthProvider";
import { NetworkProvider } from "@/provider/NetworkProvider";
import { ActivityIndicator } from "react-native";

export const unstable_settings = {
    anchor: "(tabs)",
};

function AppContent() {
    const { isAuth } = useAuth();

    if (isAuth === null) {
    // идёт проверка авторизации — показываем лоадер
    return (
        <ThemedView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ActivityIndicator size="large" color="blue" />
        </ThemedView>
    );
}

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={!isAuth}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack.Protected>

            <Stack.Protected guard={isAuth}>
                <Stack.Screen
                    name="(protected)"
                    options={{
                        headerShown: true,
                        headerTitleAlign: "left",
                        title: "",
                        headerTitle: () => <HeaderNetworkStatus />,
                    }}
                />
            </Stack.Protected>
        </Stack>
    );
}

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <AuthProvider>
            <ThemeProvider
                value={colorScheme === "dark" 
                    ? DarkTheme 
                    : DefaultTheme
                }
            >
                <NetworkProvider>
                    <AppContent />
                </NetworkProvider> 
            </ThemeProvider>
        </AuthProvider>
    );
}
