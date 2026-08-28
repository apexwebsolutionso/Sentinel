import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase"; 
import { doc, setDoc } from "firebase/firestore";

import { Colors, Spacing, Typography, Radius } from "../../theme";

export default function Register({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [confirmSecureText, setConfirmSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Success", "Account created successfully!");
      if (onSwitchToLogin) onSwitchToLogin();
    } catch (error) {
      console.error(error);
      Alert.alert("Registration Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🛡️</Text>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join Sentinel to secure your world.
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Email Address"
          placeholderTextColor={Colors.textSecondary}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={Colors.textSecondary}
            style={styles.passwordInput}
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity 
            onPress={() => setSecureText(!secureText)}
            style={styles.eyeButton}
          >
            <Text style={styles.eyeText}>{secureText ? "👁️" : "🙈"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={Colors.textSecondary}
            style={styles.passwordInput}
            secureTextEntry={confirmSecureText}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity 
            onPress={() => setConfirmSecureText(!confirmSecureText)}
            style={styles.eyeButton}
          >
            <Text style={styles.eyeText}>{confirmSecureText ? "👁️" : "🙈"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>

        <TouchableOpacity onPress={onSwitchToLogin}>
          <Text style={styles.loginLink}> Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    justifyContent: "space-between",
    width: "100%",
  },
  header: {
    marginTop: 40,
    alignItems: "center",
  },
  logo: {
    fontSize: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: Typography.h1,
    fontWeight: "700",
    color: Colors.primary,
  },
  subtitle: {
    marginTop: 8,
    fontSize: Typography.subtitle,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  form: {
    gap: 14,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: Typography.body,
    color: Colors.text || "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: Typography.body,
    color: Colors.text || "#000",
  },
  eyeButton: {
    paddingHorizontal: 15,
  },
  eyeText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 17,
    borderRadius: Radius.lg,
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    color: Colors.white,
    fontSize: Typography.subtitle,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  footerText: {
    color: Colors.textSecondary,
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: "700",
  },
});