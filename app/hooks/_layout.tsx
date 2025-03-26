import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="state" options={{ headerShown: false }} />
      <Stack.Screen name="effect" options={{ headerShown: false }} />
    </Stack>
  );
}
