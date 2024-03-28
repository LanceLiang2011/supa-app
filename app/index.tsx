import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { supabase } from "@/utils/supabase";

const IndexScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    setIsLoading(false);
  };

  const handleSignup = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    if (data.session) Alert.alert(`Your session is ${data.session}`);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      <Text style={styles.heading}>Supabase.test</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={`#aaa`}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={`#aaa`}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignin}>
        <Text style={{ color: "#eee" }}>Signin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#ddd" }]}
        onPress={handleSignup}
      >
        <Text style={{ color: "#2b825b" }}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 200,
    backgroundColor: "#151515",
    gap: 16,
  },
  heading: {
    fontSize: 30,
    color: "#eee",
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 48,
    borderColor: "#2b825b",
    borderWidth: 1,
    color: "#eee",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2b825b",
    padding: 12,
    borderRadius: 4,
  },
  spinnerTextStyle: {
    color: "#eee",
  },
});
