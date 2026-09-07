import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useMenu } from "../../MenuContext";

export default function Home() {
  const router = useRouter();

  const {
    menuItems,
    clearMenu,
  } = useMenu();

  // COURSE COUNTS

  const starters = menuItems.filter(
    (item) => item.course === "Starter"
  ).length;

  const mains = menuItems.filter(
    (item) => item.course === "Main Course"
  ).length;

  const desserts = menuItems.filter(
    (item) => item.course === "Dessert"
  ).length;

  // CLEAR MENU

  const handleClearMenu = () => {
    Alert.alert(
      "Clear Menu",
      "Are you sure you want to remove all menu items?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            clearMenu();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.mainHeading}>
            CHEFBOARD MENU
          </Text>

          <Text style={styles.welcomeText}>
            WELCOME BACK CHEF!
          </Text>

          <View style={styles.divider} />
        </View>

        {/* COURSE COUNTS */}

        <View style={styles.courseRow}>
          {/* STARTERS */}

          <View style={styles.courseCard}>
            <Text style={styles.courseNumber}>
              {starters}
            </Text>

            <Text style={styles.courseName}>
              Starters
            </Text>
          </View>

          {/* MAIN COURSE */}

          <View style={styles.courseCard}>
            <Text style={styles.courseNumber}>
              {mains}
            </Text>

            <Text style={styles.courseName}>
              Main Course
            </Text>
          </View>

          {/* DESSERT */}

          <View style={styles.courseCard}>
            <Text style={styles.courseNumber}>
              {desserts}
            </Text>

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

          <Pressable
            style={styles.smallAddButton}
            onPress={() =>
              router.push("/(tabs)/add")
            }
          >
            <Text style={styles.plus}>
              +
            </Text>
          </Pressable>
        </View>

        {/* MENU ITEMS */}

        {menuItems.length === 0 ? (
          /* EMPTY MENU */

          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              NO MENU ITEMS YET
            </Text>

            <Text style={styles.emptyText}>
              Add your first dish to build your
              menu.
            </Text>
          </View>
        ) : (
          /* MENU LIST */

          <View style={styles.menuList}>
            {menuItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={() =>
                  router.push({
                    pathname: "/dishdetails",
                    params: { id: item.id },
                  })
                }
                style={({ pressed }) => [
                  styles.menuCard,
                  pressed && styles.menuCardPressed,
                ]}
              >
                {/* IMAGE */}

                <View
                  style={styles.imagePlaceholder}
                >
                  <Text style={styles.imageText}>
                    IMAGE
                  </Text>
                </View>

                {/* INFORMATION */}

                <View style={styles.menuInfo}>
                  <View
                    style={styles.namePriceRow}
                  >
                    {/* DISH NAME */}

                    <Text style={styles.itemName}>
                      {item.dishName}
                    </Text>

                    {/* PRICE */}

                    <Text style={styles.itemPrice}>
                      R{item.price}
                    </Text>
                  </View>

                  {/* COURSE */}

                  <Text style={styles.itemCourse}>
                    {item.course}
                  </Text>

                  {/* DESCRIPTION */}

                  <Text
                    style={styles.itemDescription}
                  >
                    {item.description}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}
        
        {/* CLEAR MENU */}

        {menuItems.length > 0 && (
          <Pressable
            style={styles.clearButton}
            onPress={handleClearMenu}
          >
            <Text style={styles.clearButtonText}>
              CLEAR MENU
            </Text>
          </Pressable>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  /* PAGE */

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

  /* CLEAR MENU */

  clearButton: {
    backgroundColor: "#654D45",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 25,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 5,
  },

  clearButtonText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  /* MENU TITLE */

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

  /* EMPTY MENU */

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#000000",
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 25,
    alignItems: "center",
  },

  emptyTitle: {
    fontFamily: "Boldonse",
    fontSize: 18,
    color: "#000000",
    marginBottom: 10,
  },

  emptyText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 14,
    color: "#000000",
    textAlign: "center",
    lineHeight: 20,
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
  menuCardPressed:  {
    backgroundColor: "#F6E8A6",
  },

  /* IMAGE */

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