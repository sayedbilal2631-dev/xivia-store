"use client";

import { useState } from "react";
import { Box, Typography, Divider, Paper, Button } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
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
import Image from "next/image";
import { colors } from "@/app/constants/colors";
import Link from "next/link";

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
    router.push("/auth/signIn");
  };

  return (
    <>
      <Box sx={{ backgroundColor: colors.accent, width: '100%' }}>
        <Link href={'/'} style={{ fontSize: '50px', fontWeight: 'bold', textDecoration: 'none', color: colors.darkBackground, padding: '20px' }} >Store</Link>
      </Box>
      <Box
        display="flex"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "#fff5ef", pt:2 }}
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

          {/* Sign up with goolge and facebook */}
          <Box sx={{ mt: 3 }}>
            <Button
              onClick={handleGoogleSignUp}
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                textTransform: "none",
                border: "1px solid #dadce0",
                borderRadius: "8px",
                fontWeight: 500,
                mb: 1.5,
                py: 1,
                "&:hover": {
                  backgroundColor: "#f8f9fa",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Image
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                width='20'
                height='20'
              />
              Sign up with Google
            </Button>

            <AuthButton
              icon={<Facebook />}
              label="Sign up with Facebook"
              onClick={handleFacebookSignUp}
            />

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

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              justifyContent: "center",
            }}
          >
            <Typography variant="body2">Already have an account? </Typography>
            <MUIButton variant="text" color="warning" onClick={nextPage}>
              signIn
            </MUIButton>
          </Box>
        </Paper>

        {loading && <MUILoader fullScreen />}
      </Box>
    </>

  );
}
