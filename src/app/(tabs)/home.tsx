import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useMenu } from "../../MenuContext";

export default function Home() {
  const router = useRouter();
  const { menuItems, clearMenu, deleteMenuItem } = useMenu();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("ALL");

  // Simple fuzzy/spelling tolerance helper (Levenshtein distance calculation)
  const getLevenshteinDistance = (a: string, b: string): number => {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1, // deletion
            ),
          );
        }
      }
    }
    return matrix[b.length][a.length];
  };

  // Check if query loosely matches text with minor spelling tolerance
  const isCloseMatch = (text: string, query: string): boolean => {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) return true;
    if (lowerText.includes(lowerQuery)) return true;

    const textWords = lowerText.split(/\s+/);
    const queryWords = lowerQuery.split(/\s+/);

    return queryWords.every((qWord) =>
      textWords.some((tWord) => {
        if (tWord.includes(qWord)) return true;
        const maxErrors = qWord.length > 5 ? 2 : 1;
        return getLevenshteinDistance(tWord, qWord) <= maxErrors;
      }),
    );
  };

  // Filter menu items by search query (with spelling check) and course category
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      isCloseMatch(item.dishName, searchQuery) ||
      isCloseMatch(item.description, searchQuery);

    const matchesCourse =
      selectedCourse === "ALL" ||
      item.course.toLowerCase() === selectedCourse.toLowerCase();

    return matchesSearch && matchesCourse;
  });

  const handleSearchChange = (text: string) => {
    if (text.length <= 50) {
      // Capitalize the first letter automatically
      const formattedText =
        text.length > 0 ? text.charAt(0).toUpperCase() + text.slice(1) : text;
      setSearchQuery(formattedText);
    }
  };

  const handleResetSearchFilter = () => {
    setSearchQuery("");
    setSelectedCourse("ALL");
  };

  const handleClearMenu = () => {
    Alert.alert(
      "Clear Menu",
      "Are you sure you want to remove all menu items?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => clearMenu(),
        },
      ],
    );
  };

  const handleDeleteItem = (id: string, name: string) => {
    Alert.alert("Delete Dish", `Are you sure you want to delete ${name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteMenuItem(id),
      },
    ]);
  };

  const handleEditItem = (id: string) => {
    router.push({
      pathname: "/(tabs)/add",
      params: { id },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}></View>

        <Image
          source={require("../../../assets/images/utencils.png")}
          style={styles.utencils}
          resizeMode="contain"
        />

        <View style={styles.header}>
          <Text style={styles.mainHeading}>CHEFBOARD MENU</Text>
          <Text style={styles.welcomeText}>WELCOME BACK CHEF!</Text>
          <View style={styles.divider} />
        </View>

        {/* SEARCH BAR */}
        <Text style={styles.sectionHeadingSmall}>
          FROM FIRST SIGHT TO FINAL BITE
        </Text>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="SEARCH BY CRAVING, NOT JUST CUISINE..."
            placeholderTextColor="#888888"
            value={searchQuery}
            onChangeText={handleSearchChange}
            maxLength={50}
            autoCapitalize="sentences"
          />
          <Pressable style={styles.searchButton}>
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
              <Path
                d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="#FFFFFF"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Pressable>
        </View>

        {/* FILTER BY COURSE */}
        <Text style={styles.sectionHeadingSmall}>FILTER BY COURSE</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {["ALL", "Starter", "Main Course", "Dessert"].map((course) => {
            const isActive =
              selectedCourse.toLowerCase() === course.toLowerCase();
            return (
              <Pressable
                key={course}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setSelectedCourse(course)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isActive && styles.filterChipTextActive,
                  ]}
                >
                  {course.toUpperCase()}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* MENU TITLE */}
        <View style={styles.menuTitleRow}>
          <Text style={styles.sectionHeading}>ALL MENU ITEMS</Text>
          <Pressable
            style={styles.smallAddButton}
            onPress={() => router.push("/(tabs)/add")}
          >
            <Text style={styles.plus}>+</Text>
          </Pressable>
        </View>

        {/* MENU ITEMS / SEARCH RESULTS */}
        {menuItems.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>NO MENU ITEMS YET</Text>
            <Text style={styles.emptyText}>
              Add your first dish to build your menu.
            </Text>
          </View>
        ) : filteredItems.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>NO RESULTS FOUND</Text>
            <Text style={styles.emptyText}>
              No menu items match your search or filter.
            </Text>
            <Pressable
              style={styles.resetButton}
              onPress={handleResetSearchFilter}
            >
              <Text style={styles.resetButtonText}>CLEAR SEARCH & FILTER</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.menuList}>
            {filteredItems.map((item) => (
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
                <View style={styles.imagePlaceholder}>
                  {item.image ? (
                    <Image
                      source={{ uri: item.image }}
                      style={styles.dishImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={require("../../../assets/images/whip.png")}
                      style={styles.whipImage}
                      resizeMode="contain"
                    />
                  )}
                </View>

                <View style={styles.menuInfo}>
                  <View style={styles.namePriceRow}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.dishName}
                    </Text>
                    <Text style={styles.itemPrice}>R{item.price}</Text>
                  </View>

                  <View style={styles.courseActionRow}>
                    <Text style={styles.itemCourse}>{item.course}</Text>
                    <View style={styles.actionButtons}>
                      {/* EDIT ICON BUTTON */}
                      <Pressable
                        style={styles.actionIconButton}
                        onPress={(e) => {
                          e.stopPropagation();
                          handleEditItem(item.id);
                        }}
                      >
                        <Svg
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <Path
                            d="M11 3.99998H6.8C5.11984 3.99998 4.27976 3.99998 3.63803 4.32696C3.07354 4.61458 2.6146 5.07353 2.32698 5.63801C2 6.27975 2 7.11983 2 8.79998V17.2C2 18.8801 2 19.7202 2.32698 20.362C2.6146 20.9264 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9264 19.673 20.362C20 19.7202 20 18.8801 20 17.2V13M7.99997 16H9.67452C10.1637 16 10.4083 16 10.6385 15.9447C10.8425 15.8957 11.0376 15.8149 11.2166 15.7053C11.4184 15.5816 11.5914 15.4086 11.9373 15.0627L21.5 5.49998C22.3284 4.67156 22.3284 3.32841 21.5 2.49998C20.6716 1.67156 19.3284 1.67155 18.5 2.49998L8.93723 12.0627C8.59133 12.4086 8.41838 12.5816 8.29469 12.7834C8.18504 12.9624 8.10423 13.1574 8.05523 13.3615C7.99997 13.5917 7.99997 13.8363 7.99997 14.3255V16Z"
                            stroke="#000000"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Svg>
                      </Pressable>

                      {/* DELETE ICON BUTTON */}
                      <Pressable
                        style={styles.actionIconButton}
                        onPress={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(item.id, item.dishName);
                        }}
                      >
                        <Svg
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <Path
                            d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"
                            stroke="#000000"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Svg>
                      </Pressable>
                    </View>
                  </View>

                  <Text style={styles.itemDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {(searchQuery !== "" || selectedCourse !== "ALL") &&
          filteredItems.length > 0 && (
            <Pressable
              style={styles.resetSearchButton}
              onPress={handleResetSearchFilter}
            >
              <Text style={styles.resetSearchButtonText}>
                CLEAR SEARCH & FILTER
              </Text>
            </Pressable>
          )}

        {menuItems.length > 0 && (
          <Pressable style={styles.clearButton} onPress={handleClearMenu}>
            <Text style={styles.clearButtonText}>CLEAR MENU</Text>
          </Pressable>
        )}
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
    paddingHorizontal: 32,
    paddingBottom: 120,
  },
  header: {
    alignItems: "center",
    paddingTop: 10,
  },
  utencils: {
    width: "100%",
    height: 70,
    alignSelf: "center",
    marginLeft: -32,
    marginRight: -32,
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
    marginBottom: 20,
  },
  sectionHeadingSmall: {
    fontFamily: "Boldonse",
    fontSize: 20,
    color: "#000000",
    marginBottom: 20,
    marginTop: 10,
  },
  searchRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 24,
    paddingHorizontal: 16,
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 14,
    color: "#000000",
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: "#000000",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  filterRow: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 20,
    paddingVertical: 4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  filterChipActive: {
    backgroundColor: "#469A6E",
  },
  filterChipText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: "#000000",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  menuTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 18,
  },
  sectionHeading: {
    fontFamily: "Boldonse",
    fontSize: 20,
    color: "#000000",
    marginBottom: 10,
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
  emptyCard: {
    minHeight: 130,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  emptyTitle: {
    fontFamily: "Boldonse",
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: "#51AF7D",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 5,
  },
  resetButtonText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 12,
    color: "#FFFFFF",
  },
  menuList: {
    gap: 20,
  },
  menuCard: {
    minHeight: 180,
    backgroundColor: "#51AF7D",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
  },
  menuCardPressed: {
    backgroundColor: "#469A6E",
  },
  imagePlaceholder: {
    width: 110,
    height: 140,
    backgroundColor: "#E14E3E",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    overflow: "hidden",
  },
  whipImage: {
    width: 80,
    height: 80,
  },
  dishImage: {
    width: 110,
    height: 140,
    borderRadius: 10,
  },
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
    fontSize: 14,
    color: "#000000",
    lineHeight: 21,
    paddingRight: 6,
  },
  itemPrice: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 14,
    color: "#000000",
  },
  courseActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 4,
  },
  itemCourse: {
    fontFamily: "PlusJakartaSans-SemiBoldItalic",
    fontSize: 14,
    color: "#000000",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 6,
  },
  actionIconButton: {
    width: 28,
    height: 28,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  itemDescription: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 14,
    color: "#000000",
    lineHeight: 18,
  },
  resetSearchButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  resetSearchButtonText: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 14,
    color: "#000000",
  },
  clearButton: {
    width: "100%",
    height: 54,
    backgroundColor: "#644D46",
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  clearButtonText: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 15,
    color: "#FFFFFF",
  },
});
