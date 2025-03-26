import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default function State() {
  const [count, setCount] = useState(0);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <TouchableOpacity onPress={() => setCount(count + 1)} style={styles.button}>
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa", 
  },
  count: {
    fontSize: 100, 
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30, 
  },
  button: {
    backgroundColor: "#28a745", 
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    elevation: 5, 
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600", 
  },
});
