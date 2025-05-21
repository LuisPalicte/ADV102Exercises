import { Stack } from "expo-router";

export default function Exercise8Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Login',
          headerShown: false        
        }}
      />
      <Stack.Screen 
        name="register" 
        options={{
          title: 'Register',
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="dashboard" 
        options={{
          title: 'Dashboard',
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="settings" 
        options={{
          title: 'Settings',
          headerShown: false
        }}
      />
    </Stack>
  );
} 