import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      
      {/* LOGO */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* WELCOME TEXT */}
      <Text style={styles.text}>
        Welcome to ChefBoard!
      </Text>

      {/* ENTER THE KITCHEN BUTTON */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => router.push("/(tabs)/home")}
      >
        <Text style={styles.buttonText}>
          Enter The Kitchen
        </Text>
      </Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#51AF7D",
  },

  /* LOGO */
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },

  /* WELCOME TEXT */
  text: {
    fontFamily: "Boldonse",
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },

  /* ENTER THE KITCHEN BUTTON */
  button: {
    width: 220,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E14E3E",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonText: {
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 14,
    color: "#E14E3E",
  },
});
