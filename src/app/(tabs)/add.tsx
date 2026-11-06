import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useMenu } from "../../MenuContext";

export default function Add() {
  const router = useRouter();
  const { id, t } = useLocalSearchParams();
  const { menuItems, addMenuItem, updateMenuItem } = useMenu();

  const editId = Array.isArray(id) ? id[0] : id;
  const existingItem = editId
    ? menuItems.find((item) => item.id === editId)
    : null;

  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");
  const [showCourses, setShowCourses] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const courses = ["Starter", "Main Course", "Dessert"];

  // Clear/pre-fill whenever `editId` or `t` (timestamp) changes
  useEffect(() => {
    if (editId && existingItem) {
      setDishName(existingItem.dishName);
      setDescription(existingItem.description);
      setCourse(existingItem.course);
      setPrice(existingItem.price);
      setPhoto(existingItem.image || null);
    } else {
      setDishName("");
      setDescription("");
      setCourse("");
      setPrice("");
      setPhoto(null);
    }
  }, [editId, t, existingItem]);

  // Handle description change with max 500 chars and first-letter capitalization
  const handleDescriptionChange = (text: string) => {
    if (text.length <= 500) {
      const formattedText =
        text.length > 0 ? text.charAt(0).toUpperCase() + text.slice(1) : text;
      setDescription(formattedText);
    }
  };

  // Handle price change to normalize commas to dots and prevent multiple decimals
  const handlePriceChange = (text: string) => {
    let formatted = text.replace(/,/g, ".");
    const parts = formatted.split(".");
    if (parts.length > 2) {
      formatted = parts[0] + "." + parts.slice(1).join("");
    }
    setPrice(formatted);
  };

  // SAVE OR UPDATE DISH
  const saveDish = () => {
    const cleanedPrice = price.replace(/R/gi, "").trim();
    const priceValue = Number(cleanedPrice);

    // CHECK IF FORM IS ENTIRELY EMPTY OR HAS MISSING DETAILS
    if (!dishName.trim() && !description.trim() && !course && !cleanedPrice) {
      Alert.alert(
        "Missing Details",
        "Please enter dish details before saving.",
      );
      return;
    }

    if (!dishName.trim()) {
      Alert.alert("Missing Details", "Please enter dish details (dish name).");
      return;
    }

    if (!description.trim()) {
      Alert.alert(
        "Missing Details",
        "Please enter dish details (description).",
      );
      return;
    }

    if (!course) {
      Alert.alert(
        "Missing Details",
        "Please enter dish details (select a course).",
      );
      return;
    }

    if (!cleanedPrice || isNaN(priceValue) || priceValue <= 0) {
      Alert.alert(
        "Invalid Price",
        "Please enter dish details with a valid price greater than R0.",
      );
      return;
    }

    if (existingItem) {
      // UPDATE EXISTING ITEM
      const updatedDish = {
        ...existingItem,
        dishName: dishName.trim(),
        description: description.trim(),
        course,
        price: price.trim(),
        image: photo || undefined,
      };

      updateMenuItem(updatedDish);

      // CONFIRMATION MODAL / ALERT
      Alert.alert(
        "Dish Updated",
        `${updatedDish.dishName} has been successfully updated.`,
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ],
      );
    } else {
      // CREATE NEW ITEM
      const newDish = {
        id: Date.now().toString(),
        dishName: dishName.trim(),
        description: description.trim(),
        course,
        price: price.trim(),
        dateAdded: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        image: photo || undefined,
      };

      addMenuItem(newDish);

      Alert.alert(
        "Dish Saved",
        `${newDish.dishName} has been added to your menu.`,
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ],
      );
    }
  };

  // ADD PHOTO
  const addPhoto = async () => {
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

  // REMOVE PHOTO
  const removePhoto = () => {
    Alert.alert("Remove Photo", "Are you sure you want to remove this photo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => setPhoto(null),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE */}
        <Text style={styles.title}>
          {existingItem ? "EDIT MENU ITEM" : "ADD MENU ITEM"}
        </Text>

        <Text style={styles.subtitle}>
          {existingItem
            ? "Update your dish details below."
            : "Build your menu, one dish at a time."}
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

              <View style={styles.photoOverlayContainer}>
                <View style={styles.photoOverlay}>
                  <Text style={styles.photoOverlayText}>CHANGE PHOTO</Text>
                </View>

                {/* REMOVE PHOTO BUTTON */}
                <TouchableOpacity
                  style={styles.removePhotoButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    removePhoto();
                  }}
                >
                  <Text style={styles.removePhotoText}>✕</Text>
                </TouchableOpacity>
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
        <Text style={styles.label}>DISH NAME*</Text>

        <TextInput
          style={styles.input}
          placeholder="WHAT HAVE YOU PREPARED?"
          placeholderTextColor="#B4B6BE"
          value={dishName}
          onChangeText={setDishName}
        />

        {/* DESCRIPTION WITH 500 CHAR LIMIT AND CAPITALIZATION */}
        <View style={styles.labelRow}>
          <Text style={styles.label}>DESCRIPTION*</Text>
          <Text style={styles.charCounter}>{description.length}/500</Text>
        </View>

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="DESCRIBE THE DISH..."
          placeholderTextColor="#B4B6BE"
          value={description}
          onChangeText={handleDescriptionChange}
          maxLength={500}
          autoCapitalize="sentences"
          multiline
          textAlignVertical="top"
        />

        {/* COURSE */}
        <Text style={styles.label}>COURSE*</Text>

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowCourses(!showCourses)}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.dropdownText, !course && styles.placeholderText]}
          >
            {course || "COURSE CATEGORY"}
          </Text>

          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d={showCourses ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9"}
              stroke="#000000"
              strokeWidth={1.5}
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
        <Text style={styles.label}>PRICE*</Text>

        <TextInput
          style={styles.input}
          placeholder="WHAT'S THE DAMAGE? (e.g. 90.00)"
          placeholderTextColor="#B4B6BE"
          value={price}
          onChangeText={handlePriceChange}
          keyboardType="decimal-pad"
        />

        {/* SAVE / UPDATE BUTTON */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveDish}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {existingItem ? "UPDATE DISH" : "SAVE DISH"}
          </Text>
        </TouchableOpacity>

        {/* BACK TO HOME BUTTON */}
        <TouchableOpacity
          style={styles.backHomeButton}
          onPress={() => router.push("/(tabs)/home")}
          activeOpacity={0.8}
        >
          <Text style={styles.backHomeButtonText}>BACK TO HOME</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  title: {
    fontFamily: "Boldonse",
    fontSize: 40,
    color: "#000000",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    marginBottom: 30,
  },
  photoBox: {
    height: 200,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  photoIcon: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#70737B",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  photoIconText: {
    fontSize: 18,
    color: "#70737B",
  },
  photoText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 14,
    color: "#70737B",
  },
  photoPreview: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
  },
  photoOverlayContainer: {
    position: "absolute",
    bottom: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  photoOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  photoOverlayText: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 14,
    color: "#FFFFFF",
  },
  removePhotoButton: {
    width: 34,
    height: 34,
    backgroundColor: "#E14E3E",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  removePhotoText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  label: {
    fontFamily: "Boldonse",
    fontSize: 20,
    color: "#000000",
    marginBottom: 10,
  },
  charCounter: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 14,
    color: "#666666",
  },
  input: {
    height: 42,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 14,
    paddingHorizontal: 17,
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 16,
    color: "#000000",
    marginBottom: 30,
  },
  descriptionInput: {
    height: 140,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 30,
  },
  dropdown: {
    height: 42,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 14,
    paddingHorizontal: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  dropdownText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 16,
    color: "#000000",
  },
  placeholderText: {
    color: "#B4B6BE",
  },
  courseList: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
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
    fontSize: 16,
    color: "#000000",
  },
  saveButton: {
    width: 160,
    height: 40,
    backgroundColor: "#55B77D",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  backHomeButton: {
    width: 160,
    height: 40,
    backgroundColor: "#654D45",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 100,
  },
  backHomeButtonText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});