import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const buttonImages = {
  back: require("../../assets/images/Buttons/Lt_Nav_Arrow.png"),
  home: require("../../assets/images/Buttons/Home Button.png"),
  notifications: require("../../assets/images/Buttons/Notification_Bell_00000.png"),
  forward: require("../../assets/images/Buttons/RT_Nav_Arrow.png"),
};

interface ButtonProps {
  type: "back" | "home" | "notifications" | "forward";
  onPress: () => void;
  size?: number;
}

const CustomButton: React.FC<ButtonProps> = ({ type, onPress, size = 40 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { width: size, height: size }]}
    >
      <Image
        source={buttonImages[type]}
        style={[styles.image, { width: size, height: size }]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
  },
});

export default CustomButton;
