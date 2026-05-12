import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcomer to TidyTex.</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionBox} activeOpacity={0.7}>
            <Text style={styles.optionText}>Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBox} activeOpacity={0.7}>
            <Text style={styles.optionText}>Provider</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 72,
  },
  title: {
    color: "#000",
    fontSize: 24,
    fontWeight: "300",
    letterSpacing: 0.2,
  },
  optionsContainer: {
    width: "100%",
    gap: 16,
    marginTop: 40,
  },
  optionBox: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: 72,
    backgroundColor: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#000",
    borderRadius: 16,
  },
  optionText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "300",
    letterSpacing: 0.2,
  },
});

export default HomeScreen;
