import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import { useMenu } from "../MenuContext";

export default function DishDetails() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const { menuItems } = useMenu();

  const dish = menuItems.find((item) => item.id === id);

  /*
   * GO HOME
   *
   * We explicitly target the home route inside the tabs group.
   */
  const goHome = () => {
    router.push("/(tabs)/home");
  };

  /*
   * DELETE
   *
   * Delete functionality is intentionally not implemented yet.
   */
  const deleteDish = () => {
    Alert.alert(
      "Delete Dish",
      "The delete functionality will be added later."
    );
  };

  /*
   * EDIT
   *
   * Edit functionality is intentionally not implemented yet.
   */
  const editDish = () => {
    Alert.alert(
      "Edit Dish",
      "The edit functionality will be added later."
    );
  };

  /*
   * IF THE DISH DOES NOT EXIST
   */
  if (!dish) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundTitle}>
            DISH NOT FOUND
          </Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={goHome}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              GO BACK
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* =========================
            HEADER
        ========================== */}

        <View style={styles.header}>

          {/* BACK BUTTON */}
          <TouchableOpacity
            style={styles.backIcon}
            onPress={goHome}
            activeOpacity={0.7}
            hitSlop={15}
          >
            <Svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
            >
              {/* horizontal line */}
              <Path
                d="M30 19H8"
                stroke="#000000"
                strokeWidth={2.5}
                strokeLinecap="round"
              />

              {/* arrow */}
              <Path
                d="M17 10L8 19L17 28"
                stroke="#000000"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* PAGE TITLE */}
          <Text style={styles.title}>
            DISH DETAILS
          </Text>

        </View>


        {/* =========================
            PHOTO
        ========================== */}

        <View style={styles.photoBox}>
          <View style={styles.photoIcon}>
            <Svg
              width={32}
              height={32}
              viewBox="0 0 24 24"
              fill="none"
            >
              <Rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="3"
                stroke="#70737B"
                strokeWidth={1.7}
              />

              <Circle
                cx="8.5"
                cy="8.5"
                r="1.5"
                stroke="#70737B"
                strokeWidth={1.5}
              />

              <Path
                d="M3.5 17L8 12.5L11 15.5L14 12.5L20.5 19"
                stroke="#70737B"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </View>


        {/* =========================
            DISH NAME + PRICE
        ========================== */}

        <View style={styles.namePriceRow}>

          <Text style={styles.dishName}>
            {dish.dishName}
          </Text>

          <Text style={styles.price}>
            R{dish.price}
          </Text>

        </View>


        {/* =========================
            COURSE
        ========================== */}

        <View style={styles.courseBadge}>
          <Text style={styles.courseText}>
            {dish.course === "Main Course"
              ? "MAIN"
              : dish.course.toUpperCase()}
          </Text>
        </View>


        {/* =========================
            DESCRIPTION
        ========================== */}

        <Text style={styles.descriptionTitle}>
          Description
        </Text>

        <Text style={styles.description}>
          {dish.description}
        </Text>


        {/* =========================
            INFORMATION
        ========================== */}

        <View style={styles.infoContainer}>

          {/* DATE ADDED */}
          <View style={styles.infoRow}>

            <View style={styles.infoIcon}>
              <Svg
                width={27}
                height={27}
                viewBox="0 0 28 28"
                fill="none"
              >
                <Path
                  d="M21.9208 13.265C21.9731 12.8507 22 12.4285 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C12.4354 22 12.8643 21.9722 13.285 21.9182M12 6V12L15.7384 13.8692M19 22V16M16 19H22"
                  stroke="#000000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>

            <Text style={styles.infoText}>
              Added: {dish.dateAdded}
            </Text>

          </View>


          {/* POPULAR DISH */}
          <View style={styles.infoRow}>

            <View style={styles.infoIcon}>
              <Svg
                width={27}
                height={27}
                viewBox="0 0 28 28"
                fill="none"
              >
                <Path
                  d="M20.9996 11.5C20.9996 16.1944 17.194 20 12.4996 20C11.4228 20 10.3928 19.7998 9.44478 19.4345C9.27145 19.3678 9.18478 19.3344 9.11586 19.3185C9.04807 19.3029 8.999 19.2963 8.92949 19.2937C8.85881 19.291 8.78127 19.299 8.62619 19.315L3.50517 19.8444C3.01692 19.8948 2.7728 19.9201 2.6288 19.8322C2.50337 19.7557 2.41794 19.6279 2.3952 19.4828C2.36909 19.3161 2.48575 19.1002 2.71906 18.6684L4.35472 15.6408C4.48942 15.3915 4.55677 15.2668 4.58728 15.1469C4.6174 15.0286 4.62469 14.9432 4.61505 14.8214C4.60529 14.6981 4.55119 14.5376 4.443 14.2166C4.15547 13.3636 3.99962 12.45 3.99962 11.5C3.99962 6.80558 7.8052 3 12.4996 3C17.194 3 20.9996 6.80558 20.9996 11.5Z"
                  stroke="#000000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.4965 8.94925C11.5968 7.9104 10.0965 7.63095 8.96924 8.58223C7.84196 9.5335 7.68326 11.124 8.56851 12.2491C9.11696 12.9461 10.4935 14.2191 11.4616 15.087C11.8172 15.4057 11.995 15.5651 12.2084 15.6293C12.3914 15.6844 12.6017 15.6844 12.7847 15.6293C12.9981 15.565 13.1759 15.4057 13.5315 15.087C14.4996 14.2191 15.8761 12.9461 16.4246 12.2491C17.3098 11.124 17.1705 9.5235 16.0238 8.58223C14.8772 7.64096 13.3963 7.9104 12.4965 8.94925Z"
                  stroke="#000000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>

            <Text style={styles.infoText}>
              Popular dish
            </Text>

          </View>


          {/* CREATED BY */}
          <View style={styles.infoRow}>

            <View style={styles.infoIcon}>
              <Svg
                width={27}
                height={27}
                viewBox="0 0 28 28"
                fill="none"
              >
                <Path
                  d="M8 7H16M12 7V17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 3.07354 3.32698 4.63803C3 5.27976 3 6.11984 3.32698 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
                  stroke="#000000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>

            <Text style={styles.infoText}>
              Created By: Chef Christoffel
            </Text>

          </View>

        </View>


        {/* =========================
            EDIT BUTTON
        ========================== */}

        <TouchableOpacity
          style={styles.editButton}
          onPress={editDish}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            EDIT DISH
          </Text>
        </TouchableOpacity>


        {/* =========================
            DELETE BUTTON
        ========================== */}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deleteDish}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            DELETE
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  /* =========================
     PAGE
  ========================== */

  safeArea: {
    flex: 1,
    backgroundColor: "#DCEFF3",
  },

  container: {
    flex: 1,
    backgroundColor: "#DCEFF3",
  },

  content: {
    paddingHorizontal: 30,
    paddingTop: 15,
    paddingBottom: 60,
  },


  /* =========================
     HEADER
  ========================== */

  header: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  backIcon: {
    position: "absolute",
    left: 0,
    top: 25,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
    elevation: 20,
  },

  title: {
    fontFamily: "Boldonse",
    fontSize: 30,
    lineHeight: 80,
    color: "#000000",
    textAlign: "center",
  },


  /* =========================
     PHOTO
  ========================== */

  photoBox: {
    height: 220,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  photoIcon: {
    justifyContent: "center",
    alignItems: "center",
  },


  /* =========================
     NAME + PRICE
  ========================== */

  namePriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  dishName: {
    flex: 1,
    fontFamily: "Boldonse",
    fontSize: 25,
    lineHeight: 50,
    color: "#000000",
    paddingRight: 12,
  },

  price: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 25,
    lineHeight: 50,
    color: "#111111",
    paddingTop: 0,
  },


  /* =========================
     COURSE
  ========================== */

  courseBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#55B77D",
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 25,
  },

  courseText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },


  /* =========================
     DESCRIPTION
  ========================== */

  descriptionTitle: {
    fontFamily: "Boldonse",
    fontSize: 20,
    lineHeight: 40,
    color: "#000000",
    marginBottom: 10,
  },

  description: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 18,
    lineHeight: 25,
    paddingRight: 12,
    color: "#111111",
    marginBottom: 25,
  },


  /* =========================
     INFORMATION
  ========================== */

  infoContainer: {
    marginBottom: 30,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  infoIcon: {
    width: 38,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  infoText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 16,
    color: "#111111",
  },


  /* =========================
     BUTTONS
  ========================== */

  editButton: {
    width: 270,
    height: 48,
    backgroundColor: "#55B77D",
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  deleteButton: {
    width: 270,
    height: 48,
    backgroundColor: "#654D45",
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  buttonText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },


  /* =========================
     NOT FOUND
  ========================== */

  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  notFoundTitle: {
    fontFamily: "Boldonse",
    fontSize: 24,
    lineHeight: 32,
    color: "#000000",
    marginBottom: 25,
  },

});