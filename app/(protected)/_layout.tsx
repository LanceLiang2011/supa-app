import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { supabase } from "@/utils/supabase";

const ProtectedLayout = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#151515" },
        headerTintColor: "#efefef",
        // tabBarActiveBackgroundColor: "#151515",
        // tabBarInactiveBackgroundColor: "#212121",
        tabBarStyle: { backgroundColor: "#151515" },
        headerRight: () => (
          <TouchableOpacity style={{ right: 12 }} onPress={handleLogout}>
            <Ionicons name="exit-outline" size={24} color="#2b825b" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default ProtectedLayout;
