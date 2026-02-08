'use client';
import { Box, Typography, Avatar, Button, Alert, TextField } from '@mui/material';
import { User, updateProfile, updateEmail } from 'firebase/auth';
import CustomDialog from '../customDialog/CustomDialog';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { auth } from '@/app/config/firebase';
import CustomButton from '../common/Button';

const CurrentUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // When Auth changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setDisplayName(currentUser.displayName || '');
                setEmail(currentUser.email || '');
            }
        });

        return () => unsubscribe();
    }, []);

    //  update profile
    const handleUpdateProfile = async () => {
        if (!user) return;
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            if (displayName !== user.displayName) {
                await updateProfile(user, { displayName });
            }

            if (email !== user.email) {
                await updateEmail(user, email);
            }

            setUser({ ...user, displayName, email } as User);
            setSuccessMessage('Profile updated successfully!');
            setOpenEdit(false);
        } catch (error: any) {
            setErrorMessage(error.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <Alert severity="error">Create Your Account</Alert>;

    return (
        <Box sx={{ display: 'flex', gap: '20px' }}>
            <Avatar sx={{ bgcolor: '#f0a500', width: 80, height: 80 }}>
                {user.email?.charAt(0).toUpperCase() || 'U'}
            </Avatar>

            <Box sx={{ width: '100%' }}>
                <Typography variant="h6">{user.displayName || ''}</Typography>
                <Typography component="span" color="textSecondary">Email: </Typography>
                <Typography component="span"> {user.email}</Typography> <br />
                <Typography component="span" color="textSecondary">Member Id: </Typography>
                <Typography component="span"> {user.uid}</Typography>

                {errorMessage && <Alert severity="error" sx={{ mt: 1 }}>{errorMessage}</Alert>}
                {successMessage && <Alert severity="success" sx={{ mt: 1 }}>{successMessage}</Alert>}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <CustomButton height={'50px'} buttonType={'orange'} color={'error'} startIcon={<EditIcon />} onClick={() => setOpenEdit(true)}>
                    Edit Profile
                </CustomButton>
                <CustomButton height={'50px'} buttonType={'soft'} color={'orange'} onClick={() => auth.signOut()}>
                    Sign Out
                </CustomButton>
            </Box>

            {/* Edit Dialog */}
            <CustomDialog open={openEdit} onClose={() => setOpenEdit(false)} btnTitle='Cancel'>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        label="Display Name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        fullWidth
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
                        <Button
                            variant="contained"
                            onClick={handleUpdateProfile}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Save'}
                        </Button>
                    </Box>
                </Box>
            </CustomDialog>
        </Box>
    );
};

export default CurrentUser;
