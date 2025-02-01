import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to CyVix</Text>
        <Text style={styles.subtitle}>
          Your AI-powered guide to navigating government websites.
        </Text>

        {/* Button to Navigate to Agency Selection */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AgencySelection")}
        >
          <Text style={styles.buttonText}>Explore Government Agencies</Text>
        </TouchableOpacity>
      </View>
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
    color: "#ccc",
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
