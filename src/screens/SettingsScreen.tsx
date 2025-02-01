import React from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Header from "../components/Header"; // Ensure Header does not return raw text
import Footer from "../components/Footer"; // Import the reusable footer component

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Ensures status bar icons (clock, battery, etc.) are visible */}
      <StatusBar barStyle="light-content" backgroundColor="black" />

      {/* Static Header (Fixed Position) */}
      <Header />

      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Adjust your preferences here.</Text>
        </View>
      </View>

      {/* Footer */}
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#000", // Matches dark theme for uniformity
  },
  container: {
    flex: 1,
    justifyContent: "space-between", // Ensures footer stays at the bottom
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#bbb",
    marginTop: 10,
    textAlign: "center",
  },
});

export default SettingsScreen;
