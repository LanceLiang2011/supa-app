import { StyleSheet, Text, View, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { supabase } from "@/utils/supabase";
import { decode } from "base64-arraybuffer";
import { URL } from "react-native-url-polyfill";

const ProfileScreen = () => {
  const [imageUri, setImageUri] = useState(
    "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
  );

  useEffect(() => {
    const loadUserAvatar = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // const filePath = `${user?.id}/avatar.png`;
      const filePath = `test/avatar.png`;

      if (!user) return;
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(filePath);

      console.log({ data, error });
      if (data) {
        // const url = URL.createObjectURL(data);
      }
    };
    loadUserAvatar();
  }, [supabase]);

  const setAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      const imageAsset = result.assets[0];
      setImageUri(imageAsset.uri);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const base64 = await FileSystem.readAsStringAsync(imageAsset.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // const filePath = `${user?.id}/avatar.png`;
      const filePath = `test/avatar.png`;

      const contentType = "image/png";
      await supabase.storage
        .from("avatars")
        .upload(filePath, decode(base64), { contentType });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: imageUri }} style={styles.avatar} />
      <Button title="Set Avatar" onPress={setAvatar} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  avatar: {
    width: 200,
    height: 200,
    backgroundColor: "#ccc",
    alignSelf: "center",
    borderRadius: 100,
    margin: 40,
  },
});
