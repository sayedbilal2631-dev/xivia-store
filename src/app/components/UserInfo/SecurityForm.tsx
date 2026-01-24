"use client";
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { Box, Button, Typography } from "@mui/material";
import MUITextFieldEnhanced from "../common/TextField";
import { useState } from "react";

const SecurityForm = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        const auth = getAuth();
        if (!auth.currentUser || !auth.currentUser.email) {
            alert("User not logged in");
            return;
        }

        setLoading(true);

        try {
            // Re-authenticate with old password
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                oldPassword
            );

            await reauthenticateWithCredential(auth.currentUser, credential);

            // Update password
            await updatePassword(auth.currentUser, newPassword);
            alert("Password updated successfully");

            // Clear inputs
            setOldPassword("");
            setNewPassword("");
        } catch (error: any) {
            console.error(error);
            if (error.code === "auth/wrong-password") {
                alert("Old password is incorrect");
            } else {
                alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Security
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }} gap={2} >
                <MUITextFieldEnhanced
                    label="Old Password"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    fullWidth
                />

                <MUITextFieldEnhanced
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                />
            </Box>
            <Button
                variant="contained"
                onClick={handleChangePassword}
                disabled={loading || !oldPassword || !newPassword}
            >
                {loading ? "Updating..." : "Update Password"}
            </Button>
        </Box >
    );
};

export default SecurityForm;
