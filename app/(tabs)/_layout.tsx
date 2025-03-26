import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 60,
          borderTopWidth: 1,
          borderTopColor: "#ddd",
        },
        tabBarShowLabel: true,
        tabBarInactiveTintColor: "#666", 
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#28a745", 
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#28a745", 
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-in" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#007bff", 
        }}
      />
    </Tabs>
  );
}
