import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="(information)" />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="login/index"
        options={{
          title: "Login",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="register/index"
        options={{
          title: "Register",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
