import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

interface FaqItem {
  question: string;
  answer: string;
}

export default function More() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<"menu" | "faq" | "about">(
    "menu",
  );

  const faqs: FaqItem[] = [
    {
      question: "How do I add a new dish to my menu?",
      answer:
        "Tap the + button located at the top-right of the 'All Menu Items' section or use the central + tab in the bottom navigation bar. Fill in the dish name, description, course category, price, and optionally upload a photo, then tap SAVE DISH.",
    },
    {
      question: "How do I update the details or price of an existing dish?",
      answer:
        "Yes! You can edit a dish by tapping the Edit icon on any menu card on the home screen or by opening the dish details and clicking EDIT DISH. This will open the form pre-filled with current dish information so you can make updates seamlessly without starting over.",
    },
    {
      question: "Can I search for specific dishes or filter them by course?",
      answer:
        "Absolutely! Use the search bar on the home screen to look up dishes by their name or description. You can also filter items instantly by selecting course options such as Starter, Main Course, or Dessert, or tap ALL to view your complete menu.",
    },
    {
      question: "Is there a way to clear all menu items simultaneously?",
      answer:
        "Yes. If you want to start fresh, scroll to the bottom of the home screen and tap the CLEAR MENU button. After confirming your choice in the alert prompt, all menu items will be cleared immediately.",
    },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
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
          <Text style={styles.mainTitle}>MORE</Text>
        </View>

        <View style={styles.divider} />

        {/* ACCORDION ITEM 1: FREQUENTLY ASKED QUESTIONS */}
        <Pressable
          style={styles.accordionHeader}
          onPress={() =>
            setActiveSection(activeSection === "faq" ? "menu" : "faq")
          }
        >
          <Text
            style={[
              styles.iconX,
              activeSection === "faq" && styles.iconXActive,
            ]}
          >
            ✕
          </Text>
          <Text style={styles.accordionTitle}>Frequently Asked Questions</Text>
        </Pressable>

        {/* FAQ CONTENT DROPDOWN */}
        {activeSection === "faq" && (
          <View style={styles.faqListContainer}>
            {faqs.map((faq, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <View key={index} style={styles.faqCard}>
                  <Pressable
                    style={styles.faqQuestionRow}
                    onPress={() => toggleFaq(index)}
                  >
                    <Text style={styles.faqQuestionText}>{faq.question}</Text>
                    <Text style={styles.chevron}>{isExpanded ? "▽" : "△"}</Text>
                  </Pressable>
                  {isExpanded && (
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                  )}
                </View>
              );
            })}
          </View>
        )}

        <View style={styles.dividerThin} />

        {/* ACCORDION ITEM 2: ABOUT US */}
        <Pressable
          style={styles.accordionHeader}
          onPress={() =>
            setActiveSection(activeSection === "about" ? "menu" : "about")
          }
        >
          <Text
            style={[
              styles.iconX,
              activeSection === "about" && styles.iconXActive,
            ]}
          >
            ✕
          </Text>
          <Text style={styles.accordionTitle}>About Us</Text>
        </Pressable>

        {/* ABOUT US CONTENT DROPDOWN */}
        {activeSection === "about" && (
          <View style={styles.aboutCard}>
            <Text style={styles.aboutHeading}>CHEFBOARD MENU MANAGER</Text>
            <Text style={styles.aboutText}>
              ChefBoard is a all-in-one mobile menu management app designed for professional chefs, 
              culinary creators, and bakers. It streamlines kitchen operations by allowing users to build, 
              organize, scale, and analyze the cost of gourmet recipes and menus from a single, intuitive interface.
            </Text>
            <Text style={styles.aboutSubText}>
              Version 1.0.0 • Built with Expo
            </Text>
          </View>
        )}

        <View style={styles.dividerThin} />
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
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  mainTitle: {
    flex: 1,
    fontFamily: "Boldonse",
    fontSize: 40,
    color: "#000000",
    textAlign: "right",
    marginTop: 20,
  },
  divider: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#000000",
    marginTop: 20,
    marginBottom: 5,
  },
  dividerThin: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#000000",
    marginTop: 10,
    marginBottom: 5,
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
  },
  iconX: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 20,
    color: "#000000",
  },
  iconXActive: {
    color: "#469A6E",
  },
  accordionTitle: {
    fontFamily: "Boldonse",
    fontSize: 20,
    color: "#000000",
    textAlign: "right",
    flex: 1,
  },
  faqListContainer: {
    marginTop: 5,
    marginBottom: 15,
    gap: 12,
  },
  faqCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 16,
    padding: 16,
  },
  faqQuestionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestionText: {
    flex: 1,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
    color: "#000000",
    paddingRight: 10,
  },
  chevron: {
    fontSize: 18,
    color: "#000000",
  },
  faqAnswerText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 14,
    color: "#000000",
    marginTop: 10,
    lineHeight: 20,
  },
  aboutCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 20,
    padding: 20,
    marginTop: 5,
    marginBottom: 15,
  },
  aboutHeading: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 20,
    color: "#469A6E",
    marginBottom: 10,
  },
  aboutText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 14,
    color: "#000000",
    lineHeight: 20,
    marginBottom: 10,
  },
  aboutSubText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 14,
    color: "#888888",
  },
});
