import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import { useMenu } from "../../MenuContext";

export default function Add() {
  const router = useRouter();

  const { addMenuItem } = useMenu();

  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");
  const [showCourses, setShowCourses] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const courses = ["Starter", "Main Course", "Dessert"];


    // CREATE NEW MENU ITEM
  const saveDish = () => {
    // DISH NAME VALIDATION
    if (!dishName.trim()) {
      Alert.alert(
        "Missing Dish Name",
        "Please enter a dish name."
      );
      return;
    }

    // DESCRIPTION VALIDATION
    if (!description.trim()) {
      Alert.alert(
        "Missing Description",
        "Please enter a description for the dish."
      );
      return;
    }

    // COURSE VALIDATION
    if (!course) {
      Alert.alert(
        "Missing Course",
        "Please select a course."
      );
      return;
    }

    // PRICE VALIDATION
    const cleanedPrice = price
      .replace(/R/gi, "")
      .trim();

    const priceValue = Number(cleanedPrice);

    if (
      !cleanedPrice ||
      isNaN(priceValue) ||
      priceValue <= 0
    ) {
      Alert.alert(
        "Invalid Price",
        "Please enter a valid price greater than R0."
      );
      return;
    }

    // CREATE NEW DISH
    const newDish = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: price.trim(),
      image: photo || undefined,
      dateAdded: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };

    // Add the dish to the menu
    addMenuItem(newDish);

    // CLEAR THE FORM
    setDishName("");
    setDescription("");
    setCourse("");
    setPrice("");
    setShowCourses(false);
    setPhoto(null);

    // Show confirmation
    Alert.alert(
      "Dish Saved",
      `${newDish.dishName} has been added to your menu.`,
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  // ADD PHOTO
    const addPhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photos to add a dish photo."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE */}

        <Text style={styles.title}>ADD MENU ITEM</Text>

        <Text style={styles.subtitle}>
          Build your menu, one dish at a time.
        </Text>

        {/* PHOTO */}

        <TouchableOpacity
          style={styles.photoBox}
          onPress={addPhoto}
          activeOpacity={0.8}
        >
          {photo ? (
            <>
              <Image
                source={{ uri: photo }}
                style={styles.photoPreview}
                resizeMode="cover"
              />

              <View style={styles.photoOverlay}>
                <Text style={styles.photoOverlayText}>CHANGE PHOTO</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.photoIcon}>
                <Text style={styles.photoIconText}>♧</Text>
              </View>

              <Text style={styles.photoText}>Add Photo (optional)</Text>
            </>
          )}
        </TouchableOpacity>

        {/* DISH NAME */}

        <Text style={styles.label}>Dish Name*</Text>

        <TextInput
          style={styles.input}
          placeholder="What have you prepared?"
          placeholderTextColor="#B4B6BE"
          value={dishName}
          onChangeText={setDishName}
        />

        {/* DESCRIPTION */}

        <Text style={styles.label}>Description*</Text>

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Describe the dish..."
          placeholderTextColor="#B4B6BE"
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
        />

        {/* COURSE */}

        <Text style={styles.label}>Course*</Text>

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowCourses(!showCourses)}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.dropdownText, !course && styles.placeholderText]}
          >
            {course || "Course"}
          </Text>

          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d={showCourses ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9"}
              stroke="#000000"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        {/* COURSE OPTIONS */}

        {showCourses && (
          <View style={styles.courseList}>
            {courses.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.courseOption}
                onPress={() => {
                  setCourse(item);
                  setShowCourses(false);
                }}
              >
                <Text style={styles.courseOptionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* PRICE */}

        <Text style={styles.label}>Price*</Text>

        <TextInput
          style={styles.input}
          placeholder="What's the damage?"
          placeholderTextColor="#B4B6BE"
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
        />

        {/* SAVE BUTTON */}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveDish}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>SAVE DISH</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* PAGE */

  safeArea: {
    flex: 1,
    backgroundColor: "#DCEFF3",
  },

  container: {
    flex: 1,
    backgroundColor: "#DCEFF3",
  },

  content: {
    paddingHorizontal: 33,
    paddingTop: 35,
    paddingBottom: 45,
  },

  /* TITLE */

  title: {
    fontFamily: "Boldonse",
    fontSize: 40,
    color: "#000000",
    textAlign: "center",
    marginBottom: 18,
  },

  subtitle: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 16,
    color: "#111111",
    textAlign: "center",
    marginBottom: 28,
  },

  /* PHOTO */

  photoBox: {
    height: 270,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 23,
  },

  photoIcon: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: "#70737B",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  photoIconText: {
    fontSize: 18,
    color: "#70737B",
  },

  photoText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 16,
    color: "#111111",
  },

  photoPreview: {
  width: "100%",
  height: "100%",
  borderRadius: 24,
},

photoOverlay: {
  position: "absolute",
  bottom: 15,
  backgroundColor: "rgba(0, 0, 0, 0.65)",
  paddingHorizontal: 18,
  paddingVertical: 8,
  borderRadius: 20,
},

photoOverlayText: {
  fontFamily: "PlusJakartaSans-ExtraBold",
  fontSize: 13,
  color: "#FFFFFF",
},

  /* LABELS */

  label: {
    fontFamily: "Boldonse",
    fontSize: 20,
    color: "#000000",
    marginBottom: 10,
  },

  /* INPUTS */

  input: {
    height: 42,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 14,
    paddingHorizontal: 17,
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 15,
    color: "#111111",
    marginBottom: 30,
  },

  descriptionInput: {
    height: 120,
    paddingTop: 14,
    paddingBottom: 14,
  },

  /* DROPDOWN */

  dropdown: {
    height: 42,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 14,
    paddingHorizontal: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  dropdownText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 15,
    color: "#111111",
  },

  placeholderText: {
    color: "#B4B6BE",
  },

  courseList: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 14,
    marginBottom: 30,
    overflow: "hidden",
  },

  courseOption: {
    paddingVertical: 13,
    paddingHorizontal: 17,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  courseOptionText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 15,
    color: "#111111",
  },

  /* SAVE BUTTON */

  saveButton: {
    width: 270,
    height: 49,
    backgroundColor: "#55B77D",
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
    marginBottom: 80,
  },

  buttonText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
