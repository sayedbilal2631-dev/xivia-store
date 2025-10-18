"use client";

import { useState } from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import { Google, Facebook, LinkedIn } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/app/config/firebase";
import MUIButton from "@/app/components/common/Button";
import MUITextField from "@/app/components/common/TextField";
import MUILoader from "@/app/components/common/Loader";
import AuthButton from "@/app/components/common/AuthButton";


export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignUp = async () => {
    const provider = new FacebookAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName });
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    router.push('/auth/signIn')
  }
  return (
    <Box
      display="flex"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: "#fff5ef" }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 420,
          p: 4,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Create an account
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          Join us and start exploring!
        </Typography>

        <Box sx={{ mt: 3 }}>
          {/* Google sign up */}
          <AuthButton icon={<Google />} label="Sign up with Goolge" onClick={handleGoogleSignUp} />
          {/* facebook sign up */}
          <AuthButton icon={<Facebook />} label="Sign up with Facebook" onClick={handleFacebookSignUp} />
          {/* linkedIn sign up */}
          <AuthButton icon={<LinkedIn />} label="Sign up with LinkedIn" disabled />

          <Divider sx={{ my: 2 }}>OR</Divider>

          <form onSubmit={handleEmailSignUp}>
            <MUITextField
              label="Full Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              error={error && !displayName ? "Please enter your name" : ""}
            />

            <MUITextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && !email ? "Please enter a valid email" : ""}
            />

            <MUITextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error && !password ? "Please enter a password" : ""}
            />

            <MUIButton
              type="submit"
              fullWidth
              color="warning"
              isLoading={loading}
            >
              Create account
            </MUIButton>
          </form>
        </Box>

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, justifyContent: 'center' }}>
          <Typography variant="body2" >
            Already have an account?{" "}
          </Typography>
          <MUIButton variant="text" color="warning" onClick={nextPage}>
            signIn
          </MUIButton>
        </Box>
      </Paper>

      {loading && <MUILoader fullScreen />}
    </Box>
  );
}
