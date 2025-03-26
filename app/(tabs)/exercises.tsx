import { useState } from "react";
import { useRouter } from "expo-router";

import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function Exercise() {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const router = useRouter();

  const exercises = [
    { title: "Exercise 3", description: ["Create login screen", "Fields: Email, Password"], screen: "/login" },
    { title: "Exercise 4", description: ["Create a stopwatch using useState and useEffect"], screen: "/hooks" },
    { title: "Exercise 5", description: ["Create register screen", "Fields: Image, Name, Email, Password"], screen: "/register" },
    { title: "Exercise 6", description: ["Create a simple CRUD using useContext and useReducer"], screen: "/exercise6"},
    { title: "Exercise 7", description: ["Create a simple quiz using the API from Open Trivia Database"], screen: "/exercise7"},
  ];

  return (
    <ScrollView style={styles.container}>
      {exercises.map((exercise, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedExercise(selectedExercise === index ? null : index)}
          style={[styles.card, selectedExercise === index ? styles.cardActive : {}]}
        >
          <Text style={styles.title}>{exercise.title}</Text>
          {selectedExercise === index && (
            <View>
              {exercise.description.length > 0 ? (
                exercise.description.map((item, i) => <Text key={i} style={styles.text}>{item}</Text>)
              ) : (
                <Text style={styles.text}>No content available</Text>
              )}
              {exercise.screen && (
                <TouchableOpacity onPress={() => router.push(exercise.screen)} style={styles.button}>
                  <Text style={styles.buttonText}>Go to {exercise.title}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f7fb",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardActive: {
    backgroundColor: "#e9f7ff",
    borderColor: "#28a745", 
    shadowOpacity: 0.3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    lineHeight: 20,
  },
  button: {
    marginTop: 10, 
    backgroundColor: "#28a745", 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 6, 
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14, // Smaller font size
    fontWeight: "600",
  },
});
