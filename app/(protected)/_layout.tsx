import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { supabase } from "@/utils/supabase";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ProtectedLayout = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#151515" },
          headerTintColor: "#efefef",
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
    </GestureHandlerRootView>
  );
};

export default ProtectedLayout;
