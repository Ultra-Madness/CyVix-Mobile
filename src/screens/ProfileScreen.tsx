import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer"; // Import Footer

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header />

      {/* Profile Content */}
      <View style={styles.container}>
        {/* Greeting Message (Below Header) */}
        <Text style={styles.profileGreeting}>Welcome to your profile</Text>

        {/* Profile Image */}
        <Image
          source={require("../../assets/images/Profile/default-profile.png")}
          style={styles.profileImage}
        />

        {/* User Details */}
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>johndoe@example.com</Text>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Footer at the Bottom */}
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    justifyContent: "center", // Centers profile content
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileGreeting: {
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
    marginTop: 0, // Moves greeting right below the header
    marginBottom: 0, // Adds space before profile image
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#fff",
    marginBottom: 55,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
