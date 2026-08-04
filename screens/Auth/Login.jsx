import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors, Spacing, Typography, Radius } from "../../theme";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🛡️</Text>

        <Text style={styles.title}>Sentinel</Text>

        <Text style={styles.subtitle}>
          Protecting what matters most.
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

        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.textSecondary}
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgot}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?
        </Text>

        <TouchableOpacity>
          <Text style={styles.signup}> Create Account</Text>
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
  },

  header: {
    marginTop: 60,
    alignItems: "center",
  },

  logo: {
    fontSize: 70,
    marginBottom: 20,
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
    gap: 18,
  },

  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: Typography.body,
  },

  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 17,
    borderRadius: Radius.lg,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: Colors.white,
    fontSize: Typography.subtitle,
    fontWeight: "700",
  },

  forgot: {
    textAlign: "center",
    color: Colors.primary,
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },

  footerText: {
    color: Colors.textSecondary,
  },

  signup: {
    color: Colors.primary,
    fontWeight: "700",
  },
});