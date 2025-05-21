import { useState } from "react";
import { useRouter } from "expo-router";

import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function Exercise() {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const router = useRouter();

  const exercises = [
    { title: "Exercise 3", description: ["Create login screen", "Fields: Email, Password"], screen: "/login" as const },
    { title: "Exercise 4", description: ["Create a stopwatch using useState and useEffect"], screen: "/hooks" as const },
    { title: "Exercise 5", description: ["Create register screen", "Fields: Image, Name, Email, Password"], screen: "/register" as const },
    { title: "Exercise 6", description: ["Create a simple CRUD using useContext and useReducer"], screen: "/exercise6" as const},
    { title: "Exercise 7", description: ["Create a simple quiz using the API from Open Trivia Database"], screen: "/exercise7/quizScreen" as const},
    { title: "Exercise 8", description: [
      "Continuation",
      "Using React Hook Form, add appropriate validations for the registration and login page"
    ], screen: "/exercise8/index" as const},
    { title: "Exercise 9", description: [
      "Continuation",
      "Connect your React Native app to Firebase",
      "Integrate Firebase Authentication for registration and login pages",
      "Use Firebase Storage for profile image upload during registration"
    ], screen: "/exercise9/index" as const}
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
