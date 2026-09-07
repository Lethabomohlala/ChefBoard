import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  const menuItems = [
    {
      id: "1",
      name: "Fig, burrata &\nprosciutto tartine",
      price: "R90.00",
      course: "Starter",
      description:
        "Larger, relatively easy sourdough tartine starter slices",
    },
    {
      id: "2",
      name: "Authentic\ncarbonara",
      price: "R150.00",
      course: "Main",
      description:
        "A tried-and-true carbonara recipe that produces a perfect sauce",
    },
    {
      id: "3",
      name: "Ultimate\nchocolate cake slice",
      price: "R75.00",
      course: "Dessert",
      description: "Chocolate ganache cake recipe that is moist and rich",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.mainHeading}>CHEFBOARD MENU</Text>

          <Text style={styles.welcomeText}>
            WELCOME BACK CHEF!
          </Text>

          <View style={styles.divider} />
        </View>

        {/* COURSE COUNTS */}

        <View style={styles.courseRow}>
          <View style={styles.courseCard}>
            <Text style={styles.courseNumber}>1</Text>

            <Text style={styles.courseName}>
              Starters
            </Text>
          </View>

          <View style={styles.courseCard}>
            <Text style={styles.courseNumber}>1</Text>

            <Text style={styles.courseName}>
              Main Course
            </Text>
          </View>

          <View style={styles.courseCard}>
            <Text style={styles.courseNumber}>1</Text>

            <Text style={styles.courseName}>
              Dessert
            </Text>
          </View>
        </View>

        {/* MENU TITLE */}

        <View style={styles.menuTitleRow}>
          <Text style={styles.sectionHeading}>
            ALL MENU ITEMS
          </Text>

          <Pressable style={styles.smallAddButton}
           onPress={() => router.push("/(tabs)/add")}
          >
            <Text style={styles.plus}>+</Text>
          </Pressable>
        </View>

        {/* MENU ITEMS */}

        <View style={styles.menuList}>
  {menuItems.map((item) => (
    <Pressable
      key={item.id}
      style={styles.menuCard}
      onPress={() => router.push("/dishdetails")}
    >

      {/* IMAGE */}

      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>
          IMAGE
        </Text>
      </View>

      {/* INFORMATION */}

      <View style={styles.menuInfo}>

        <View style={styles.namePriceRow}>

          <Text style={styles.itemName}>
            {item.name}
          </Text>

          <Text style={styles.itemPrice}>
            {item.price}
          </Text>

        </View>

        <Text style={styles.itemCourse}>
          {item.course}
        </Text>

        <Text style={styles.itemDescription}>
          {item.description}
        </Text>

      </View>
    </Pressable>
     ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#D7ECF1",
  },

  scrollContent: {
    paddingHorizontal: 32,
    paddingBottom: 120,
  },

  /* HEADER */

  header: {
    alignItems: "center",
    paddingTop: 18,
  },

  mainHeading: {
  fontFamily: "Boldonse",
  fontSize: 30,
  color: "#010000",
  textAlign: "center",
},

  welcomeText: {
  fontFamily: "PlusJakartaSans-Regular",
  fontSize: 18,
  color: "#000000",
  textAlign: "center",
  marginTop: 20,
},

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#000000",
    marginTop: 25,
    marginBottom: 38,
  },

  /* COURSE CARDS */

  courseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  courseCard: {
    flex: 1,
    height: 120,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  courseNumber: {
    fontFamily: "Boldonse",
    fontSize: 20,
    color: "#51AF7D",
    marginBottom: 5,
  },

  courseName: {
    fontFamily: "PlusJakartaSans-Semibold",
    fontSize: 14,
    color: "#000000",
    textAlign: "center",
  },

  /*  MENU TITLE */

  menuTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 18,
  },

  sectionHeading: {
    fontFamily: "Boldonse",
    fontSize: 26,
    color: "#000000",
  },

  smallAddButton: {
    width: 30,
    height: 30,
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  plus: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 25,
    color: "#000000",
    lineHeight: 25,
  },

  /* MENU LIST */

  menuList: {
    gap: 20,
  },

  /* MENU CARD */

  menuCard: {
    minHeight: 180,
    backgroundColor: "#51AF7D",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
  },

  /*  IMAGE  */

  imagePlaceholder: {
    width: 130,
    height: 150,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  imageText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 10,
    color: "#AAAAAA",
  },

  /* MENU INFORMATION */

  menuInfo: {
    flex: 1,
  },

  namePriceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  itemName: {
  flex: 1,
  fontFamily: "PlusJakartaSans-ExtraBold",
  fontSize: 18,
  color: "#000000",
  lineHeight: 21,
  paddingRight: 8,
},

itemPrice: {
  fontFamily: "PlusJakartaSans-ExtraBold",
  fontSize: 16,
  color: "#000000",
},

itemCourse: {
  fontFamily: "PlusJakartaSans-SemiBoldItalic",
  fontSize: 16,
  color: "#000000",
  marginTop: 9,
  marginBottom: 5,
},

itemDescription: {
  fontFamily: "PlusJakartaSans-Regular",
  fontSize: 14,
  color: "#000000",
  lineHeight: 19,
},
});