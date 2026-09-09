import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useMenu } from "../MenuContext";

export default function DishDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { menuItems } = useMenu();

  const dishId = Array.isArray(id) ? id[0] : id;

  // Find the dish that was selected
  const dish = menuItems.find((item) => item.id === dishId);

  // If no dish was found
  if (!dish) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>DISH NOT FOUND</Text>

          <Text style={styles.errorText}>
            The selected menu item could not be found.
          </Text>

          <TouchableOpacity
            style={styles.errorButton}
            onPress={() => router.replace("/(tabs)/home")}
          >
            <Text style={styles.errorButtonText}>BACK TO MENU</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Dish",
      "The delete functionality will be added later.",
      [
        {
          text: "OK",
          style: "default",
        },
      ],
    );
  };

  const handleEdit = () => {
    Alert.alert("Edit Dish", "The edit functionality will be added later.", [
      {
        text: "OK",
        style: "default",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* TOP RED IMAGE SECTION */}

        <View style={styles.heroSection}>
          {/* BACK BUTTON */}

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace("/(tabs)/home")}
            activeOpacity={0.7}
          >
            <Svg width={45} height={45} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 8L8 12M8 12L12 16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="#FFFFFF"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* TITLE */}

          <Text style={styles.heroTitle}>DISH DETAILS</Text>

          {/* WHISK IMAGE */}

          <Image
            source={require("../../assets/images/whip.png")}
            style={styles.whipImage}
            resizeMode="contain"
          />
        </View>

        {/* DISH INFORMATION */}

        <View style={styles.detailsSection}>
          {/* NAME + PRICE */}

          <View style={styles.namePriceRow}>
            <Text style={styles.dishName}>{dish.dishName}</Text>

            <Text style={styles.dishPrice}>R{dish.price}</Text>
          </View>

          {/* COURSE */}

          <View style={styles.courseBadge}>
            <Text style={styles.courseText}>{dish.course.toUpperCase()}</Text>
          </View>

          {/* DESCRIPTION */}

          <Text style={styles.descriptionHeading}>Description</Text>

          <Text style={styles.description}>{dish.description}</Text>

          {/* EXTRA INFORMATION */}

          <View style={styles.infoContainer}>
            {/* DATE ADDED */}
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Svg width={27} height={27} viewBox="0 0 28 28" fill="none">
                  <Path
                    d="M21.9208 13.265C21.9731 12.8507 22 12.4285 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C12.4354 22 12.8643 21.9722 13.285 21.9182M12 6V12L15.7384 13.8692M19 22V16M16 19H22"
                    stroke="#000000"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>

              <Text style={styles.infoText}>ADDED | {dish.dateAdded}</Text>
            </View>

            {/* POPULAR DISH */}
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Svg width={27} height={27} viewBox="0 0 28 28" fill="none">
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

              <Text style={styles.infoText}>POPULAR DISH</Text>
            </View>

            {/* CREATED BY */}
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Svg width={27} height={27} viewBox="0 0 28 28" fill="none">
                  <Path
                    d="M8 7H16M12 7V17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 3.07354 3.32698 4.63803C3 5.27976 3 6.11984 3.32698 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
                    stroke="#000000"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>

              <Text style={styles.infoText}>CREATED BY | CHEF CHRISTOFFEL</Text>
            </View>
          </View>

          {/* EDIT BUTTON */}

          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEdit}
            activeOpacity={0.8}
          >
            <Text style={styles.editButtonText}>EDIT DISH</Text>
          </TouchableOpacity>

          {/* DELETE BUTTON */}

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            activeOpacity={0.8}
          >
            <Text style={styles.deleteButtonText}>DELETE</Text>
          </TouchableOpacity>
        </View>
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

  scrollView: {
    flex: 1,
    backgroundColor: "#D7ECF1",
  },

  scrollContent: {
    paddingBottom: 60,
  },

  /* RED HERO SECTION */

  heroSection: {
    height: 500,
    backgroundColor: "#E14E3E",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  /* BACK BUTTON */

  backButton: {
    position: "absolute",
    left: 22,
    top: 32,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  /* TITLE */

  heroTitle: {
    position: "absolute",
    top: 30,
    right: 22,
    fontFamily: "Boldonse",
    fontSize: 30,
    color: "#FFFFFF",
    textAlign: "right",
  },

  /* WHIP */

  whipImage: {
    width: 200,
    height: 200,
    marginTop: 80,
  },

  /* DETAILS */

  detailsSection: {
    backgroundColor: "#D7ECF1",
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 40,
  },

  /* NAME + PRICE */

  namePriceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  dishName: {
    flex: 1,
    fontFamily: "Boldonse",
    fontSize: 30,
    lineHeight: 50,
    color: "#000000",
    paddingRight: 12,
  },

  dishPrice: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 30,
    color: "#000000",
    marginTop: 0,
  },

  /* COURSE */

  courseBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#51AF7D",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 12,
  },

  courseText: {
    fontFamily: "PlusJakartaSans-Semibold",
    fontSize: 16,
    color: "#FFFFFF",
  },

  /* DESCRIPTION */

  descriptionHeading: {
    fontFamily: "Boldonse",
    fontSize: 20,
    color: "#000000",
    marginTop: 20,
    marginBottom: 10,
  },

  description: {
    fontFamily: "PlusJakartaSans-Semibold",
    fontSize: 18,
    lineHeight: 25,
    color: "#000000",
    paddingRight: 30,
  },

  /* INFORMATION */

  infoContainer: {
    marginTop: 30,
    gap: 10,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 38,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  infoText: {
    flex: 1,
    fontFamily: "PlusJakartaSans-Semibold",
    fontSize: 16,
    color: "#000000",
  },

  /* EDIT BUTTON */

  editButton: {
    height: 64,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 38,
    marginHorizontal: 35,
  },

  editButtonText: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 18,
    color: "#000000",
  },

  /* DELETE BUTTON */

  deleteButton: {
    height: 64,
    backgroundColor: "#E14E3E",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 35,
  },

  deleteButtonText: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 18,
    color: "#FFFFFF",
  },

  /* ERROR STATE */

  errorContainer: {
    flex: 1,
    backgroundColor: "#D7ECF1",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  errorTitle: {
    fontFamily: "Boldonse",
    fontSize: 25,
    color: "#000000",
    textAlign: "center",
  },

  errorText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 30,
  },

  errorButton: {
    backgroundColor: "#71B98A",
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },

  errorButtonText: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 15,
    color: "#FFFFFF",
  },
});
