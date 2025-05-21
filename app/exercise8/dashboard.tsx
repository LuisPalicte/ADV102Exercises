import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Animated } from "react-native";
import { useEffect, useState, useRef } from "react";
import { auth } from "@/config/firebase";
import { router } from "expo-router";
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from 'react-native-progress';

export default function Dashboard() {
  const [user, setUser] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lastLogin, setLastLogin] = useState<Date | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  // Mock data for demonstration
  const activityLog = [
    { action: "Profile updated", date: new Date(Date.now() - 3600000) },
    { action: "Settings changed", date: new Date(Date.now() - 7200000) },
    { action: "Logged in", date: new Date(Date.now() - 86400000) },
  ];

  const stats = {
    daysActive: 15,
    completedTasks: 23,
    progress: 0.75,
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setNewName(user.displayName || "");
        setLastLogin(new Date(Date.now()));
      } else {
        router.replace('/exercise8' as any);
      }
    });
  }, []);

  function updateUserProfile() {
    if (!newName.trim()) {
      alert("Please enter a name");
      return;
    }

    updateProfile(auth.currentUser as any, {
      displayName: newName,
      photoURL: ""
    }).then(() => {
      setUser({
        ...user,
        displayName: newName,
      });
      setIsEditing(false);
    }).catch((error) => {
      alert("Failed to update profile");
    });
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
      router.replace('/exercise8' as any);
    } catch (error) {
      alert("Failed to sign out");
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.welcomeText, isDarkMode && styles.textDark]}>Welcome back!</Text>
          {lastLogin && (
            <Text style={[styles.lastLoginText, isDarkMode && styles.textDark]}>
              Last login: {formatDate(lastLogin)}
            </Text>
          )}
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.themeButton}
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            <Ionicons 
              name={isDarkMode ? "sunny" : "moon"} 
              size={24} 
              color={isDarkMode ? "#FFD700" : "#666"} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={24} color="#FF4444" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View 
        style={[
          styles.profileCard,
          isDarkMode && styles.cardDark,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}
      >
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: isDarkMode ? '#4A90E2' : '#007AFF' }]}>
            <Text style={styles.avatarText}>
              {user?.displayName ? user.displayName[0].toUpperCase() : user?.email?.[0].toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.userInfo}>
          <Text style={[styles.label, isDarkMode && styles.textDark]}>Email</Text>
          <Text style={[styles.emailText, isDarkMode && styles.textDark]}>{user?.email}</Text>

          <Text style={[styles.label, isDarkMode && styles.textDark]}>Name</Text>
          {isEditing ? (
            <View style={styles.editNameContainer}>
              <TextInput
                style={[styles.nameInput, isDarkMode && styles.inputDark]}
                value={newName}
                onChangeText={setNewName}
                placeholder="Enter your name"
                placeholderTextColor={isDarkMode ? "#888" : "#999"}
              />
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={updateUserProfile}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => {
                  setIsEditing(false);
                  setNewName(user?.displayName || "");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.nameContainer}>
              <Text style={[styles.nameText, isDarkMode && styles.textDark]}>
                {user?.displayName || "Set your name"}
              </Text>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Ionicons name="pencil" size={20} color={isDarkMode ? "#4A90E2" : "#007AFF"} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.statsContainer}>
          <Text style={[styles.statsTitle, isDarkMode && styles.textDark]}>Your Activity</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statItem, isDarkMode && styles.statItemDark]}>
              <Ionicons name="calendar" size={24} color={isDarkMode ? "#4A90E2" : "#007AFF"} />
              <Text style={[styles.statValue, isDarkMode && styles.textDark]}>{stats.daysActive}</Text>
              <Text style={[styles.statLabel, isDarkMode && styles.textDark]}>Days Active</Text>
            </View>
            <View style={[styles.statItem, isDarkMode && styles.statItemDark]}>
              <Ionicons name="checkmark-circle" size={24} color={isDarkMode ? "#4A90E2" : "#007AFF"} />
              <Text style={[styles.statValue, isDarkMode && styles.textDark]}>{stats.completedTasks}</Text>
              <Text style={[styles.statLabel, isDarkMode && styles.textDark]}>Tasks Done</Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <Text style={[styles.progressText, isDarkMode && styles.textDark]}>Overall Progress</Text>
            <Progress.Bar 
              progress={stats.progress} 
              width={null} 
              color={isDarkMode ? "#4A90E2" : "#007AFF"}
              unfilledColor={isDarkMode ? "#333" : "#f0f0f0"}
              borderWidth={0}
              height={8}
            />
          </View>
        </View>

        <View style={styles.activityContainer}>
          <Text style={[styles.activityTitle, isDarkMode && styles.textDark]}>Recent Activity</Text>
          {activityLog.map((activity, index) => (
            <View key={index} style={[styles.activityItem, isDarkMode && styles.activityItemDark]}>
              <Ionicons 
                name="time-outline" 
                size={20} 
                color={isDarkMode ? "#4A90E2" : "#007AFF"} 
              />
              <Text style={[styles.activityText, isDarkMode && styles.textDark]}>
                {activity.action}
              </Text>
              <Text style={[styles.activityDate, isDarkMode && styles.textDark]}>
                {formatDate(activity.date)}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.settingsButton, isDarkMode && styles.settingsButtonDark]}
          onPress={() => router.push('/exercise8/settings')}
        >
          <Ionicons 
            name="settings-outline" 
            size={24} 
            color={isDarkMode ? "#4A90E2" : "#666"} 
          />
          <Text style={[styles.settingsText, isDarkMode && styles.textDark]}>Settings</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  lastLoginText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  themeButton: {
    padding: 10,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  signOutText: {
    color: '#FF4444',
    marginLeft: 5,
    fontWeight: '500',
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardDark: {
    backgroundColor: '#1E1E1E',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  userInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    padding: 5,
  },
  editNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nameInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
    backgroundColor: 'white',
  },
  inputDark: {
    backgroundColor: '#333',
    borderColor: '#444',
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  statsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statItemDark: {
    backgroundColor: '#2A2A2A',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  progressContainer: {
    marginTop: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  activityContainer: {
    marginBottom: 20,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  activityItemDark: {
    backgroundColor: '#2A2A2A',
  },
  activityText: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
    fontSize: 14,
  },
  activityDate: {
    color: '#666',
    fontSize: 12,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  settingsButtonDark: {
    backgroundColor: '#2A2A2A',
  },
  settingsText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  textDark: {
    color: '#fff',
  },
}); 