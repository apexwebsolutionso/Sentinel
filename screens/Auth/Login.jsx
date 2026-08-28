import React, { useState, useEffect } from "react";
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
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../firebase";

import { Colors, Spacing, Typography, Radius } from "../../theme";

WebBrowser.maybeCompleteAuthSession();

export default function Login({ onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      setGoogleLoading(true);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("Google Logged in user:", userCredential.user.email);
          Alert.alert("Success", "Signed in with Google successfully!");
        })
        .catch((error) => {
          console.error("Firebase Google Auth Error:", error);
          Alert.alert("Authentication Failed", error.message);
        })
        .finally(() => {
          setGoogleLoading(false);
        });
    } else if (response?.type === "error" || response?.type === "dismiss") {
      setGoogleLoading(false);
    }
  }, [response]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      console.log("Logged in user:", userCredential.user.email);
      Alert.alert("Success", "Logged in successfully!");
    } catch (error) {
      console.error(error);
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    promptAsync().catch((error) => {
      console.error("Prompt error:", error);
      setGoogleLoading(false);
    });
  };

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
            <Ionicons 
              name={secureText ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color={Colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.button, loading && { opacity: 0.7 }]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Modern Google Sign-In Button */}
        <TouchableOpacity 
          style={[styles.googleButton, googleLoading && { opacity: 0.7 }]} 
          onPress={handleGoogleLogin}
          disabled={googleLoading}
        >
          {googleLoading ? (
            <ActivityIndicator color={Colors.text || "#000"} />
          ) : (
            <View style={styles.googleContent}>
              <View style={styles.googleIconContainer}>
                <Svg width="18" height="18" viewBox="0 0 24 24">
                  <Path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <Path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.14C3.17 21.36 7.23 24 12 24z"
                  />
                  <Path
                    fill="#FBBC05"
                    d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.62H1.18C.43 8.12 0 9.81 0 12s.43 3.88 1.18 5.38l4.09-3.14z"
                  />
                  <Path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.64 1.18 6.62l4.09 3.14c.95-2.85 3.6-4.96 6.73-4.96z"
                  />
                </Svg>
              </View>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </View>
          )}
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

        <TouchableOpacity onPress={onSwitchToRegister}>
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
    justifyContent: "center",
    alignItems: "center",
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
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  orText: {
    marginHorizontal: 10,
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  googleButton: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 14,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  googleContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  googleButtonText: {
    color: Colors.text || "#000",
    fontSize: Typography.subtitle,
    fontWeight: "600",
  },
  forgot: {
    textAlign: "center",
    color: Colors.primary,
    fontWeight: "600",
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  footerText: {
    color: Colors.textSecondary,
  },
  signup: {
    color: Colors.primary,
    fontWeight: "700",
  },
});