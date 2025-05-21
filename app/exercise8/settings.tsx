import { Text, View, StyleSheet, TouchableOpacity, Switch, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [activityTracking, setActivityTracking] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const appVersion = "1.0.0";

  useEffect(() => {
    if (!auth.currentUser) {
      router.replace('/exercise8' as any);
    }
  }, []);

  const SettingSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <View style={[styles.section, isDarkMode && styles.sectionDark]}>
      <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>{title}</Text>
      {children}
    </View>
  );

  const SettingRow = ({ 
    icon, 
    title, 
    value, 
    onPress, 
    type = "toggle" 
  }: { 
    icon: string, 
    title: string, 
    value?: boolean, 
    onPress?: () => void,
    type?: "toggle" | "button"
  }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Ionicons 
          name={icon as any} 
          size={24} 
          color={isDarkMode ? "#4A90E2" : "#007AFF"} 
        />
        <Text style={[styles.settingText, isDarkMode && styles.textDark]}>{title}</Text>
      </View>
      {type === "toggle" ? (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: "#767577", true: isDarkMode ? "#4A90E2" : "#007AFF" }}
          thumbColor={value ? "#fff" : "#f4f3f4"}
        />
      ) : (
        <TouchableOpacity onPress={onPress}>
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color={isDarkMode ? "#666" : "#999"} 
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={isDarkMode ? "#fff" : "#000"} 
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDarkMode && styles.textDark]}>Settings</Text>
      </View>

      <SettingSection title="Appearance">
        <SettingRow
          icon="moon"
          title="Dark Mode"
          value={isDarkMode}
          onPress={() => setIsDarkMode(!isDarkMode)}
        />
      </SettingSection>

      <SettingSection title="Notifications">
        <SettingRow
          icon="notifications"
          title="Push Notifications"
          value={pushNotifications}
          onPress={() => setPushNotifications(!pushNotifications)}
        />
        <SettingRow
          icon="mail"
          title="Email Notifications"
          value={emailNotifications}
          onPress={() => setEmailNotifications(!emailNotifications)}
        />
      </SettingSection>

      <SettingSection title="Privacy">
        <SettingRow
          icon="footsteps"
          title="Activity Tracking"
          value={activityTracking}
          onPress={() => setActivityTracking(!activityTracking)}
        />
        <SettingRow
          icon="share"
          title="Data Sharing"
          value={dataSharing}
          onPress={() => setDataSharing(!dataSharing)}
        />
      </SettingSection>

      <SettingSection title="Account">
        <SettingRow
          icon="person"
          title="Edit Profile"
          type="button"
          onPress={() => router.push('/exercise8/profile' as any)}
        />
        <SettingRow
          icon="key"
          title="Change Password"
          type="button"
          onPress={() => router.push('/exercise8/change-password' as any)}
        />
      </SettingSection>

      <SettingSection title="About">
        <View style={styles.aboutRow}>
          <Text style={[styles.aboutLabel, isDarkMode && styles.textDark]}>Version</Text>
          <Text style={[styles.aboutValue, isDarkMode && styles.textDark]}>{appVersion}</Text>
        </View>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={async () => {
            try {
              await auth.signOut();
              router.replace('/exercise8' as any);
            } catch (error) {
              alert('Failed to sign out');
            }
          }}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </SettingSection>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
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
  sectionDark: {
    backgroundColor: '#1E1E1E',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  aboutLabel: {
    fontSize: 16,
    color: '#333',
  },
  aboutValue: {
    fontSize: 16,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff0f0',
    borderRadius: 10,
  },
  logoutText: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  textDark: {
    color: '#fff',
  },
}); 