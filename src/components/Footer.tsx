import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types"; // Ensure correct path

const Footer = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Home Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.button}
        >
          <Image
            source={require("../../assets/images/Buttons/Home.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Search Button (Placeholder for Future Search Functionality) */}
        <TouchableOpacity
          onPress={() => console.log("Search Function Coming Soon!")}
          style={styles.button}
        >
          <Image
            source={require("../../assets/images/Buttons/Search.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.button}
        >
          <Image
            source={require("../../assets/images/Buttons/Profile.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: "#000",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#000",
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  button: {
    padding: 10,
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    tintColor: "#fff",
  },
});

export default Footer;
