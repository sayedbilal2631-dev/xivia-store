"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import AuthButton from "@/app/components/common/AuthButton";
import AuthCard from "@/app/components/common/AuthCard";
import MUIButton from "@/app/components/common/Button";
import { colors } from "@/app/constants/colors";
import { auth } from "@/app/config/firebase";
import Link from "next/link";
import MUITextFieldEnhanced from "@/app/components/common/TextField";
import CustomButton from "@/app/components/common/Button";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  const nextPage = () => {
    router.push('/auth/signUp')
  }
  return (
    <Box>
      <Box sx={{backgroundColor:colors.accent, width:'100%'}}>
        <Link href={'/'} style={{  fontSize:'50px', fontWeight:'bold', textDecoration: 'none',color:colors.darkBackground, padding: '20px' }} >Store</Link>
      </Box>

      <AuthCard title="Sign in" subtitle="Use your last sign-in method">
  

        <form onSubmit={handleEmailSignIn}>
          <MUITextFieldEnhanced
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <MUITextFieldEnhanced
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <AuthButton
            type="submit"
            variant="contained"
            label="Continue with email"
            loading={loading}
            color="#ff6a00"
          />
        </form>

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
          <Typography variant="body2" >
            New to Xivia Store?{" "}

          </Typography>
          <CustomButton buttonType={'orange'}  onClick={nextPage}>
            Create new account
          </CustomButton>
        </Box>
      </AuthCard>
    </Box>
  );
}
