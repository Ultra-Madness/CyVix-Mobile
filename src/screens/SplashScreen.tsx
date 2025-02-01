import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av"; // ✅ Correct import for ResizeMode
import HomeScreen from "../screens/HomeScreen";

const SplashScreen = () => {
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHome(true), 5000); // Auto-transition after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (showHome) {
    return <HomeScreen />;
  }

  return (
    <TouchableOpacity
      style={styles.splashContainer}
      onPress={() => setShowHome(true)}
    >
      <Video
        source={require("../../assets/videos/SplashVid_1.2.2.mp4")}
        style={styles.video}
        resizeMode={ResizeMode.COVER} // Use the correct enum value
        shouldPlay
        isLooping
        isMuted
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});

export default SplashScreen;
