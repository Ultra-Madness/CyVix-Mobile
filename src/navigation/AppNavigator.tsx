import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack"; // Import transition presets
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import AgencySelectionScreen from "../screens/AgencySelectionScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen"; // Ensure Profile exists

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // We are handling headers inside screens
        ...TransitionPresets.DefaultTransition,
        cardStyle: { backgroundColor: "#000" }, // Prevents white flashes
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AgencySelection" component={AgencySelectionScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
