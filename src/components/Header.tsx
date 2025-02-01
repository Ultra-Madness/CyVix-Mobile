import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";

const Header = React.memo(({ profileImage }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const canGoBack = navigation.canGoBack();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => canGoBack && navigation.goBack()}
          style={styles.button}
          disabled={!canGoBack}
        >
          <Image
            source={require("../../assets/images/Buttons/Lt_Nav_Arrow2.png")}
            style={[styles.icon, !canGoBack && styles.disabledIcon]}
          />
        </TouchableOpacity>

        {/* Logo */}
        <Image
          source={require("../../assets/images/Logos/cyvixlogo.png")}
          style={styles.logo}
        />

        {/* Profile Button (Uses Dynamic Profile Image) */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.profileContainer}
        >
          <Image source={profileImage} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#000",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "#000",
    height: 80,
  },
  button: {
    padding: 10,
  },
  icon: {
    width: 40,
    height: 35,
    resizeMode: "contain",
    tintColor: "#fff",
  },
  disabledIcon: {
    opacity: 0.5,
  },
  logo: {
    width: 250,
    height: 90,
    resizeMode: "contain",
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
  },
  profileIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default Header;
