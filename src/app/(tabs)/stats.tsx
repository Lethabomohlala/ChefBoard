import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useMenu } from "../../MenuContext";

export default function Stats() {
  const router = useRouter();
  const { menuItems } = useMenu();

  // 1. Total number of dishes
  const totalDishes = menuItems.length;

  // 2. Course counts with explicit typing
  const starterCount = menuItems.filter(
    (item: { course: string }) => item.course.toLowerCase() === "starter",
  ).length;

  const mainCourseCount = menuItems.filter(
    (item: { course: string }) => item.course.toLowerCase() === "main course",
  ).length;

  const dessertCount = menuItems.filter(
    (item: { course: string }) => item.course.toLowerCase() === "dessert",
  ).length;

  // 3. Average price calculation with explicit typing
  const totalSum = menuItems.reduce(
    (sum: number, item: { price: number | string }) =>
      sum + Number(item.price || 0),
    0,
  );
  const averagePrice =
    totalDishes > 0 ? (totalSum / totalDishes).toFixed(2) : "0.00";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TOP HEADER WITH BACK BUTTON */}
        <View style={styles.headerRow}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.replace("/(tabs)/home")}
          >
            <Svg width={45} height={45} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 8L8 12M8 12L12 16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="#000000"
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Pressable>
          <Text style={styles.mainTitle}>STATISTICS</Text>
        </View>

        <Text style={styles.subtitle}>
          View insights and analytics about your menu items.
        </Text>

        {/* SECTION 1: TOTAL NUMBER OF DISHES (NO CARD WRAPPER, ENLARGED BASKET) */}
        <Text style={styles.sectionHeading}>Total Number Of Dishes</Text>
        <View style={styles.totalContainer}>
          <Image
            source={require("../../../assets/images/basket.png")}
            style={styles.basketImage}
            resizeMode="contain"
          />
          <Text style={styles.totalCountNumber}>{totalDishes}</Text>
          <Text style={styles.totalCountLabel}>Dishes</Text>
        </View>

        {/* SECTION 2: DISHES BY COURSE */}
        <Text style={styles.sectionHeading}>Dishes By Course</Text>
        <View style={styles.coursesRow}>
          {/* STARTERS */}
          <View style={styles.courseCard}>
            <Text style={styles.courseCardNumber}>{starterCount}</Text>
            <Text style={styles.courseCardLabel}>Starters</Text>
          </View>

          {/* MAIN COURSE */}
          <View style={styles.courseCard}>
            <Text style={styles.courseCardNumber}>{mainCourseCount}</Text>
            <Text style={styles.courseCardLabel}>Main Course</Text>
          </View>

          {/* DESSERT */}
          <View style={styles.courseCard}>
            <Text style={styles.courseCardNumber}>{dessertCount}</Text>
            <Text style={styles.courseCardLabel}>Dessert</Text>
          </View>
        </View>

        {/* SECTION 3: AVERAGE PRICE */}
        <Text style={styles.sectionHeading}>
          Average Price Of All Menu Items
        </Text>
        <View style={styles.averagePriceCard}>
          <Text style={styles.averagePriceText}>R {averagePrice}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#D7ECF1",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    flex: 1,
    fontFamily: "Boldonse",
    fontSize: 40,
    color: "#000000",
    marginTop: 20,
    textAlign: "right",
  },
  subtitle: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  sectionHeading: {
    fontFamily: "Boldonse",
    fontSize: 21,
    color: "#000000",
    marginBottom: 10,
    marginTop: 10,
  },
  totalContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  basketImage: {
    width: 200,
    height: 250,
    marginBottom: 8,
  },
  totalCountNumber: {
    fontFamily: "Boldonse",
    fontSize: 30,
    color: "#E14E3E",
    lineHeight: 50,
  },
  totalCountLabel: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 20,
    color: "#000000",
  },
  coursesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  courseCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 150,
  },
  courseCardNumber: {
    fontFamily: "Boldonse",
    fontSize: 20,
    color: "#469A6E",
    marginBottom: 2,
    lineHeight: 50,
  },
  courseCardLabel: {
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
  },
  averagePriceCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 30,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
  },
  averagePriceText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 20,
    color: "#E14E3E",
  },
});
