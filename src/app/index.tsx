import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>Welcome to ChefBoard!</Text>

      <View style={styles.button}>
        <Link href="/(tabs)/home" style={styles.link}>
          Enter the Kitchen
        </Link>
      </View>
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

  text: {
    fontFamily: "Boldonse",
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#51AF7D",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  link: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
