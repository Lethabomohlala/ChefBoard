import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Stats() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Menu Statistics</Text>

      <Text style={styles.text}>
        View insights and analytics about your menu items.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCEFF4",
    padding: 24,
  },

  title: {
    fontFamily: "Boldonse",
    fontSize: 30,
    color: "#000000",
    textAlign: "center",
  },

  text: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 18,
    color: "#000000",
    marginTop: 10,
    textAlign: "center",
  },
});
