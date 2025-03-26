import { Link } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/hooks/state" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>useState</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/hooks/effects" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>useEffect</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
    width: 200,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
