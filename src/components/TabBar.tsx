import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  HomeIcon,
  AddIcon,
  StatsIcon,
  MenuIcon,
} from "./TabIcons";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: any) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];

          // Custom SVG icon
          let Icon;

          if (route.name === "home") {
            Icon = HomeIcon;
          } else if (route.name === "add") {
            Icon = AddIcon;
          } else if (route.name === "stats") {
            Icon = StatsIcon;
          } else {
            Icon = MenuIcon;
          }

          const label = options.title ?? route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={[
                styles.tab,
                isFocused && styles.selectedTab,
              ]}
            >
              {/* CUSTOM SVG ICON */}
              <Icon
                size={28}
                color={isFocused ? "#FFFFFF" : "#2A1C02"}
                strokeWidth={1}
              />

              {/* Only show label for selected tab */}
              {isFocused && (
                <Text style={styles.selectedLabel}>
                  {label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,

    alignItems: "center",
  },

  tabBar: {
    width: "88%",
    height: 80,

    backgroundColor: "#FFFFFF",

    borderRadius: 40,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    paddingHorizontal: 8,

    shadowColor: "#2A1C02",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,

    elevation: 8,
  },

  tab: {
    height: 54,
    minWidth: 54,

    paddingHorizontal: 14,

    borderRadius: 28,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 8,
  },

  selectedTab: {
    backgroundColor: "#654D45",
  },

  selectedLabel: {
    color: "#FFFFFF",

    fontSize: 14,
    fontWeight: "500",
  },
});